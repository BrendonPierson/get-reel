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
  ["firebase", "jquery","lodash", "hbs", "bootstrap", "watched"],
  function(_firebase, $, _, Handlebars, bootstrap, watched) {
  var myFirebaseRef = new Firebase('https://get-reel.firebaseio.com/');

    var allMovies = {};
    var allMoviesObject = {};
    // Firebase snapshot function to reload data on change.
    myFirebaseRef.on("value", function(snapshot) {
      // console.log(snapshot.val());
      allMovies = snapshot.val();
      var allMoviesArray = [];
       // Convert Firebase's object of objects into an array of objects
      for (var key in allMovies) {
        allMoviesArray[allMoviesArray.length] = allMovies[key];
      }
      allMoviesObject = {movies: allMoviesArray};
      // console.log(allMoviesObject);

      require(['hbs!../templates/movies'], function(template) {
        $(".row").html(template(allMoviesArray));
      });
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

      $(document).on('click', '.watched', function (e) {
        e.preventDefault();
        // Grab the key from Firebase and change key watched to true

        var allTitles = [];
        var watchedMovie = $(this).siblings('.caption').children('#movieName').text();
        allTitles = _.pluck(allMovies, 'Title');
         for (var i = 0; i < allTitles.length; i++) {
           if (allTitles[i] === watchedMovie) {
             watchedProperty = _.findKey(allMovies, {'Title': watchedMovie});
             console.log(watchedProperty);
           }
          }
        // Run movieWatched function from watched.js module.
        watched.movieWatched(this, watchedProperty, true);
      });

      $(document).on('click', '.submit-rating', function (e) {
        e.preventDefault();
        // Create submit-rating module to add rating to Firebase (see above click function)
          
      });

    });




