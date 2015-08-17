define(["jquery", "firebase", "populateHTML"], function ($, _firebase, populateHTML) {
  var imdbId = [];
  var posterLinks = [];
  var titles = [];
  var movieInfo = {};


  return {
    findMovies: function(userInput) {
      console.log("userInput: ", userInput);
      $.ajax({
        url: 'http://www.omdbapi.com/?s=' + userInput,
        method: 'GET',
        async: false
      }).done(function (data) {
        for (var i in data.Search) {
          imdbId.push(data.Search[i].imdbID);
        }
        for (var j = 0; j < imdbId.length; j++) {
          $.ajax({
            url: 'http://www.omdbapi.com/?i=' + imdbId[j] + '&plot=short&r=json',
            method: 'GET',
            async: false
          }).done(function (data) {
            titles.push(data.Title);
            posterLinks.push(data.Poster);
          });
        }
        for (var k = 0; k < imdbId.length; k++) {        
          movieInfo[imdbId[k]] = {};
          movieInfo[imdbId[k]].Title = titles[k];
          movieInfo[imdbId[k]].Poster = posterLinks[k];
          movieInfo[imdbId[k]].wished = false;
          movieInfo[imdbId[k]].watched = false;
          movieInfo[imdbId[k]].found = true;
        }
        console.log('movie info', movieInfo);
        $('#userInput').val('');
        // populateHTML.putFindInHTML(movieInfo);
        
      });//end of ajax done calls
      return movieInfo;
    },//end Function
    resetVariables: function() {
      imdbId.length = 0;
      posterLinks.length = 0;
      titles.length = 0;
      movieInfo = {};
    }
  }; //end return 
});//end of module