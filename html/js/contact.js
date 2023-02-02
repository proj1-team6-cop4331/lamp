
function onLogin() {
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
                let jsonObject = JSON.parse(xhr.responseText);
                let arr = jsonObject.results;

                for (let i = 0; i < arr.length; i++) {
                    appendContactList(arr[i]);
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

// Show a template for the user to type in a contact
function toggleCreation() {
    
    let list = document.querySelectorAll(".create");
    for (let i = 0; i < list.length; i++) {
        list[i].classList.toggle("hide");
        list[i].value = "";
    }

    document.getElementById("checkOrX").classList.toggle("checkOrX");
}

// Reach out to the API and see if we can add a contact.
// If so, call appendContactList().
function accept() {
    let objects = document.querySelectorAll(".hide, .create");
    let contact = {
        firstName: objects[0].value,
        lastName: objects[1].value,
        phone: objects[2].value,
        email: objects[3].value,
        userID: window.localStorage.getItem("id")
    }

    // We still have to send these over to the API
    // so they can get added to the database.

    let jsonPayload = JSON.stringify(contact);

    let url = "https://lamp-cop4331.skyclo.dev/LAMPAPI/AddContact.php";

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
                let err = jsonObject.error;

                // The API couldn't register this new user. (Perhaps that user already exists.)
                if (err == "") {
                    console.log("contact added successfully");
                    appendContactList(contact);
                }

                else {                   
                    console.log("We had an issue adding that contact.");
                }

                return;
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

// The user has created a new contact.
// We need to create DOM nodes for the new contact
// so it can be displayed.
function appendContactList(contact) {
    let options = document.createElement("div");
    options.classList.add("editAndDelete");
    let editButton = document.createElement("img");
    editButton.setAttribute("src", "images/edit.png");
    options.appendChild(editButton);

    let deleteButton = document.createElement("img");
    deleteButton.setAttribute("src", "images/delete.png");
    options.appendChild(deleteButton);

    // If the user presses the delete button on a contact,
    // store data on which contact was selected.
    options.lastChild.addEventListener("click", trash);
    options.setAttribute("data-id", contact.ID);

    let grid = document.getElementById("grid");

    // Create a new div for each field of the contact.
    let ind = 1;
    for (const field in contact) {
        if (ind <= 4) {
            let newDiv = document.createElement("div");
            newDiv.innerHTML = contact[field];
            grid.appendChild(newDiv);
        } ind++;
    }

    grid.appendChild(options);

    toggleCreation();
}

function trash() {
    let current = this.parentNode;
    let deleteThese = [];
    let deleteThisID = current.dataset.id;
    console.log("We're gonna delete the contact with ID:n " + deleteThisID);

    let obj = {ID: deleteTheseID};
    let jsonPayload = JSON.stringify(obj);

    let url = "https://lamp-cop4331.skyclo.dev/LAMPAPI/DeleteContact.php";

    // Create a request
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);

    // What the heck does this do?
    xhr.setRequestHeader("Content-type", "application/json; charset = utf-8");

    try {
        // anonymous function to the gets called when the request is ready
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                // Read in the response from the API.
                let jsonObject = JSON.parse(xhr.responseText);
                console.log(jsonObject);
                console.log("I think 'delete' worked");

                // Traverse the DOM Nodes for the contact
                // we're supposed to delete.
                for (let i = 0; i < 5; i++) {
                    deleteThese[i] = current;
                    current = current.previousSibling;
                }

                for (let i = 0; i < deleteThese.length; i++) {
                    grid.removeChild(deleteThese[i]);
                }
                return;
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