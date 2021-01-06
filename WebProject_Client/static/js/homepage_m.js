$(function(){
  var js = '<script type="text/javascript" src="../static/js/init.js"></script>'
  $('head').append(js)
  
  var url = document.location.toString();
  var arrUrl = url.split('//');
  var homepage_uId = arrUrl[1].split('/')[1];
  
  var token = window.localStorage.getItem('web_token');
  var uid = window.localStorage.getItem('web_user');

  // 自己访问自己的主页
  if(uid == homepage_uId){
    $('.release').removeClass('hide');
    $('#topic_re').attr('href',BASE_URL_WEB+'/'+uid+'/topic');
    $('#lesson_re').attr('href',BASE_URL_WEB+'/'+uid+'/lesson');
    $('.hm').html('我的首页');
    $('.hc').html('我的收藏');
  }

  // 获取被访问用户个人信息
  $.ajax({
    url: BASE_URL+'/v1/u/' + homepage_uId,
    type: 'GET',
    beforeSend: function(request){
      request.setRequestHeader("Authorization", token);
    },
    success: function(res){
      if(res.code == 200){
        console.log('被访问用户:'+ res.uid);
        console.log(res);
        var avatar_url = BASE_URL+'/media/'+ res.data.avatar;
        $('.tx img').attr('src', avatar_url);
        $('.yhm').html(res.data.nickname);
        $('#birthday').html(res.data.birthday);
        $('#location').html(res.data.location);
        $('#note').html(res.data.info);
        $('#tag').html(res.data.sign);
        $('.hc').attr('href',BASE_URL_WEB+'/'+ homepage_uId+'/hc');
      }else{
        alert(res.error);
      }
    }
  })

  //　获取被访问用户动态信息 
  $.ajax({
    url: BASE_URL + '/v1/topic/' + homepage_uId,
    type: 'GET',
    beforeSend: function(request){
      request.setRequestHeader("Authorization", token);
    },
    success: function(res){
      if(res.code == 200){
        console.log(res)
      }else{
        alert(res.error)
      }
    }
  })


})