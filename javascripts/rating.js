define(["jquery", "firebase"], function ($, _firebase) {
    return {
        submitRating: function (button, ratingKey, rating) {
           $(button).css('display', "none");
           
           var ref = new Firebase('https://get-reel.firebaseio.com/' + ratingKey);
           ref.update({rating: rating});
        }
    };

});