define(["jquery", "hbs"], function($, Handlebars){
  return {
    search: function(userInput, data){
      filteredMovies = [];
      for(var key in data) {
        if(data[key].Title.toLowerCase() === userInput.toLowerCase()){
          filteredMovies[filteredMovies.length] = data[key];
        }
      }
      console.log("filteredMovies", filteredMovies);
    }      
  }; //end return
}); //end define