$(document).on('turbolinks:load',function(){  
  function buildHTML(message){
    var body = message.body ? `${message.body}`: "";
    var img = message.image ? `<img src = ${message.image}>` : "";
    var html = `<div class="a-message" data-id="${message.id}">
                <div class="a-message__user">
                ${message.user_name}
                </div>
                <div class="a-message__time">
                ${message.date}
                </div>
                <div class="a-message__text"></div>
                ${body}
                ${img}
                </div>`
    return html;
  };

  function scrollBottom(){
    var target = $('.a-message').last();
    var position = target.offset().top + $('.messages').scrollTop();
    $('.messages').animate({
      scrollTop: position
    }, 300, 'swing');
  };


  $("#new_message").on('submit',function(e){
    e.preventDefault();
    var message = new FormData(this);

    $.ajax({
      url: "messages#create",
      type: "POST",
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .always(function(){
      $(".form__submit").removeAttr("disabled")
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html); 
      scrollBottom();
      $('form')[0].reset();
    })
    .fail(function(){
      alert('エラーが発生しました。もう一度確認ください。')
    })
    
  });


  $(window).on("load", function(){
    if (document.URL.match(/messages/)){
      var reloadMessages = function(){
        last_message_id = $('.a-message:last').data('id')
        $.ajax({
          url: "api/messages#index",
          type:'GET',
          dataType: 'json',
          data: {id: last_message_id}
        })
        .done(function(messages){
          var insertHTML = '';
          $.each(messages,function(i,message){
            insertHTML = buildHTML(message);
            html = insertHTML
            $('.messages').append(html);
            scrollBottom();
          })
        })
        .fail(function(){
          alert('Failed');
        })
      }
      setInterval( reloadMessages, 5000);
    }
  })
});