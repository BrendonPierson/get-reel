define(["jquery", "firebase"], function ($, _firebase) {
    return {
        movieWatched: function (button, prop, watchedTrueFalse) {
           var ref = new Firebase('https://get-reel.firebaseio.com/' + prop);
           ref.update({watched: watchedTrueFalse});
        }
    };

});