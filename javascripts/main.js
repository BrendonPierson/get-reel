requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery' : '../bower_components/jquery/dist/jquery.min',
    'firebase' : '../bower_components/firebase/firebase',
    'hbs' : '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap' : '../bower_components/bootstrap/dist/js/bootstrap.min',
    'lodash' : '../bower_components/lodash/lodash.min',
    'rating2' : '../bower_components/bootstrap-rating/bootstrap-rating.min',
    'jqueryui': '../jquery-ui/jquery-ui.min'
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
  ["firebase", "jquery","jqueryui", "lodash", "hbs", "bootstrap", "dom-access", "delete", "watched", "rating", "rating2", "find", "populateHTML", "search", "filter", "editMovies"],
  function(_firebase, $, jqueryUI, _, Handlebars, bootstrap, D, deleter, watched, rating, rating2, find, populateHTML, search, filter, editMovies) {
    var myFirebaseRef = new Firebase('https://get-reel.firebaseio.com/');

    // Declare allMovies for require scope
    var allMovies = {};

    myFirebaseRef.on("value", function(snapshot) {
      console.log("Data snapshot from Firebase", snapshot.val());
      allMovies = snapshot.val();

    var allMoviesArray = [];
    var allMoviesTitles = [];

   
    //make array of firebase movie objects
    for (var key in allMovies) {
      allMoviesArray[allMoviesArray.length] = allMovies[key];
    }

    //create array of movie titles
    for(var i = 0; i < allMoviesArray.length; i++){
      allMoviesTitles[allMoviesTitles.length] = allMoviesArray[i].Title;
    }

    var sortedMovieArray = populateHTML.alphabetize(allMoviesArray);

    //not sure what the allMoviesObject is for
    // var allMoviesObject = {movies: allMoviesArray};

    //put movies in html from firebase base on what page you are on
    if($(location).attr('pathname') === "/index.html"){
      populateHTML.putWishListMoviesInHTML(sortedMovieArray);
    } else {
      populateHTML.putWatchedMoviesInHTML(sortedMovieArray);  
    }
    
    //autocomplete function
    $("#userInput").autocomplete({
      source: allMoviesTitles
    });
    
    //////////DOM EVENT HANDLERS//////////
    //search function
    var uniqueMoviesArray;
    $('button[type="submit"]').click(function(e){
      var combinedArrayOfMovies=[];
      e.preventDefault();
      var userInput = $("#userInput").val();
      var foundMovies = find.findMovies(userInput);
      var searchedMovies = search.search(userInput, allMovies);
      for (var i = 0; i < searchedMovies.length; i++) {
        combinedArrayOfMovies[combinedArrayOfMovies.length] = searchedMovies[i];
      }
      for (var key in foundMovies) {
        combinedArrayOfMovies[combinedArrayOfMovies.length] = foundMovies[key];
      }
      uniqueMoviesArray = _.chain(combinedArrayOfMovies).uniq('Title').sortBy('Title').value();
      console.log("uniqueMoviesArray", uniqueMoviesArray);
      $("#userInput").val('');
      populateHTML.putSearchInHTML(uniqueMoviesArray);

      //consider switching search to incorporate valuesIn, to look at more than the title
      //console.log("movies array valuesIn", _.valuesIn(sortedMovieArray[0]));
    });//end search function

  //search results filters 
    D.body.on('click', 'button[value="displayWatched"]', function(){
      filter.displayWatched(uniqueMoviesArray);
    });
    D.body.on('click', 'button[value="displayWished"]', function(){
      filter.displayWished(uniqueMoviesArray);
    });
    D.body.on('click', 'button[value="displayToAdd"]', function(){
      filter.displayToAdd(uniqueMoviesArray);
    });

  }); // End of Firebase snapshot
  
  //add movie to database
  D.moviesDiv.on('click', "#addMovie",function(){
    editMovies.add($(this).siblings().attr('alt'), myFirebaseRef);
  });

  //rating update function
  $('.myRating').rating();
  D.moviesDiv.on('change','input[class="myRating"]', function (e) {
    var userRating = $(this).attr('value');
    var ratingTitle = $(this).parent().parent().parent().siblings().attr('alt');
    var titleKey = _.findKey(allMovies, {'Title': ratingTitle});
    var ref = new Firebase('https://get-reel.firebaseio.com/' + titleKey);
    ref.update({rating: userRating});
  });

  /// database delete function 
  D.moviesDiv.on('click', '.delete', function(){
    editMovies.deleteMovie(allMovies, $(this).siblings().attr('alt'));
  });

  // Watched function
  D.moviesDiv.on('click', '.watched', function (e){
    editMovies.watched(e, allMovies, $(this).siblings().attr('alt'));
  });



}); //end require




