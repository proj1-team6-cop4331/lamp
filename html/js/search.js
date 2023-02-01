let searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", doSearch);

function doSearch() {
    let searchString = document.getElementById("searchBar").value;
    console.log("Let's search for " + searchString);

    // Create a javascript object containing the stuff we want to send to the API
    var packageItUp = {
        search: searchString,
        userId: window.localStorage.getItem("id")
    };

    let jsonPayload = JSON.stringify(packageItUp);

    let url = "https://lamp-cop4331.skyclo.dev/LAMPAPI/SearchContact.php";
    
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
                var jsonObject = JSON.parse(xhr.responseText);

                // What will the JSON I get back look like??
            }
        }

        // can we put this above the "ready state change?"
        // That would make a lot more sense.
        xhr.send(jsonPayload);
    }

    catch(theError) {
        console.error(theError.message);
    }
} 