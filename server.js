var url = "https://yourusername.github.io/yourrepository/yourfile.html";

fetch(url)
    .then(function (response) {
        if (response.ok) {
            console.log("Your HTML file is reachable!");
        } else {
            console.log("Your HTML file is not reachable or encountered an error.");
        }
    })
    .catch(function (error) {
        console.log("An error occurred: " + error);
    });
