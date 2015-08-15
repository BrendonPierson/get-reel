//take an object of movies and filter it based on criteria
define(["jquery", "populateHTML"],function($, populateHTML){
  var moviesWatched = [];
  var moviesWished = [];
  var moviesToAdd = [];
  return {
    displayWatched: function(data){
      for(var i = 0; i < data.length; i++){
        if(data[i].watched === true) {
          moviesWatched[moviesWatched.length] = data[i];
        }
      } 
      console.log("moviesWatched: ", moviesWatched);
      populateHTML.putWatchedMoviesInHTML(moviesWatched);
      return moviesWatched; 
    },
    displayWished: function(data){
      for(var i = 0; i < data.length; i++){
        if(data[i].wished === true) {
          moviesWished[moviesWished.length] = data[i];
        }
      } 
      console.log("moviesWished: ", moviesWished);
      populateHTML.putWishListMoviesInHTML(moviesWished);
      return moviesWished; 
    },
    displayToAdd: function(data){
      for(var i = 0; i < data.length; i++){
        if(data[i].wished === false && data[i].watched === false ) {
          moviesToAdd[moviesToAdd.length] = data[i];
        }
      } 
      console.log("moviesToAdd: ", moviesToAdd);
      populateHTML.putSearchInHTML(moviesToAdd);
      return moviesToAdd; 
    },
  };// end of return
});//end of define