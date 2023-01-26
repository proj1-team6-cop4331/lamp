var registerButton = document.querySelector("#regButton");

registerButton.addEventListener("click", function() {
    var firstName = document.querySelector("#regFirstName").value;
    var lastName = document.querySelector("#regLastName").value;
    var username = document.querySelector("#regUsername").value;
    var password = document.querySelector("#regPassword").value;

    if (password.length < 8) {
        console.log("Your password isn't long enough.");
        return;
    }
    console.log("Hi " + firstName + " " + lastName + ", let's make an account for you.");

    // Create a javascript object containing the stuff we want to send to the API
    var packageItUp = {
        firstname: firstName,
        lastName: lastName,
        login: username,
        password: password,
    };

    var jsonPayload = JSON.stringify(packageItUp);
    
    var url = "https://lamp-cop4331.skyclo.dev/LAMPAPI/Register.php";
    
    // Create a request
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);

    // What the heck does this do?
    xhr.setRequestHeader("Content-type", "application/json; charset = utf-8");

    try {
        // anonymous function to the gets called when the request is ready
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                // When we get a response from API, we'll get an id back.
                var jsonObject = JSON.parse(xhr.responseText);
                userId = jsonObject.id;

                // The API couldn't register this new user. (Perhaps that user already exists.)
                if (userId < 1) {
                    console.log("Registration Failed");
					return;
                }

                else {
                    console.log("You were registered! Your id is " + userId);
                    onSuccess();
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

function onSuccess() {
    console.log("Feel free to log in.");
}