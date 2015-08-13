define(["jquery", "hbs", "populateHTML"], function($, Handlebars, populateHTML){
  return {
    search: function(userInput, data){
      filteredMovies = [];
      for(var key in data) {
        if(data[key].Title.toLowerCase() === userInput.toLowerCase()){
          filteredMovies[filteredMovies.length] = data[key];
        }
      }
      console.log("filteredMovies", filteredMovies);
      populateHTML.putSearchInHTML(filteredMovies);
    }      
  }; //end return
}); //end define