function fillUser() {
    document.getElementById('user').innerHTML = "Welcome back, " + window.localStorage.getItem("first") + "!";
}