define(["jquery", "firebase", "populateHTML"], function ($, _firebase, populateHTML) {
  var imdbId = [];
  var posterLinks = [];
  var titles = [];
  var movieInfo = {};
  $(document).on("click", '#add-movie', function() {
    var userInput = $('#userInput').val();
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
      }
      console.log(movieInfo);

      populateHTML.putFindInHTML(movieInfo);
    });//end of ajax id and poster calls
  });//end of find click
});//end of module