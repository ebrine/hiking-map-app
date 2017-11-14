$(document).ready(() => {
  $('#login').click((event) => {
    event.preventDefault();
    const url = $(event.currentTarget).attr("href");
    $.ajax({
      url,
    }).done((response) => {
      $("#login").hide();
      $("#register").hide();
      $(".landingnav").append(response);
    });
  });

  $('.landingnav').on("submit", "#login-form",(e) => {
    console.log("caught");
    e.preventDefault();
    const url = $(e.currentTarget).attr('action');
    const data = $(e.currentTarget).serialize();
    $.ajax({
      method: "POST",
      url,
      data,
    }).done((response) => {
      if (response === 'redirect') {
        window.location.href = '/home';
      } else {
        $('.error-container').show();
      }
    });
  });

  $('.landingnav').on("submit", "#registration-form", (e) => {
    console.log("caught");
    e.preventDefault();
    const url = $(e.currentTarget).attr('action');
    const data = $(e.currentTarget).serialize();
    console.log(data)
    $.ajax({
      method: "POST",
      url,
      data,
    }).done((response) => {
      
      if (response === 'redirect') {
        window.location.replace('/home');
      } else {
        console.log(response)
        $('.error-text').not(':first').remove()
        for (const text of response) {
          let $textVar = $('.error-text:first').clone().append(text);
          $('.error-container').append($textVar);
        }
        $('.error-container').show();
      }
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
