let hidden = true;

// Show a template for the user to type in a contact
function toggleCreation() {
    
    let list = document.querySelectorAll(".create");
    for (let i = 0; i < list.length; i++) {
        list[i].classList.toggle("hide");
        list[i].value = "";
    }

    document.getElementById("checkOrX").classList.toggle("checkOrX");
    hidden = !hidden;
}

// The user has created a new contact.
// We need to create DOM nodes for the new contact
// so it can be displayed.
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

    // If the user presses the delete button on a contact,
    // store data on which contact was selected.
    options.lastChild.addEventListener("click", trash);

    let grid = document.getElementById("grid");

    // Create a new div for each field of the contact.
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

    // Traverse the DOM Nodes for the contact
    // we're supposed to delete.
    for (let i = 0; i < 5; i++) {
        deleteThese[i] = current;
        current = current.previousSibling;
    }

    for (let i = 0; i < deleteThese.length; i++) {
        grid.removeChild(deleteThese[i]);
    }
}