$(document).ready(function(){
    var animals = [
        "bear",
        "eagle",
        "dog",
        "snake",
        "cat",
        "turkey",
        "deer",
        "goose",
        "boar",
        "pig",
        "cow",
        "zebra",
        "rhino"
    ];
    
    console.log(animals.length)
    // function to create buttons from per set array and future added animals.
    function buttonSetup(){
        $("#buttons").empty();
        for(var i = 0; i < animals.length; i ++) {
            console.log(animals[i]);
            var button = $("<button>");
            button.addClass("btn btn-light animal-btn");
            button.attr("id", animals[i]);   
            button.text(animals[i]);  
            $("#buttons").append(button);
    }};

    buttonSetup();
    // add animal via input bar function
    $("#add").on("click", function(event) {
        
        event.preventDefault();
    
        var inputAnimal = $("#input").val().trim();
        console.log(inputAnimal);
        animals.push(inputAnimal);
        $("#input").val("");
    
        buttonSetup();
    });
    //  populate gif area via button click function
    $("#buttons").on("click", ".animal-btn", function() {
        $("#gif-view").empty();
        var animalName = $(this).attr("id").trim();
        console.log(animalName);
    
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          animalName + "&limit=10&api_key=KIOuCmP0TkLk98ljMtqMIBiE56ry5jZo";
        console.log(queryURL);

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response){
            
            var results = response.data;
            
            for(var j = 0; j < results.length; j++){
    
                
                    console.log(results.length)
                    var gifDiv = $("<div>");
                    var rating = results[j].rating;
    
                    var p = $("<p>").text("Rating: " + rating);
                
    
                    var animalImage = $("<img>");
                    animalImage.attr("src", results[j].images.fixed_height_small_still.url);
                    animalImage.attr("id", results[j].id);
                    animalImage.attr("data-state", "still");
                    animalImage.addClass("gifAnimal");

                    gifDiv.addClass("section")
                    gifDiv.append(animalImage);
                    gifDiv.append(p);
            
                    $("#gif-view").append(gifDiv);
                
            }
        });
    
    });
    // animate function
    $("#gif-view").on("click", ".gifAnimal", function(){
        var state = $(this).attr("data-state");

        if(state === "still"){
            $(this).attr("src", "https://media0.giphy.com/media/" + $(this).attr("id") +"/100.gif");
            $(this).attr("data-state", "animated");
        } else {
            $(this).attr("src", "https://media0.giphy.com/media/" + $(this).attr("id") +"/100_s.gif");
            $(this).attr("data-state", "still");
        };
    });
});





