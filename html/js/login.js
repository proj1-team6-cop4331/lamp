var loginButton = document.querySelector("#loginButton");

loginButton.addEventListener("click", function() {
    var username = document.querySelector("#enterUsername").value;
    var password = document.querySelector("#enterPassword").value;

    console.log("Your username was " + username + " and your password was " + password);

    // Create a javascript object containing the stuff we want to send to the API
    var packageItUp = {
        login: username,
        password: password,
    };

    var jsonPayload = JSON.stringify(packageItUp);

    // This url doesn't seem to work. Is it supposed to be "lamp-cop4331.skyclo.dev/LAMPAPI/Login.php?"
    var url = "http://lamp-cop4331.skyclo.dev/Login.php";
    
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

                // The API couldn't find a user.
                if (userId < 1) {
                    console.log("User/Password combination incorrect");
					return;
                }

                else {
                    var fn = jsonObject.firstName;
                    var ln = jsonObject.lastName;
                    console.log("Found it! Your name is " + fn + " " + ln + ".");

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
    console.log("now, we'll load up the next web page!");
}