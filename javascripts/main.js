requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery' : '../bower_components/jquery/dist/jquery.min',
    'firebase' : '../bower_components/firebase/firebase',
    'hbs' : '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap' : '../bower_components/bootstrap/dist/js/bootstrap.min',
    'lodash' : '../bower_components/lodash/lodash.min'
  },
  shim: {
    'bootstrap': ['jquery'],
    'material': ['bootstrap'],
    'firebase': {
      exports: 'Firebase'
    }
  }
});

requirejs(
  ["firebase", "jquery","lodash", "hbs", "bootstrap", "delete", "watched", "rating"],
  function(_firebase, $, _, Handlebars, bootstrap, deleter, watched, rating) {
  var myFirebaseRef = new Firebase('https://get-reel.firebaseio.com/');

  // Declare allMovies for require scope
  var allMovies = {};

  myFirebaseRef.on("value", function(snapshot) {
    // console.log(snapshot.val());
    allMovies = snapshot.val();

    var allMoviesArray = [];
    for (var key in allMovies) {
      allMoviesArray[allMoviesArray.length] = allMovies[key];
    }
    var allMoviesObject = {movies: allMoviesArray};

    // If rating >= 1 (i.e. if movie has been rating), show user rating.
    

    

    require(['hbs!../templates/movies'], function(template) {
      $(".row").html(template(allMoviesArray));
    });

    //automatically deletes duplicates //
    var allTitles = [];
    allTitles = _.pluck(allMovies, 'Title');
    allTitles.sort();

    for (var i = 0; i < allTitles.length; i++) {
      if (allTitles[i] === allTitles[i + 1]) {
        var duplicatedKey = allTitles[i];
        var deleteKey = _.findKey(allMovies, {'Title': duplicatedKey});
        console.log("deleteKey :", deleteKey);
        deleter.delete(deleteKey);
      }
    }

    //automatically deletes element from database if "Movie not Found" //
    var errorKey = _.findKey(allMovies, {'Error': "Movie not found!"}); 
    deleter.delete(errorKey);

    // console.log(allMoviesArray);
    // Hide select box if movie has been rated.
     for (i = 0; i < allMoviesArray; i++) {
      console.log(allMoviesArray[i].rating);
        // if (allMoviesArray[i].rating >= 1) {
        //   $('select').hide();
        // }
    }


  }); // End of Firebase snapshot
  
  // On clicking "Spin the Reel":
  $('#movie-search').click(function () {

  });
  
// On clicking "Spin the Reel": (consider moving this function to module?)
  $('#movie-search').click(function () {
      // Close form: (possible modification - on click, hidden div displays with the movie info asking to confirm the selection.)

      // Capture user input
      var titleInput = $('#title-input').val();
      var yearInput = $('#year-input').val(); 

      // Run ajax call to get data
      $.ajax({
          url: 'http://www.omdbapi.com/?t=' + titleInput + '&y=' + yearInput + '&plot=short&r=json'
      }).done(function (data) {
          data.watched = false;
          data.rating = "Not rated";
          console.log(data);
          myFirebaseRef.push(data);
        });
  });

  /// database delete function ///
  $(document).on("click", '#delete', function() {
    // console.log("you clicked delete");
    var deleteTitle = $(this).siblings().children('h3').html();
    // console.log("deleteTitle :", deleteTitle)
    var titleKey = '';
    // console.log("allMovies :", allMovies);
    titleKey = _.findKey(allMovies, {'Title': deleteTitle});
    // console.log("titleKey :", titleKey);
    deleter.delete(titleKey);
    $(this).parent().remove();
  });

  // Watched function
  $(document).on('click', '.watched', function (e) {
    e.preventDefault();
    // Grab the key from Firebase and change key watched to true

    var allTitles = [];
    var watchedMovie = $(this).siblings('.caption').children('#movieName').text();
    allTitles = _.pluck(allMovies, 'Title');
     for (var i = 0; i < allTitles.length; i++) {
       if (allTitles[i] === watchedMovie) {
         watchedProperty = _.findKey(allMovies, {'Title': watchedMovie});
         // console.log(watchedProperty);
       }
      }
    // Run movieWatched function from watched.js module.
    watched.movieWatched(this, watchedProperty, true);
  });

  $(document).on('click', '.submit-rating', function (e) {
    e.preventDefault();
    // Create submit-rating module to add rating to Firebase (see above click function)
    var userRating = $(this).siblings('.form-group').children('.rating').children('option:selected').text();
    // console.log(userRating);
    var ratedMovie = $(this).parent().siblings('#movieName').text();
    // console.log(ratedMovie);
    var allTitles = [];
    allTitles = _.pluck(allMovies, 'Title');
     for (var i = 0; i < allTitles.length; i++) {
       if (allTitles[i] === ratedMovie) {
         ratingKey = _.findKey(allMovies, {'Title': ratedMovie});
         // console.log(ratingKey);
       }
      }
      // console.log(ratingKey);
    rating.submitRating(this, ratingKey, userRating);
  });


});




