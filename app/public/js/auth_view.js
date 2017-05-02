$(document).ready(function() {

  // auth
  $('.auth-button').click(function() {
    console.log($(this).attr('id'));
    if ($(this).attr('id') === 'login') { // login
      $('.login-form').submit();
    } else if ($(this).attr('id') === 'signup') { // signup
      $('.signup-form').submit();
    }
  });

  // enter on input should work too
  $('input').keydown(function(event) {
    let content = $(this).val().trim();
    if (content.length > 0 && event.keyCode === 13) { // enter
      event.preventDefault();
      if ($(this).parents('.login-form').length) {
        $('.login-form').submit();
      } else if ($(this).parents('.login-form').length) {
        $('.signup-form').submit();
      }
    }
  });



});