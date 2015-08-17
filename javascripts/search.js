define(["jquery", "hbs", "populateHTML", "lodash"], function($, Handlebars, populateHTML, _){
  return {
    search: function(userInput, data){
      filteredMovies = [];
      //// Looks just at titles
      // for(var key in data) {
      //   if(data[key].Title.toLowerCase().indexOf(userInput.toLowerCase()) > -1){
      //     filteredMovies[filteredMovies.length] = data[key];
      //   }
      // }


      //looks at all attributes of the film
      for(var key in data) {
        var textLow = [];
        var textArr = _.valuesIn(data[key]);
        textLow = textArr.join().toLowerCase();
        if(textLow.indexOf(userInput.toLowerCase()) > -1){
          filteredMovies[filteredMovies.length] = data[key];
        }
      }
      console.log("filteredMovies", filteredMovies);
      populateHTML.putSearchInHTML(filteredMovies);
      return filteredMovies;
    },
    autocompleteSource: function(sortedMovieArray){
      var autocompleteSource = [];
      for(var i = 0; i < sortedMovieArray.length; i++){
        autocompleteSource[autocompleteSource.length] = _.valuesIn(sortedMovieArray[i]);
      }
      autocompleteSource = _.flatten(autocompleteSource);
      return autocompleteSource;
    }      
  }; //end return
}); //end define