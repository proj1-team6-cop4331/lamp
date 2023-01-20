var loginButton = document.querySelector("#loginButton");

loginButton.addEventListener("click", function() {
    var username = document.querySelector("#enterUsername").value;
    var password = document.querySelector("#enterPassword").value;

    console.log("Your username was " + username + " and your password was " + password);
})