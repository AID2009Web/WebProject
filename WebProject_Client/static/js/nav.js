$(function(){
  var css = '<link rel="stylesheet" href="../static/css/nav.css"></link>'
  $('head').append(css)

  var html = '<!-- 导航栏 -->\
  <nav>\
      <!-- logo -->\
      <img id="logo" src="../static/images/logo.png" alt="">\
      <ul class="nav_list">\
          <li><a href="../templates/square.html">广场</a></li>\
          <li><a href="../templates/shop.html">商城</a></li>\
          <li><a href="#">关于我们</a></li>\
      </ul>\
      <!-- 登录注册 -->\
      <div class="user_btn">\
          <a href="../templates/login.html" id="register">\
          <div>注册</div>\
          </a>\
          <a href="#" id="login">\
          登录\
          </a>\
      </div>\
      <div class="user_area is_logout">\
        <a href="#" id="setting">\
            <img src="../static/images/icon/setting.png" alt="">\
        </a>\
        <a href="#" id="user">\
          <div>\
            <img src="../static/images/icon/user.png" alt="">\
            <div class="username">特邀用户</div>\
          </div>\
        </a>\
      </div>\
  </nav>'
  $('header').append(html);  
  
  $('#login').click(function(){
    $('.user_btn').addClass('is_logout');
    $('.user_area').removeClass('is_logout');
  })
  $('#setting').click(function(){
    $('.user_area').addClass('is_logout');
    $('.user_btn').removeClass('is_logout');
  })
})


