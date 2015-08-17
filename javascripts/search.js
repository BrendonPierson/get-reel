define(["jquery", "hbs", "populateHTML"], function($, Handlebars, populateHTML){
  return {
    search: function(userInput, data){
      filteredMovies = [];
      for(var key in data) {
        if(data[key].Title.toLowerCase().indexOf(userInput.toLowerCase()) > -1){
          filteredMovies[filteredMovies.length] = data[key];
        }
      }
      console.log("filteredMovies", filteredMovies);
      populateHTML.putSearchInHTML(filteredMovies);
      return filteredMovies;
    }      
  }; //end return
}); //end define