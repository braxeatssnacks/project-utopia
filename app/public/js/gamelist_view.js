
$(document).ready(function() {

  /* NEW GAME */

  // MODAL
  let out = false;
  $('#new-game').click(function() { // show
    $('#new-game-popup').fadeIn(function() {
      out = true;
    });
  });

  $(document).click(function(event) { // hide
    let eval = !$(event.target).closest('#new-game-popup').length;
    if (out && eval) {
      $('#new-game-popup').fadeOut(function() {
        out = false;
      });
    }
  });

  let action;

  // create new game
  $('[data-action="new-game"]').click(function () {
    action = "create";
    let classroom_id = Number($('[name="classroom"]').val().trim());
    let data = {
      action: action,
      classroom_id: isNaN(classroom_id) ? null : classroom_id
    };

    $.ajax({
      url: '/gamelist',
      type: 'POST',
      data: data,
      success: function(gameID) {
        console.log(gameID);
        window.location.href = `/game?id=${gameID}&stage=1`;
      },
      error: function(err) {
        console.log(err);
      }
    });
  });


});