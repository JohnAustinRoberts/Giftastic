//Movie titles to be turned into buttons
var topics = ["Tropic Thunder", "Titanic", "Fight Club", "Grandma's Boy"];

//Main function
var buttonMaker = function(){

    //Create buttons from topics array
    for (var i = 0; i < topics.length; i++) {

        //Adds "+" between words
        var plusTopics = topics[i].split(' ').join('+');

        //Button attributes
        var button = $('<button data-movie=' + plusTopics + '>').append(topics[i]);

        //Add button class
        button.addClass('button');
        
        //Appened to div
        $('#movieButtons').append(button);
        
    }

    //User adds movie title
    $('#addMovie').on('click', function() {

        //Clear the buttons so they won't duplicate on the page
        $('#movieButtons').empty();
         
        //newTitle gets the movie title user entered
        var newTitle = $('#movie-input').val();

        //Only add one instance of movie
        for (i = 0; i < topics.length; i++) {
        
            //If newTitle can be found in the array
            if (newTitle == topics[i]) {

               //Remove newTitle from the array
                topics.pop(newTitle);
            }
        }

        //Adds newTitle to the titles array
        topics.push(newTitle);

        //Calls the loop again with the new title
        buttonMaker();

     });
  
    //User clicks on movie button
    $('.button').on('click', function() {

        //ID's which button selected
        var movie = $(this).data('movie');

        console.log($(this).data('movie'));
        
        //Adds movie to the queryURL
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC&limit=10";

        //Ajax call
         $.ajax({
            url: queryURL,
            method: 'GET'
            })

        //Ajax response
        .done(function(response) {

            //Console log object returned
            console.log(response);

            //Set the response to results variable
            var results = response.data;

            //Empty out previous gifs
            $('#movies').empty();

                //Loop to display all 10 gifs
                for (var i = 0; i < results.length; i++) {

                    //Create movieDiv
                    var movieDiv = $('<div>');

                    //Create rating p tag
                    var ratingPtag = $('<p>');

                    //Set rating to variable
                    var rating = results[i].rating.toUpperCase();

                        //Tests if rating is given
                        if (rating == ''){

                            ratingPtag.text("Not rated");
                        }
                        else {
                            ratingPtag.text("Rated " + rating);
                        }

                    //Create img tag    
                    var movieImage = $('<img>');

                    //Attribute source
                    movieImage.attr("src", results[i].images.fixed_height_small_still.url);

                    //Attribute still image
                    movieImage.attr("data-still", results[i].images.fixed_height_small_still.url);

                    //Attribute active image
                    movieImage.attr("data-active", results[i].images.fixed_height_small.url);

                    //Append the rating
                    movieDiv.append(ratingPtag);

                    //Append movieImage to the div
                    movieDiv.append(movieImage);

                    //Prepend to #movies
                    $('#movies').prepend(movieDiv);
                        
                }

            //On click to animate gifs  

            $('img').on('click', function(e){

                console.log(e);

                //Set current to the current URL
                var current = e.currentTarget.dataset.still;

                //Set active to the active URL
                var active = e.currentTarget.dataset.active;

                //Set still to the still URL
                var still = e.currentTarget.dataset.still;

                  if (current == still) { 
                   
                   //Switch to active URL
                   $(this).attr('src', active);

                   //Set current
                   current = active;

                }
                
                else {

                    //Switch to still URL
                    $(this).attr('src', still);

                    //Set current
                    current = still;
                }
                
            })

            })

        });
};

//Start the app
buttonMaker();
