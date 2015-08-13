define(["jquery", "hbs"], function($, Handlebars){
  return {
    putWatchedMoviesInHTML: function(data) {
        require(['hbs!../templates/moviesWatched'],function(movieTemplate){
          $("#MoviesDiv").html(movieTemplate(data));
        });
      },
      putWishListMoviesInHTML: function(data) {
        require(['hbs!../templates/moviesWishList'],function(movieTemplate){
          $("#MoviesDiv").html(movieTemplate(data));
        });
      },
      putSearchInHTML: function(data) {
        require(['hbs!../templates/moviesSearch'],function(movieTemplate){
          // $(DIV TO PUT DATA).html(movieTemplate(data));
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
