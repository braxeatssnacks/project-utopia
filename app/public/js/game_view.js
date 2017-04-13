$(document).ready(function() {

  /* PANEL OPERATIONS */
  let open = true;
  $('#panel-toggle').click(function() {
    let $codePanel = $('#code-panel');
    if (open) { // close
      $codePanel.animate({
        marginRight: `-=${$codePanel.width()}`
      }, 200, function() {
        console.log($(this));
        open = false;
      });
    } else { // open
      $codePanel.animate({
        marginRight: `+=${$codePanel.width()}`
      }, 200, function() {
        open = true;
      });
    }
  });
});