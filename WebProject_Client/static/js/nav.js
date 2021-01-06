$(function(){
  var css = '<link rel="stylesheet" href="../static/css/nav.css"></link>'
  $('head').append(css)
  var js = '<script type="text/javascript" src="../static/js/init.js"></script>'
  $('head').append(js)
  
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
  


  var token = window.localStorage.getItem('web_token');
  var uid = window.localStorage.getItem('web_user');

  if ((uid)&&(token)){
    $('.user_btn').addClass('is_logout');
    $('.user_area').removeClass('is_logout');
    // 已登录用户个人信息获取
    $.ajax({
      url: BASE_URL+'/v1/u/'+uid,
      type: 'GET',
      beforeSend: function(request){
        request.setRequestHeader('Authorization',token);
      },
      success: function(res){
        console.log('登录用户:'+res.uid)
        if(res.code == 200){
          $('.username').html(res.data.nickname);
          $('#user').attr('href',BASE_URL_WEB+ '/' + uid + '/hm');
          $('#setting').attr('href',BASE_URL_WEB+ '/' + uid + '/info');
        }else{
          alert(res.error)
        }
      }
    })

  }else{
    $('.user_area').addClass('is_logout');
    $('.user_btn').removeClass('is_logout');
    
  }




})


