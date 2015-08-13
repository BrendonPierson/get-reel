requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery' : '../bower_components/jquery/dist/jquery.min',
    'firebase' : '../bower_components/firebase/firebase',
    'hbs' : '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap' : '../bower_components/bootstrap/dist/js/bootstrap.min',
    'lodash' : '../bower_components/lodash/lodash.min',
    'rating2' : '../bower_components/bootstrap-rating/bootstrap-rating.min'
  },
  shim: {
    'bootstrap': ['jquery'],
    'material': ['bootstrap'],
    'rating2' : ['bootstrap'],
    'firebase': {
      exports: 'Firebase'
    }
  }
});


requirejs(
  ["firebase", "jquery","lodash", "hbs", "bootstrap", "delete", "watched", "rating", "rating2", "find"],
  function(_firebase, $, _, Handlebars, bootstrap, deleter, watched, rating, rating2, find) {
  var myFirebaseRef = new Firebase('https://get-reel.firebaseio.com/');

  // Declare allMovies for require scope
  var allMovies = {};

  myFirebaseRef.on("value", function(snapshot) {
    console.log(snapshot.val());
    allMovies = snapshot.val();

    var allMoviesArray = [];

    for (var key in allMovies) {
      allMoviesArray[allMoviesArray.length] = allMovies[key];
    }
    var allMoviesObject = {movies: allMoviesArray};

    require(['hbs!../templates/moviesWatched'], function(template) {
      // Places data from Firebase into movie handlebars template.
      $("#watchedMoviesDiv").html(template(allMoviesArray));
    });

    require(['hbs!../templates/moviesWishList'], function(template) {
      // Places data from Firebase into movie handlebars template.
      $("#wishListMoviesDiv").html(template(allMoviesArray));
    });



    require(['hbs!../templates/moviesSearch'], function(template) {
      // Places data from Firebase into movie handlebars template.
      $("#moviesSearchDiv").html(template(allMoviesArray));

      // Places styling on Watched button if movie has been seen.
      $.each($('.true'), function (index, val) {
        $(val).text("Watched");
        $(val).css("background-color", "#286090");
        $(val).css("color", "white");
      });
      $.each($('.false'), function (index, val) {
        $(val).text("I've Seen This Movie");
      });
      $.each($('.false'), function (index, val) {
        $(val).text("I've Seen This Movie");
      });

      $('.myRating').rating();

      $('input').on('change', function (e) {
        var userRating = $(this).attr('value');
        // Capture a variable that gets title/key
        var ratingTitle = $(this).parent().parent().siblings('h3').html();
        // console.log(ratingTitle);
        // console.log("allMovies :", allMovies);
        var titleKey = _.findKey(allMovies, {'Title': ratingTitle});
        // console.log(titleKey);
        var ref = new Firebase('https://get-reel.firebaseio.com/' + titleKey);
        ref.update({rating: userRating});
      });
    });

    // //automatically deletes duplicates //
    // var allTitles = [];
    // allTitles = _.pluck(allMovies, 'Title');
    // allTitles.sort();
    // for (var i = 0; i < allTitles.length; i++) {
    //   if (allTitles[i] === allTitles[i + 1]) {
    //     var duplicatedKey = allTitles[i];
    //     var deleteKey = _.findKey(allMovies, {'Title': duplicatedKey});
    //     // console.log("deleteKey :", deleteKey);
    //     deleter.delete(deleteKey);
    //   }
    // }

    // //automatically deletes element from database if "Movie not Found" //
    // var errorKey = _.findKey(allMovies, {'Error': "Movie not found!"}); 
    // deleter.delete(errorKey);
    // for (i = 0; i < allMoviesArray; i++) {
    //   console.log(allMoviesArray[i].rating);
    // }
  }); // End of Firebase snapshot
  
  // On clicking "Spin the Reel": (consider moving this function to module?)
  $('#movie-search').click(function () {
    // Close form: (possible modification - on click, hidden div displays with the movie info asking to confirm the selection.)
    $('#confirmation').removeClass('hidden');
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
  $(document).on("click", '.delete', function() {
    // console.log("you clicked delete");
    var deleteTitle = $(this).siblings().children('h3').html();
    console.log("deleteTitle :", deleteTitle);
    var titleKey = '';
    console.log("allMovies :", allMovies);
    titleKey = _.findKey(allMovies, {'Title': deleteTitle});
    console.log("titleKey :", titleKey);
    deleter.delete(titleKey); // Run from delete.js module
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

});




