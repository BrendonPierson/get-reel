define(["firebase"],function(_firebase) {
  return {
    delete: function(argument) {
      var ref = new Firebase("https://get-reel.firebaseio.com/" + argument);
      ref.remove();
    }
  };
});