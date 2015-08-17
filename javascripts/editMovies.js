define(["dom-access", "firebase", "delete", "watched"], function(D, _firebase, deleter, watched) {
  return {
    deleteMovie: function(allMovies, deleteTitle) {
      console.log("deleteTitle :", deleteTitle);
      var titleKey = '';
      console.log("allMovies :", allMovies);
      titleKey = _.findKey(allMovies, {'Title': deleteTitle});
      console.log("titleKey :", titleKey);
      deleter.delete(titleKey); // Run from delete.js module
      $(this).parent().remove();
      return titleKey;
    },
    watched: function (e, allMovies, watchedMovie) {
      e.preventDefault();
      // Grab the key from Firebase and change key watched to true

      var allTitles = [];
      // var watchedMovie = $(this).siblings().attr('alt');
      allTitles = _.pluck(allMovies, 'Title');
        for (var i = 0; i < allTitles.length; i++) {
          if (allTitles[i] === watchedMovie) {
            watchedProperty = _.findKey(allMovies, {'Title': watchedMovie});
            // console.log(watchedProperty);
          }
        }
      // Run movieWatched function from watched.js module.
      watched.movieWatched(this, watchedProperty, true);
      
    },
    add: function(title, myFirebaseRef){
      console.log("add movie button pressed");
      // console.log($(this).siblings().attr('alt'));
      $.ajax({
        url: 'http://www.omdbapi.com/?t=' + title + '&plot=short&r=json',
      }).done(function(data) {
          data.watched = false;
          data.rating = "Not rated";
          data.wished = true;
          console.log(data);
          myFirebaseRef.push(data); 
        });
    }, 
  };
});