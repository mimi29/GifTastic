var topics = ["friends", "america's got talent", "the office", "dancing with the stars"];

function renderButtons() {

    $("#catButtonsId").empty();

    // Looping through the array of catagories
    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>");
        // Adding a class
        button.addClass("category");
        button.addClass("btn btn-primary");
        // Adding a data-attribute with a value of the tv show at index i
        button.attr("data-name", topics[i]);
        // Providing the button's text with a value of the tv show
        button.text(topics[i]);
        // Adding the button to the HTML
        $("#catButtonsId").append(button);
    }
}

// when giphy button is click get the giphy based on click button
function getGiphy() {
    // call ajax to get giphy
    $("#giphyButtons").empty();
    var name = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=4JIvycUq3oYpZEEoUjlZhfz5orHCbC9D&q=" + name + "&limit=10&offset=0&rating=R&lang=en";

    // Creates AJAX call 
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        $("#giphyButtonsId").empty;
        console.log(response);
        var results = response.data;
        if (results == "") {
            alert("Giphy is not available");
        }
        $("#giphyButtonsId").empty();

        for (i = 0; i < results.length; i++) {
            var giphyDiv = $("<imgdiv>");
            var rating = $("<p>").text("Rating " + results[i].rating);
            giphyDiv.append(rating);

            var image = $("<img>");
            image.attr("src", results[i].images.fixed_height_small_still.url);
            //paused images
            image.attr("data-still", results[i].images.fixed_height_small_still.url);
            //animated images
            image.attr("data-animate", results[i].images.fixed_height_small.url);
            //set images to paused initially
            image.attr("data-state", "still");
            image.addClass("image");
            giphyDiv.append(image);
            //add new div to existing divs
            $("#giphyButtonsId").append(giphyDiv);
        }
    });
}

// prevent user enters a dupplicate show
function findDupplicate(name) {
    var duplicate = false;
    for (i = 0; i < topics.length; i++) {
        if (name.toLowerCase() === topics[i].toLowerCase()) {
            duplicate = true;
            break;
        }
    }
    return duplicate;
}

// On Click event associated with the add button function
$("#submitCatId").on("click", function (event) {
    event.preventDefault();
    var duplicate = true;
    // Get the "value" from the textbox and store it a variable
    var show = $("#catTextId").val().trim();
    if (show != "") {
        if (!findDupplicate(show)) {
            topics.push(show);
            $("#catTextId").val("");
            renderButtons();
        }
        else {
            alert(show+" is already added on the list!")
            $("#catTextId").val("");
        }
    }
})

$(document).ready(function () {

    renderButtons();

    $(document).on("click", ".category", getGiphy);

    // toggle between animate and still image when user click on the image
    $(document).on("click", ".image", function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }

    });
});