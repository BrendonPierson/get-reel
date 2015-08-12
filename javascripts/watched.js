define(["jquery", "firebase"], function ($, _firebase) {
    return {
        movieWatched: function (button, prop, watchedTrueFalse) {
            $(button).css('color', 'white');
            $(button).css('background-color', '#286090');
           $(button).text('Watched');
           var ref = new Firebase('https://get-reel.firebaseio.com/' + prop);
           ref.update({watched: watchedTrueFalse});
        }
    };

});