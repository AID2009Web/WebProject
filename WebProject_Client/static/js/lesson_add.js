$(function(){
  
  var ed = '<script src="../static/js/wangEditor.js"></script>'
  $('head').append(ed)

  var url = document.location.toString();
  var arrUrl = url.split('//');
  var author_uid = arrUrl[1].split('/')[1];

  var token = window.localStorage.getItem('web_token');
  var uid = window.localStorage.getItem('web_user');

  // 未登录将重定向，ID不一致则禁止访问
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

  // 用户信息获取
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
        }
        $('.tx img').attr('src', avatar_url);
        $('.yhm').html(res.data.nickname);
        
      }else{
        alert(res.error);
      }
    }
  });

  sumbit = function (){
    var token = window.localStorage.getItem('web_token');
    var title = $('#title').val();
    var content_text = editor.txt.text();
    var content = editor.txt.html();
    var limit = $("input[name='limit']:checked").val();
    var category = $("input[name='category']:checked").val();
    var video = $('#video').val();

    var formdata = new FormData();
    if($('#cover')[0].files[0]){
      formdata.append('cover',$('#cover')[0].files[0]);
    }
    formdata.append('title', title)
    formdata.append('category', category)
    formdata.append('limit', limit)
    formdata.append('content', content)
    formdata.append('content_text', content_text)
    formdata.append('video', video)
    console.log(formdata)
    console.log(uid);
    
    $.ajax({
      type: 'POST',
      contentType: false,
      processData: false,
      dataType: 'json',
      url: BASE_URL + '/v1/lesson/' + uid,
      data: formdata,
      beforeSend: function(request){
        request.setRequestHeader('Authorization', token);
        console.log(token);
      },
      success: function(res){
        if(res.code==200){
          alert('发布成功');
          console.log(res);
          
          window.location.href = BASE_URL_WEB + '/' + uid +'/hl'
        }else{
          alert(res.code)
        }
      }
    })
  }
    
  upload = function(){
    viewImage();
  }
  function viewImage(){
    var file = $('#cover').prop('files')[0];
    console.log(file);
    
    if (file){
      console.log('1')
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function(even){
        $('#cover_preview').attr('style', 'background-image: url('+even.currentTarget.result+');');
      }
    }
  }
  
})