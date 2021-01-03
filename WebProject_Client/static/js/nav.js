$(function(){
  var css = '<link rel="stylesheet" href="../static/css/nav.css"></link>'
  $('head').append(css)

  var html = '<!-- 导航栏 -->\
  <nav>\
      <!-- logo -->\
      <img id="logo" src="../static/images/logo.png" alt="">\
      <ul class="nav_list">\
          <li><a href="/square">广场</a></li>\
          <li><a href="/shop">商城</a></li>\
          <li><a href="javascript:void(0)">关于我们</a></li>\
      </ul>\
      <!-- 登录注册 -->\
      <div class="user_btn">\
          <a href="/login" id="register">\
          <div>注册</div>\
          </a>\
          <a href="/login" id="login">\
          登录\
          </a>\
      </div>\
      <div class="user_area is_logout">\
        <a href="javascript:void(0)" id="setting">\
            <img src="../static/images/icon/setting.png" alt="">\
        </a>\
        <a href="javascript:void(0)" id="user">\
          <div>\
            <img src="../static/images/icon/user.png" alt="">\
            <div class="username"></div>\
          </div>\
        </a>\
      </div>\
  </nav>'
  $('header').append(html);  
  
  // $('#login').click(function(){
  //   $('.user_btn').addClass('is_logout');
  //   $('.user_area').removeClass('is_logout');
  // })
  // $('#setting').click(function(){
  //   $('.user_area').addClass('is_logout');
  //   $('.user_btn').removeClass('is_logout');
  // })

  var token = window.localStorage.getItem('web_token');
  var user_id = window.localStorage.getItem('web_user');

  if ((user_id)&&(token)){
    $('.user_btn').addClass('is_logout');
    $('.user_area').removeClass('is_logout');
    
  }else{
    $('.user_area').addClass('is_logout');
    $('.user_btn').removeClass('is_logout');
  }

  $.ajax({
    url: 'http://127.0.0.1:5000/v1/u/'+user_id,
    type: 'GET',
    beforeSend: function(request){
      request.setRequestHeader('Authorization',token);
    },
    success: function(res){
      console.log('登录用户:'+res.user_id)
      if(res.code == 200){
        $('.username').html(res.data.nickname);
        $('#user').attr('href','http://127.0.0.1:8000/'+ user_id + '/hm');
        $('#setting').attr('href','http://127.0.0.1:8000/'+ user_id + '/info');

      }else{
        alert(res.error)
      }
    }

  })




})


