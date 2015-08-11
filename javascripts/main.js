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

  myFirebaseRef.child("movies").on("value", function(snapshot) {
    var allMoviesObject = snapshot.val();
    var allMoviesArray = [];
    console.log('allMoviesObject :', allMoviesObject); 

     // Convert Firebase's object of objects into an array of objects
    for (var key in allMoviesObject) {
      allMoviesArray[allMoviesArray.length] = allMoviesObject[key];
    }

    require(['hbs!../templates/movies'], function(template) {
      $(".row").html(template(allMoviesArray));
    });
  });
  
});