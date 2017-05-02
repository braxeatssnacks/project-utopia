$(document).ready(function() {
  $('.auth-button').click(function() {
    console.log($(this).attr('id'));
    if ($(this).attr('id') === 'login') {
      $('.login-form').submit();
    } else if ($(this).attr('id') === 'signup') {
      $('.signup-form').submit();
    }
  });
});