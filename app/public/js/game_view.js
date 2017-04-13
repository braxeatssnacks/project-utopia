const animateSpeed = 150;
window.paneFocus = false;

$(document).ready(function() {

  $('#code-submission')
    .focusin(function() {
      window.paneFocus = true;
  })
    .focusout(function() {
      window.paneFocus = false;
    });

  /* PANEL OPERATIONS */
  let open = true;
  $('[data-action=panel-toggle]').click(function() {
    let $codePanel = $('#code-panel');
    if (open) { // close
      $codePanel.animate({
        marginRight: `-=${$codePanel.width()}`
      }, animateSpeed, function() {
        console.log($(this));
        open = false;
      });
    } else { // open
      $codePanel.animate({
        marginRight: `+=${$codePanel.width()}`
      }, animateSpeed, function() {
        open = true;
      });
    }
  });

  /* CODE SUBMISSION */
  $('[data-action=code-submit]').click(function() {
    let content = $('#code-submission').text().trim();
    let self = this;
    // replace submit text with spinning wheel
    let loadingWheel = '<img class="loading-wheel" src="img/pacman.gif" />';
    $(self).addClass('ajax-in-progress').html(loadingWheel);

    // insert code attempt into db
    $.ajax({
      url: window.location.href,
      type: 'POST',
      data: { action: 'submit', data: content },
      success: function(resp) {
        // console.log('we got sum ', resp);
        $(self).removeClass('ajax-in-progress').html('submit');
      }
    });
  });
});