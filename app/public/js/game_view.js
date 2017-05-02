const animateSpeed = 150;
window.paneFocus = false;

$(document).ready(function() {

  // // TEST CORS to remote app
  // $.ajax({
  //   url: 'http://104.236.16.42:5000/update_stage',
  //   type: 'POST',
  //   contentType: 'application/json',
  //   data: JSON.stringify({
  //     name: 'Fredrick Kofi',
  //     email: 'fkt2105@columbia.edu',
  //     stage_number: '1',
  //     stage_date_started: new Date(),
  //     stage_date_completed: new Date(),
  //     attempts: '2',
  //     code: 'codey codey kofi',
  //     section_id: '1',
  //   }),
  //   success: function(resp) {
  //     console.log(resp);
  //   },
  //   error: function(err) {
  //     console.log(err);
  //   }
  // });

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

  /* CODE SUBMISSION  */
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
        // series of checks
        let error = false;

        // parse entry
        let xText = $('#code-submission').find('[data-coords]')[0].innerText;
        let yText = $('#code-submission').find('[data-coords]')[1].innerText;

        let xTarget, yTarget, xCoord, yCoord;
        if ((xTarget = xText.indexOf('x:')) > -1) {
          let end = xText.indexOf('/') > -1 ? xText.indexOf('/') : xText.length;
          xCoord = Number(xText.substring(xTarget+2, end).trim());
        } else { error = true; }
        if ((yTarget = yText.indexOf('y:')) > -1) {
          let end = yText.indexOf('/') > -1 ? yText.indexOf('/') : yText.length;
          yCoord = Number(yText.substring(yTarget+2, end).trim());
        } else { error = true; }

        if (isNaN(xCoord) || isNaN(yCoord)) {
          error = true;
        } else if (!error) { // success
          createStar(xCoord, yCoord);
        }
        // generate a star with those coordinates
        $(self).removeClass('ajax-in-progress').html('submit');
      }
    });
  });
});

function getCoordinates(code) {
  return code;
}