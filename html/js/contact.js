let pageNum = 1;
let numContacts = 0;

function onLogin() {

    // Create a javascript object containing the stuff we want to send to the API
    var packageItUp = {
        search: "",
        userId: window.localStorage.getItem("id"),
        load: pageNum - 1
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

function loadPage(searchQuery, page) {
    var packageItUp = {
        search: searchQuery,
        userId: window.localStorage.getItem("id"),
        load: page - 1
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
                console.log(jsonObject);
                let arr = jsonObject.results;

                numContacts = 0;
                // Delete everything else.  
                let grid = document.getElementById("grid");
                for (let i = 10; i < grid.children.length;) {
                    grid.removeChild(grid.children[i]);
                }

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

function prevPage() {
    pageNum--;
    if (pageNum < 1) pageNum = 1;
    loadPage("", pageNum);

    let pageNumLabel = document.getElementById("pageNumLabel");
    pageNumLabel.innerHTML = pageNum;
}

function nextPage() {
    pageNum++;
    loadPage("", pageNum);

    let pageNumLabel = document.getElementById("pageNumLabel");
    pageNumLabel.innerHTML = pageNum;
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
                    toggleCreation();
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
    numContacts++;
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
    options.firstChild.addEventListener("click", edit);
    options.lastChild.addEventListener("click", trash);
    options.setAttribute("data-id", contact.ID);

    let grid = document.getElementById("grid");

    // Create a new div for each field of the contact.
    let ind = 1;
    for (const field in contact) {
        if (ind <= 4) {
            let newDiv = document.createElement("div");
            newDiv.innerHTML = contact[field];
            newDiv.classList.add("contact-info");
            grid.appendChild(newDiv);
        } ind++;
    }

    grid.appendChild(options);

    let starLabel = document.getElementById("numLives");
    console.log(starLabel + " should become " + numContacts);
    starLabel.innerHTML = " X " + numContacts;
}

function edit() {
    let current = this.parentNode;
    let grid = current.parentNode;

    let originalStrings = [];
    let replaceThese = [];

    // Traverse the DOM across the row
    // and replace the divs with inputs

    for (let i = 3; i >= 0; i--) {   
        current = current.previousSibling;
        originalStrings[i] = current.innerHTML;
        replaceThese[i] = current;
    }

    for (let i = 0; i < 4; i++) {
        let textField = document.createElement("input");
        textField.setAttribute("type", "text");
        textField.value = replaceThese[i].innerHTML;
        grid.replaceChild(textField, replaceThese[i]);
    }

    let confirmButton = document.createElement("img");
    confirmButton.setAttribute("src", "images/check_button.png");
    confirmButton.setAttribute("width", "50px");
    confirmButton.addEventListener("click", confirmEdit);
    this.parentNode.replaceChild(confirmButton, this);

    let cancelButton = document.createElement("img");
    cancelButton.setAttribute("src", "confirmEditimages/delete_button.png");
    cancelButton.setAttribute("width", "50px");
    cancelButton.addEventListener("click", function() {
        cancelEdit(originalStrings);
    });
    this.parentNode.replaceChild(cancelButton, this.parentNode.lastChild);
}

function confirmEdit() {
    let outerThis = this;
    let current = this.parentNode;
    let replaceThese = [];

    for (let i = 3; i >= 0; i--) {   
        current = current.previousSibling;
        replaceThese[i] = current;
    }
    
    let newContact = {
        id: this.parentNode.dataset.id,
        firstName:  replaceThese[0].value,
        lastName: replaceThese[1].value,
        phone: replaceThese[2].value,
        mail: replaceThese[3].value
    };

    // EditContact.php the right data.

    let jsonPayload = JSON.stringify(newContact);

    let url = "https://lamp-cop4331.skyclo.dev/LAMPAPI/EditContact.php";

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

                    // Traverse the DOM across the row
                    // and replace the inputs with divs.

                    for (let i = 0; i < 4; i++) {
                        let newDiv = document.createElement("div");
                        newDiv.innerHTML = replaceThese[i].value;
                        newDiv.classList.add("contact-info");
                        grid.replaceChild(newDiv, replaceThese[i]);
                    }

                    let editButton = document.createElement("img");
                    editButton.setAttribute("src", "images/edit.png");
                    editButton.addEventListener("click", edit);
                    outerThis.parentNode.lastChild.classList.toggle("invisible");
                    outerThis.parentNode.firstChild.addEventListener("click", edit);
                    outerThis.parentNode.replaceChild(editButton, outerThis);
                }

                else {                   
                    console.log("We had an issue editing that contact.");
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

function cancelEdit(origStrings) {
    for(let i = 0; i < 4; i++) {
        let newDiv = document.createElement("div");
        newDiv.innerHTML = origStrings[i];
        newDiv.classList.add("contact-info");
        grid.replaceChild(newDiv, this.parentNode.parentNode.childList[i]);
    }

    editIcon = document.createElement("img");
    editIcon.setAttribute("src", "images/edit.png");
    editIcon.addEventListener("click", edit);
    this.parentNode.replaceChild(editIcon, this);

    trashIcon = document.createElement("img");
    trashIcon.setAttribute("src", "images/edit.png");
    trashIcon.addEventListener("click", trash);
    this.parentNode.replaceChild(trashIcon, this.nextSibling);
}

function trash() {
    if (!confirm("Are you sure you want to delete this contact? (They will be lost forever!)"))
        return;

    let current = this.parentNode;
    let deleteThisID = current.dataset.id;

    let obj = {ID: deleteThisID};
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

                numContacts--;
                let starLabel = document.getElementById("numLives");
                console.log(starLabel + " should become " + numContacts);
                starLabel.innerHTML = " X " + numContacts;
                // Traverse the DOM Nodes for the contact
                // we're supposed to delete.
                deleteThese = [];
                for (let i = 0; i < 5; i++) {
                    deleteThese.push(current);
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

function doSearch() {
    let searchString = document.getElementById("searchBar").value;

    // Create a javascript object containing the stuff we want to send to the API
    var packageItUp = {
        search: searchString,
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

                // When we get a response from API...
                var jsonObject = JSON.parse(xhr.responseText);
                let arr = jsonObject.results;

                numContacts = 0;
                // Delete everything else.  
                let grid = document.getElementById("grid");
                for (let i = 10; i < grid.children.length;) {
                    grid.removeChild(grid.children[i]);
                }

                // Add back the stuff that the search query found.

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