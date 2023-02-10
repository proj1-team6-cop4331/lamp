//Obtain references to login and register DIVs

let selectLogin = document.getElementById("selectLogin");
console.log(selectLogin.children);
let selectRegister = document.getElementById("selectRegister");

//Add event listeners for the hover effects, and clicking the DIVs
selectLogin.addEventListener("mouseover", function () {
    selectLogin.children[0].classList.remove("hidden");
});
selectLogin.addEventListener("mouseout", function () {
    selectLogin.children[0].classList.add("hidden");
});
selectRegister.addEventListener("mouseover", function () {
    selectRegister.children[0].classList.remove("hidden");
});
selectRegister.addEventListener("mouseout", function () {
    selectRegister.children[0].classList.add("hidden");
});

selectLogin.addEventListener("click", function () {
    console.log("Login clicked.");
    window.location.href = "login.html";
});
selectRegister.addEventListener("click", function () {
    console.log("Register clicked.");
    window.location.href = "register.html";
});