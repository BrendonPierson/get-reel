// define(["jquery", "firebase"], function ($, _firebase) {
//   var imdbId = [];
//   var posterLinks = [];
//   $(document).on("click", '#add-movie', function() {
//     var userInput = $('#userInput').val();
//     $.ajax({
//       url: 'http://www.omdbapi.com/?s=' + userInput,
//       method: 'GET'
//     }).done(function (data) {
//       // for (var i in data.Search) {
//       //   imdbId.push(data.Search[i].imdbID);
//       // }
//       // for (var i in imdbId) {
//       //   $.ajax({
//       //     url: 'http://www.omdbapi.com/?i=' + i + '&plot=short&r=json',
//       //     method: 'GET'
//       // }).done(function (data)) {
//       //   console.log(data);
//       }//end of ajax poster
//     // });//end of ajax id done
//   // });//end of find click
// });//end of module