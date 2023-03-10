function fillUser() {
    let user = window.localStorage.getItem("id");
    if (user <= 0) {
        window.location.href = "index.html";
        return;
    }
    document.getElementById('name').innerHTML = "Welcome back, " + window.localStorage.getItem("first") + "!";
    document.getElementById('user').innerHTML = window.localStorage.getItem("user");
}

function doLogout() {
    window.localStorage.clear();
    window.location.href = "index.html";
}

//Creates add contact form when you are offline
function addPlaceholder() {
    let grid = document.getElementById("grid");

    let contact = {
        firstName: "Test",
        lastName: "User",
        phoneNumber: "123-456-7890",
        email: "myemail.contactme.com"
    }

    for (const property in contact) {
        let newDiv = document.createElement("div");
        newDiv.innerHTML = contact[property];
        grid.appendChild(newDiv);
    }

    let options = document.createElement("div");
    options.classList.add("editAndDelete");
    let editButton = document.createElement("img");
    editButton.setAttribute("src", "images/edit.png");
    options.appendChild(editButton);

    let deleteButton = document.createElement("img");
    deleteButton.setAttribute("src", "images/delete.png");
    options.appendChild(deleteButton);

    options.firstChild.addEventListener("click", edit);
    options.lastChild.addEventListener("click", trash);

    grid.appendChild(options);
}