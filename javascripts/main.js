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
    var allMovieObject = snapshot.val();
    console.log('allMovieObject :', allMovieObject);

    require(['hbs!../templates/movies'], function(template) {
      console.log("allMovieObject line 29 :", allMovieObject);
      $("#row").html(template(allMovieObject));
    });

  });
  
});