$(function(){
  var js = '<script type="text/javascript" src="../static/js/init.js"></script>'
  $('head').append(js)
  var ed = '<script src="../static/js/wangEditor.js"></script>'
  $('head').append(ed)

  var token = window.localStorage.getItem('web_token');
  var uid = window.localStorage.getItem('web_user');
  if(!(token)){
    alert('请先登录');
    $('body').addClass('hide');
    window.location.href = '/login';
    
  }

  const E = window.wangEditor
  const editor = new E('#editor')
  editor.create()


  $.ajax({
    url: BASE_URL+'/v1/u/'+ uid,
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

  sumbit = function (){
    var content = editor.txt.html()
    var limit = $("input[name='limit']:checked").val()
    var post_data = {
      'limit': limit,
      'content': content,
    }
    console.log(post_data)
    console.log(uid);
    
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      url: BASE_URL + '/v1/topic/' + uid,
      data: JSON.stringify(post_data),
      beforeSend: function(request){
        request.setRequestHeader('Authorization', token);
      },
      success: function(res){
        if(res.code==200){
          alert('发布成功');
          console.log(res);
          
          window.location.href = BASE_URL_WEB + '/' + uid +'/hm'
        }else{
          alert(res.error)
        }
      }
    })
    console.log('ajax done');
  }
    
})