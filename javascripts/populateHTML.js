define(["jquery", "hbs"], function($, Handlebars){
  return {
    putWatchedMoviesInHTML: function(data) {
        console.log("data", data);
        require(['hbs!../templates/moviesWatched'],function(movieTemplate){
          $("#moviesDiv").html(movieTemplate(data));
          $('.myRating').rating();
        });
      },
      putWishListMoviesInHTML: function(data) {
        require(['hbs!../templates/moviesWishList'],function(movieTemplate){
          $("#moviesDiv").html(movieTemplate(data));
        });
      },
      putSearchInHTML: function(data) {
        require(['hbs!../templates/moviesSearch'],function(movieTemplate){
          $("#moviesDiv").html(movieTemplate(data));
          $('.myRating').rating();
        });
      },
      putFindInHTML: function(data) {
        require(['hbs!../templates/moviesFind'],function(movieTemplate){
          // $(DIV TO PUT DATA).html(movieTemplate(data));
        });
      }      
    };
  }
); 
