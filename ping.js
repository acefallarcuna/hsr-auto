var url = "https://acefallarcuna.github.io/hsr-auto/";

fetch(url)
    .then(function (response) {
        if (response.ok) {
            console.log("Kuru-kuru");
        } else {
            console.log("Wawayu");
        }
    })
    .catch(function (error) {
        console.log("An error occurred: " + error);
    });
