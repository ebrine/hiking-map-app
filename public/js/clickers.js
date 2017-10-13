$(document).ready(() => {
  $('#login').click((event) => {
    event.preventDefault();
    const url = $(event.currentTarget).attr("href");
    console.log(url);
    $.ajax({
      url,
    }).done((response) => {
      console.log(response);
      $("#login").hide();
      $("#register").hide();
      $(".landingnav").append(response);
    });
  });
  $('#register').click((event) => {
    event.preventDefault();
    const url = $(event.currentTarget).attr("href");
    console.log(url);
    $.ajax({
      url,
    }).done((response) => {
      console.log(response);
      $("#login").hide();
      $("#register").hide();
      $(".landingnav").append(response);
    });
  });
});
