define(["jquery", "firebase"], function ($, _firebase) {
  $(document).on("click", '#add-movie', function() {
    var userInput = $('#userInput').val();
    $.ajax({
      url: 'http://www.omdbapi.com/?s=' + titleInput,
      method: 'GET'
    }).done(function (data) {
        console.log(data);
    });//end of ajax done
  });//end of find click
});//end of module