function fillUser() {
    document.getElementById('user').innerHTML = "Welcome back, " + window.localStorage.getItem("first") + "!";
}

function doSearch() {
    console.log("Normally we would search for contacts here");
}

function doLogout() {
    console.log("Logout button was pressed");
}

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