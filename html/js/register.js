let registerButton = document.querySelector("#regButton");

registerButton.addEventListener("click", function() {
    let firstName = document.querySelector("#regFirstName").value;
    let lastName = document.querySelector("#regLastName").value;
    let username = document.querySelector("#regUsername").value;
    let password = document.querySelector("#regPassword").value;

    if (password.length < 8) {
        document.getElementById("invalidText").style.display = "block";
        document.getElementById("invalidText").innerHTML = "Your password must be at least 8 characters long!";
        return;
    }

    // Create a javascript object containing the stuff we want to send to the API
    let packageItUp = {
        firstName: firstName,
        lastName: lastName,
        login: username,
        password: password,
    };

    let jsonPayload = JSON.stringify(packageItUp);

    let url = "https://lamp-cop4331.skyclo.dev/LAMPAPI/Register.php";
    
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

                // The API couldn't register this new user. (Perhaps that user already exists.)
                if (userId < 1) {
                    document.getElementById("invalidText").style.display = "block";
                    document.getElementById("invalidText").innerHTML = "Username or password is taken!"
					return;
                }

                else {                   
                    window.localStorage.setItem("first", firstName);
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

backButton.addEventListener("click", function () {
    window.location.href = "mario.html";
});

togglePassword.addEventListener("click", function () {
    const type = passwordBar.getAttribute("type") === "password" ? "text" : "password";
    passwordBar.setAttribute("type", type);
    this.classList.toggle("bi-eye");
});

document.body.addEventListener("load", function () {
    if (document.getElementById("invalidText").style.display == "block") {

        document.getElementById("invalidText").style.display = "none";

    }
});