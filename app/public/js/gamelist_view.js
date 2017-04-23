
$(document).ready(function() {

  /* NEW GAME */

  // modal pop up
  let out = false;
  $('#new-game').click(function() {
    if (!out) {
      $('#new-game-popup').fadeIn(function() {
        out = true;
      });
    }
  });
  $(':not("#new-game")').click(function() {
    if (out) {
      $('#new-game-popup').fadeOut(function() {
        out = false;
      });
    }
  });


});