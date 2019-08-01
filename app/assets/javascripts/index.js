$(document).on('turbolinks:load', function(){
  var search_list = $("#user-search-result")
  function appendUser(user){
    var html =`<div class="chat-group-user clearfix" id="add-chat-user">
               <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
              </div>`
        search_list.append(html);
    };

  function appendErrMsgToHTML(msg){
    var html =`<div class="chat-group-user clearfix" id="add-chat-user">
    <p class="chat-group-user__name">${ msg }</p>
    </div>`
    search_list.append(html);
  }

  function appendGroupUser(userName, userId){
    var html =`
              <div class='chat-group-user clearfix js-chat-member' id='${userId}'>
              <input name='group[user_ids][]' type='hidden' value='${userId}'>
              <p class='chat-group-user__name'>${userName}</p>
              <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
              </div>
              `
    $('#chat-group-users').append(html);
  }


  $('#user-search-field').on('keyup',function(){
    var input = $("#user-search-field").val()

    $.ajax({
      url: "/users",
      type: "GET",
      data: { keyword: input} ,
      dataType: 'json',
    })

    .done(function(users){
      $("#user-search-result").empty();
      if (users.length !== 0){
      users.forEach(function(user){
        var html = appendUser(user)
        $('#user-search-result').append(html);
      });
      } else {
        appendErrMsgToHTML('一致するユーザーはいません。');
      }
      if ( input.length == 0 ){
        $("#user-search-result").empty();
      }

    })
    .fail(function(){
      alert('エラーが発生しました。もう一度確認ください。')
    });
  });


  
  $('#user-search-result').on('click', '.user-search-add',function(){
    $(this).parent().remove();
    var userName = $(this).data('user-name');
    var userId = $(this).data('user-id');
    appendGroupUser(userName, userId);
  });

  $('#chat-group-users').on('click','.user-search-remove', function(){
    $(this).parent().remove();
  });
  

});