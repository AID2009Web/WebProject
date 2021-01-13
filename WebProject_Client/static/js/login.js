$(function(){
  var js = '<script type="text/javascript" src="../static/js/init.js"></script>'
  $('head').append(js)

  
  $('.first>a').click(function(){
    $('.first').addClass('active');
    $('.second').removeClass('active');
    $('.account').addClass('hide');
  })
  $('.second>a').click(function(){
    $('.second').addClass('active');
    $('.first').removeClass('active');
    $('.account').removeClass('hide');
  })
  $('#pwdtext').click(function(){
    $('.text_add').addClass('hide');
    $('#pwdtext').addClass('hide');
    $('.psd_add').removeClass('hide');
    $('#text').removeClass('hide');
    $('#psd').val('');
    $('#sign1').html('');
  })
  $('#text').click(function(){
    $('.psd_add').addClass('hide');
    $('#text').addClass('hide');
    $('.text_add').removeClass('hide');
    $('#pwdtext').removeClass('hide');
    $('#sms').val('');
    $('#sign1').html('');
  })
  
  var countdown=60;
  
	settime = function(obj) {
    var user_id = $('#uname').val();
    var reg = /^1[0-9]{10}$/;
    if(!(user_id)){
      $('#sign1').html('请输入手机号');
      clearInterval(timer);
    }
    else if (!(reg.test(user_id))){
      $('#sign1').html('手机号格式不正确');
      clearInterval(timer);
    }else{
      if (countdown == 0) {
          obj.removeAttribute("disabled");
          obj.value="获取验证码";
          countdown = 60;
          return;
      } else {
          obj.setAttribute("disabled", true);
          obj.value="重新发送(" + countdown + ")";
          countdown--;
      }
      var timer = setTimeout(function() {
        settime(obj) }
      ,1000)
    
    }
  }

  
  

  $('#uname').change(function(){
    var user_id = $('#uname').val();
    var reg = /^1[0-9]{10}$/;
    if (reg.test(user_id)){
      $('#sign1').html('');
    }else{
      $('#sign1').html('手机号格式不正确');
    }
  })


  login = function(){
    var reg = /^1[0-9]{10}$/;
    var user_id = $('#uname').val();
    var pwd = $('#psd').val();
    var sms = $('#sms').val();
    var post_data = {}
    
    if (!(user_id)){
      $('#sign1').html('请输入手机号');
    }
    else if (!(reg.test(user_id))){
      $('#sign1').html('手机号格式不正确');
    }
    else if($('.psd_add').hasClass('hide')){
      if (sms){
        $('#sign1').html('');
        post_data = {'user_id':user_id, 'pwd': '', 'sms': sms}
      }else{
        $('#sign1').html('请输入验证码');
      }
    }else{
      if (pwd){
        $('#sign1').html('');
        post_data = {'user_id':user_id, 'pwd': pwd, 'sms': ''}
      }else{
        $('#sign1').html('请输入密码');
      }
    }
    // post_data = {'user_id':user_id, 'pwd': pwd, 'sms': sms}
    console.log(post_data)
    $.ajax({
      url: BASE_URL+'/v1/u',
      type: 'POST',
      dataType: 'json',
      data:JSON.stringify(post_data),
      contentType: 'application/json',
      success: function(res){
        console.log(res);
        if(res.code == 200){
          
          window.localStorage.setItem('web_token', res.data.token);
          window.localStorage.setItem('web_user', res.uid);
          window.location.href = BASE_URL_WEB +'/'+ res.uid + '/info';
          alert('登录成功') ;
        }else{
          alert(res.error);
        }
      }
    })
  }

  sendSMS = function(){
    var phone = $('#uname').val();
    var post_data = {"phone": phone}
    $.ajax({
      url: BASE_URL+'/v1/u/sms',
      type: 'POST',
      data: JSON.stringify(post_data),
      contentType: 'application/json',
      dataType: 'json',
      success: function(res){
        if(res.code == 200){
          alert('短信已经发送到您输入的手机，请注意查收');
        }else{
          alert(res.error);
        }

      }
    })
  }

})