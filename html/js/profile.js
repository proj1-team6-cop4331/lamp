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