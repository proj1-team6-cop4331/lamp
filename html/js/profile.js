function fillUser() {
    document.getElementById('user').innerHTML = "Welcome back, " + window.localStorage.getItem("first") + "!";
    let userID = window.localStorage.getItem("id");
    // Get all of the contacts for this user.

    // Create a javascript object containing the stuff we want to send to the API
    var packageItUp = {
        search: "",
        userId: window.localStorage.getItem("id")
    };

    let jsonPayload = JSON.stringify(packageItUp);

    let url = "https://lamp-cop4331.skyclo.dev/LAMPAPI/SearchContact.php";
    
    // Create a request
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);

    // What the heck does this do?
    xhr.setRequestHeader("Content-type", "application/json; charset = utf-8");

    try {
        // anonymous function to the gets called when the request is ready
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                // When we get a response from API, we'll get an id back.
                var jsonObject = JSON.parse(xhr.responseText);

                for (const field in jsonObject) {
                    console.log(field);
                }
            }
        }

        // can we put this above the "ready state change?"
        // That would make a lot more sense.
        xhr.send(jsonPayload);
    }

    catch(theError) {
        console.error(theError.message);
    }
}

function doLogout() {
    window.localStorage.clear();
    window.location.href = "index.html";
}

window.addEventListener('beforeunload', function () {
    window.localStorage.clear();
    window.location.href = "index.html";
});

function createContact() {
    console.log("Add Contact was pressed, we need to add the form");
}

function addPlaceholder() {
    let grid = document.getElementById("grid");

    let contact = {
        firstName: "Test",
        lastName: "User",
        phoneNumber: "123-456-7890",
        email: "myemail.contactme.com",
        options: ""
    }

    for (const property in contact) {
        let newDiv = document.createElement("div");
        newDiv.innerHTML = contact[property];
        grid.appendChild(newDiv);
    }
}