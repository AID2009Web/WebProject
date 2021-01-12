$(function(){
  var css = '<link rel="stylesheet" href="/static/css/nav.css"></link>'
  $('title').after(css)
  
  
  var html = `<!-- 导航栏 -->
  <nav>
      <!-- logo -->
      <img id="logo" src="/static/images/logo.png" alt="">
      <ul class="nav_list">
          <li><a href="/square">广场</a></li>
          <li><a href="/shop">商城</a></li>
          <li><a href="javascript:void(0)">关于我们</a></li>
      </ul>
      <!-- 登录注册 -->
      <div class="user_btn">
          <a href="/login" id="register">
          <div>注册</div>
          </a>
          <a href="/login" id="login">
          登录
          </a>
      </div>
      <div class="user_area is_logout">
        
          <div id="setting">
            <a href="javascript:void(0)" id="user">
              <img src="/static/images/icon/user.png" alt="">
              <div class="username"></div>
            </a>    
            <ul>
              <li class="changeInfo">修改信息</li>
              <li class="loginout">登出</li>
            </ul>
          </div>
          
        
      </div>
  </nav>`
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
          $('.changeInfo').on('click', function(){
            window.location.href = BASE_URL_WEB+ '/' + uid + '/info';
          });
          $('.loginout').on('click', function(){
            window.localStorage.removeItem('web_user');
            window.localStorage.removeItem('web_token');
            window.location.reload();
          })
          
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


