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
  ["firebase", "jquery","jqueryui", "lodash", "hbs", "bootstrap", "dom-access", "delete", "watched", "rating", "rating2", "find", "populateHTML", "search", "filter"],
  function(_firebase, $, jqueryUI, _, Handlebars, bootstrap, D, deleter, watched, rating, rating2, find, populateHTML, search, filter) {
    var myFirebaseRef = new Firebase('https://get-reel.firebaseio.com/');

    // Declare allMovies for require scope
    var allMovies = {};

    myFirebaseRef.on("value", function(snapshot) {
      console.log(snapshot.val());
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

    function compare(a,b) {
      if (a.Title < b.Title)
        return -1;
      if (a.Title > b.Title)
        return 1;
      return 0;
    }

    var sortedMovieArray = allMoviesArray.sort(compare);

    D.body.on('click', 'button[value="displayWatched"]', function(){
      filter.displayWatched(sortedMovieArray);
    });
    D.body.on('click', 'button[value="displayWished"]', function(){
      filter.displayWished(sortedMovieArray);
    });
    D.body.on('click', 'button[value="displayToAdd"]', function(){
      filter.displayToAdd(sortedMovieArray);
    });
    // populateHTML.alphabetize(allMoviesArray);

    //not sure what the allMoviesObject is for
    // var allMoviesObject = {movies: allMoviesArray};

    //put movies in html from firebase base on what page you are on
    if($(location).attr('pathname') === "/index.html"){
      populateHTML.putWishListMoviesInHTML(sortedMovieArray);
    } else {
      populateHTML.putWatchedMoviesInHTML(sortedMovieArray);  
    }
    
    
    
    //////////DOM EVENT HANDLERS//////////
    $('button[type="submit"]').click(function(e){
      var CombinedfilteredArrayOfMovies=[];
      e.preventDefault();
      var userInput = $("#userInput").val();
      var foundMovies = find.findMovies(userInput);
      for (key in foundMovies) {
        CombinedfilteredArrayOfMovies[CombinedfilteredArrayOfMovies.length] = foundMovies[key];
      }
      CombinedfilteredArrayOfMovies[CombinedfilteredArrayOfMovies.length] = search.search(userInput, allMovies)[0];
      $("#userInput").val('');
      console.log("CombinedfilteredArrayOfMovies", CombinedfilteredArrayOfMovies);
      populateHTML.putSearchInHTML(CombinedfilteredArrayOfMovies);
    });



    
   
    $("#userInput").autocomplete({
      source: allMoviesTitles
    });

  }); // End of Firebase snapshot
  

  $(".modal").on('click', "#addMovie",function(){
    $.ajax({
      url: 'http://www.omdbapi.com/?i=' + $(this).parent().attr('id') + '&plot=short&r=json',
    }).done(function(data) {
        data.watched = false;
        data.rating = "Not rated";
        data.wished = true;
        console.log(data);
        myFirebaseRef.push(data); 
        $("body").removeClass("modal-open");    
        $("#myModal").slideUp('slow'); 
        $("#myModal").modal('hide');
      });
  });




  // On clicking "Spin the Reel": (consider moving this function to module?)
  $('#movie-search').click(function () {
    // Close form: (possible modification - on click, hidden div displays with the movie info asking to confirm the selection.)
    $('#confirmation').removeClass('hidden');
    // Capture user input
    var titleInput = $('#title-input').val();
    var yearInput = $('#year-input').val(); 

    // Run ajax call to get data
    // $.ajax({
    //     url: 'http://www.omdbapi.com/?t=' + titleInput + '&y=' + yearInput + '&plot=short&r=json'
    // }).done(function (data) {
    //     data.watched = false;
    //     data.rating = "Not rated";
    //     console.log(data);
    //     myFirebaseRef.push(data);

    // });
  });

  //rating updatefunction
  $('.myRating').rating();

  $('body').on('change','input[class="myRating"]', function (e) {
  var userRating = $(this).attr('value');
  var ratingTitle = $(this).parent().parent().parent().siblings().attr('alt');
  var titleKey = _.findKey(allMovies, {'Title': ratingTitle});
  var ref = new Firebase('https://get-reel.firebaseio.com/' + titleKey);
  ref.update({rating: userRating});
  });

  /// database delete function ///
  $(document).on("click", '.delete', function() {
    var deleteTitle = $(this).siblings().attr('alt');
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
    var watchedMovie = $(this).siblings().attr('alt');
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




