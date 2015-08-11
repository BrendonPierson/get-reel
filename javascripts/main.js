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
  ["firebase", "jquery","lodash", "hbs", "bootstrap"],
  function(_firebase, $, _, Handlebars, bootstrap) {
  var myFirebaseRef = new Firebase('https://get-reel.firebaseio.com/');

  myFirebaseRef.on("value", function(snapshot) {
    var allMovies = snapshot.val();
    var allMoviesArray = [];
    for (var key in allMovies) {
      allMoviesArray[allMoviesArray.length] = allMovies[key];
    }
    var allMoviesObject = {movies: allMoviesArray};

    require(['hbs!../templates/movies'], function(template) {
      $(".row").html(template(allMoviesArray));
    });

  });
  
  // On clicking "Spin the Reel":
  $('#movie-search').click(function () {
    // Capture user input
    var titleInput = $('#title-input').val();
    var yearInput = $('#year-input').val(); 

    // Run ajax call to get data
    $.ajax({
        url: 'http://www.omdbapi.com/?t=' + titleInput + '&y=' + yearInput + '&plot=short&r=json'
    }).done(function (data) {
        console.log(data);
        // // display data in thumbnail format, prompting the user to "Add" or "Cancel" to confirm the addition
        // //Parse JSON into javascript object
        // var movieResult = JSON.parse(data);
        // //
      myFirebaseRef.push(data);
    });
  });

});