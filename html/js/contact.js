let hidden = true;
function toggleCreation() {
    // Create a template to type in a contact
    let list = document.querySelectorAll(".create");
    for (let i = 0; i < list.length; i++) {
        list[i].classList.toggle("hide");
        list[i].value = "";
    }

    document.getElementById("checkOrX").classList.toggle("checkOrX");
    hidden = !hidden;
}

function accept() {
    let objects = document.querySelectorAll(".hide, .create");
    let contact = {
        firstName: objects[0].value,
        lastName: objects[1].value,
        phone: objects[2].value,
        email: objects[3].value,
    }

    let options = document.createElement("div");
    options.classList.add("editAndDelete");
    let editButton = document.createElement("img");
    editButton.setAttribute("src", "images/edit.png");
    options.appendChild(editButton);

    let deleteButton = document.createElement("img");
    deleteButton.setAttribute("src", "images/delete.png");
    options.appendChild(deleteButton);
    options.lastChild.addEventListener("click", trash);

    let grid = document.getElementById("grid");

    for (const property in contact) {
        let newDiv = document.createElement("div");
        newDiv.innerHTML = contact[property];
        grid.appendChild(newDiv);
    }

    grid.appendChild(options);

    toggleCreation();

    // We still have to send these over to the API
    // so they can get added to the database.
}

function trash() {
    let current = this.parentNode;
    let deleteThese = [];
    for (let i = 0; i < 5; i++) {
        deleteThese[i] = current;
        current = current.previousSibling;
    }

    for (let i = 0; i < deleteThese.length; i++) {
        grid.removeChild(deleteThese[i]);
    }
}