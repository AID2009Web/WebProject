$(function(){
  
  var ed = '<script src="../static/js/wangEditor.js"></script>'
  $('head').append(ed)

  var url = document.location.toString();
  var arrUrl = url.split('//');
  var author_uid = arrUrl[1].split('/')[1];

  var token = window.localStorage.getItem('web_token');
  var uid = window.localStorage.getItem('web_user');
  if(!(token)){
    alert('请先登录');
    $('body').addClass('hide');
    window.location.href = '/login';
    
  }
  if(uid != author_uid){
    alert('地址错误禁止访问，正在重定向...');
    window.location.href = BASE_URL_WEB + '/' + author_uid + '/hl';
  }

  const E = window.wangEditor;
  const editor = new E('#editor');
  editor.create();


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
    var title = $('#title').val();
    var content_text = editor.txt.text();
    var content = editor.txt.html();
    var limit = $("input[name='limit']:checked").val();
    var category = $("input[name='category']:checked").val();
    var video = $('#video').val();
    var post_data = {
      'title': title,
      'category': category,
      'limit': limit,
      'content': content,
      'content_text': content_text,
      'video': video,
    }
    console.log(post_data)
    console.log(uid);
    
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      url: BASE_URL + '/v1/lesson/' + uid,
      data: JSON.stringify(post_data),
      beforeSend: function(request){
        request.setRequestHeader('Authorization', token);
      },
      success: function(res){
        if(res.code==200){
          alert('发布成功');
          console.log(res);
          
          window.location.href = BASE_URL_WEB + '/' + uid +'/hl'
        }else{
          alert(res.error)
        }
      }
    })
  }
    
  upload = function(){

  }
})