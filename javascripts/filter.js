//take an object of movies and filter it based on criteria
define(["jquery", "populateHTML", "dom-access"],function($, populateHTML, D){

  return {
    displayWatched: function(data){
      var moviesWatched = [];
      $("#filterButtons").remove();
      for(var i = 0; i < data.length; i++){
        if(data[i].watched === true) {
          moviesWatched[moviesWatched.length] = data[i];
        }
      } 
      console.log("moviesWatched: ", moviesWatched);
      populateHTML.putWatchedMoviesInHTML(moviesWatched);
      $("#moviesDiv").before('<div id="filterButtons" class="btn-group bot-marg" role="group"><button type="button" class="btn btn-primary" value="displayWatched">Watched</button><button type="button" class="btn btn-primary" value="displayWished">Wished</button><button type="button" class="btn btn-primary" value="displayToAdd">To Add</button></div>');
      return moviesWatched; 
    },
    displayWished: function(data){
      var moviesWished = [];
      $("#filterButtons").remove();
      for(var i = 0; i < data.length; i++){
        if(data[i].wished === true) {
          moviesWished[moviesWished.length] = data[i];
        }
      } 
      console.log("moviesWished: ", moviesWished);
      populateHTML.putWishListMoviesInHTML(moviesWished);
      $("#moviesDiv").before('<div id="filterButtons" class="btn-group bot-marg" role="group"><button type="button" class="btn btn-primary" value="displayWatched">Watched</button><button type="button" class="btn btn-primary" value="displayWished">Wished</button><button type="button" class="btn btn-primary" value="displayToAdd">To Add</button></div>');

      return moviesWished; 
    },
    displayToAdd: function(data){
      var moviesToAdd = [];
      $("#filterButtons").remove();
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