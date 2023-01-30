let loginButton = document.querySelector("#loginButton");
let firstname = '';

loginButton.addEventListener("click", function () {

    let username = document.querySelector("#enterUsername").value;
    let password = document.querySelector("#enterPassword").value;

    console.log("Your username was " + username + " and your password was " + password);

    // Create a javascript object containing the stuff we want to send to the API
    let packageItUp = {
        login: username,
        password: password,
    };

    let jsonPayload = JSON.stringify(packageItUp);

    // This url doesn't seem to work. Is it supposed to be "lamp-cop4331.skyclo.dev/LAMPAPI/Login.php?"
    let url = "https://lamp-cop4331.skyclo.dev/LAMPAPI/Login.php";
    
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
                let jsonObject = JSON.parse(xhr.responseText);
                userId = jsonObject.id;

                // The API couldn't find a user.
                if (userId < 1) {
                    console.log("User/Password combination incorrect");
                    document.getElementById("invalidLabel").style.display = "block";
					return;
                }

                else {
                    let fn = jsonObject.firstName;
                    let ln = jsonObject.lastName;
                    window.localStorage.setItem("first", fn);
                    window.localStorage.setItem("id", userId);
                    window.location.href = "profile.html";
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
    
});