


var topics = ["dog", "cat", "rabbit", "hamster", "fish", "horse", "cow", "otter", "ferret", "llama"];
  
//   Try using a loop that appends a button for each string in the array.


      //create buttons out of array list
      function renderButtons() {

        	$("#dog-view").empty();
          
        // Loop through the array list, then generate buttons for each in the array

	        for (var i=0; i<topics.length; i++) {
            //class answer
            var a = $("<button>");
            a.addClass("btn btn-info dogs " + topics[i]);
            a.attr("data-name", topics[i]);
            a.text(topics[i]);
            $("#dog-view").append(a); 
          	}
          	
  		};

      // This function handles events where the add dog button is clicked
        $("#add-dog").on("click", function(event) {

          event.preventDefault();

        // Write code to grab the text the user types into the input field

        //adding 'trim' takes out extra spaces
        var addDog = $('#dog-input').val().trim();

        //adding an error checking/stop here
        if (addDog === "") {
          return;
        }

         // Write code to add the new movie into the movies array

        //don't need jquery code, as 'push' is an array function
        topics.push(addDog);
        console.log(topics);

   
        // The renderButtons function is called, rendering the list of buttons
        renderButtons();
      });

  		//function to pull giphy link and populate from array list
  		$("#dog-view").on("click", "button", function() {

         $("#images").empty();

  			//look up delegated events -- need to know why

          var animal = $(this).attr("data-name");
      		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10&offset=10";

      			$.ajax({
          		url: queryURL,
          		method: "GET"
          		}).done(function(response){

              for (var i=0; i<11; i++) {

          		 //dynamically creating an image tag

              var animateImage = response.data[i].images.fixed_height.url;

              console.log(animateImage);

              var stillImage = response.data[i].images.fixed_height_still.url;

              console.log(stillImage);

              var rating = response.data[i].rating.toUpperCase();

              //new div for gifs
              var gifDiv = $("<div>");
              gifDiv.addClass("col-sm-8");

              //where the images will go
              var gifBody = $("<div>");
              gifBody.addClass("col-sm-8");

              //creating new image
              var gifImage = $("<img>");
              //attributes for images
              gifImage.addClass("gif");
              gifImage.attr("src", stillImage);
              gifImage.attr("data-still", stillImage);
              gifImage.attr("data-animate", animateImage);
              gifImage.attr("data-state", "still");

              //add new gif to the body
              gifBody.append(gifImage);

              //create div for the rating
              var rateDiv = $("<div>");
              rateDiv.addClass("row imageRate");

              //attributes for rating
              var imageRate = $("<h4>");
              imageRate.addClass("rating");
              imageRate.text("Rating: " + rating);

              //put all parts together for rate div
              rateDiv.append(imageRate);

              //put all parts together for rating + image within maing gif div
              gifDiv.append(rateDiv).append(gifBody);

              
              //getting it on the screen in the div
              $("#images").prepend(gifDiv);
              }

          		})
         
        });



      //copied from kevin's
      $(document).on("click", ".gif", function() {
          var state = $(this).attr("data-state");

  		


  			if (state === "still") {
  				$(this).attr("src", $(this).data("animate"));
  				$(this).attr("data-state", "animate");
  			}
  			else {
  				$(this).attr("src", $(this).data("still"));
  				$(this).attr("data-state", "still");
  			}

  			 });

       


      // Calling the renderButtons function to display the initial list of movies
     renderButtons();