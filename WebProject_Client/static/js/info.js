$(function(){
  var js = '<script type="text/javascript" src="../static/js/init.js"></script>'
  $('head').append(js)

  var token = window.localStorage.getItem('web_token');
  var user_id = window.localStorage.getItem('web_user');
  if(!(token)){
    alert('请先登录');
    $('body').addClass('hide');
    window.location.href = '/login';
    
  }

  $.ajax({
    url: BASE_URL+'/v1/u/'+ user_id,
    type: 'GET',
    beforeSend: function(request){
      request.setRequestHeader('Authorization', token);
    },
    success: function(res){
      if(res.code == 200){
        console.log(res);
        if (res.data.avatar){
          var avatar_url = BASE_URL+'/media/'+ res.data.avatar;
        }else{
          var avatar_url = BASE_URL_WEB+'/static/images/head/boy.png';
        }
        
        $('.tx img').attr('src', avatar_url);
        $('.yhm').html(res.data.nickname);
        $('.nickname').attr('value', res.data.nickname);
        $('.gender').val(res.data.gender);
        $('.location').val(res.data.location);
        $('.birthday').attr('value', res.data.birthday);
        $('.sign').attr('value', res.data.sign);
        $('.profile').html(res.data.info);
        
      }else{
        alert(res.error);
      }
    }
  });

  changeInfo = function (){
    var token = window.localStorage.getItem('web_token');
    var user_id = window.localStorage.getItem('web_user');
    var nickname = $('.nickname').val();
    var gender = $('.gender').val();
    var location = $('.location').val();
    var birthday = $('.birthday').val();
    var sign = $('.sign').val();
    var info = $('.profile').val();
    var post_data = {'nickname': nickname, 'gender': gender, 'location': location, 'birthday': birthday, 'sign': sign, 'info': info,}
    $.ajax({
      url: BASE_URL+'/v1/u/' + user_id,
      type: 'PUT',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(post_data),
      beforeSend: function(request){
        request.setRequestHeader('Authorization', token);
      },
      success: function(res){
        if(res.code == 200){
          alert('修改成功');
          window.location.reload();
        }
        else if(res.code == 10109){
          alert(res.error);
        }
        else{
          alert(res.error);
          window.location.href = '/login';
        }
      }
    });
  }

  upload = function(){
    var token = window.localStorage.getItem('web_token');
    var user_id = window.localStorage.getItem('web_user');
    var url = BASE_URL+'/v1/u/'+ user_id + '/avatar';
    var formdata = new FormData();
    formdata.append('avatar',$('#avatar')[0].files[0]);
    $.ajax({
      processData: false,
      contentType: false,
      url: url,
      type: 'POST',
      data: formdata,
      beforeSend: function(request){
        request.setRequestHeader('Authorization', token);
      },
      success: function(res){
        if(res.code == 200){
          alert('成功');
          window.location.reload()
        }else{
          alert('失败');
        }
      }
    })
  }


})