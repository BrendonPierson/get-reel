define(["jquery", "hbs"], function($, Handlebars){
  var compare = function(a,b) {
      if (a.Title < b.Title)
        return -1;
      if (a.Title > b.Title)
        return 1;
      return 0;
    };

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
      },
      alphabetize: function(dataArray) {
        var sortedMovieArray = dataArray.sort(compare);
      }    
    };
  }
); 
