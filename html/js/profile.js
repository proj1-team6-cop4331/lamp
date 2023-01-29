function fillUser() {
    document.getElementById('user').innerHTML = "Welcome back, " + window.localStorage.getItem("first") + "!";
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