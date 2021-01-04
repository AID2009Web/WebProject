$(function(){
  var js = '<script type="text/javascript" src="../static/js/init.js"></script>'
  $('head').append(js)
  
  var url = document.location.toString();
  var arrUrl = url.split('//');
  var homepage_userId = arrUrl[1].split('/')[1];
  
  var token = window.localStorage.getItem('web_token');
  var user_id = window.localStorage.getItem('web_user');

  $.ajax({
    url: BASE_URL+'/v1/u/' + homepage_userId,
    type: 'GET',
    beforeSend: function(request){
      request.setRequestHeader("Authorization", token);
    },
    success: function(res){
      if(res.code == 200){
        console.log('被访问用户:'+ res.user_id);
        console.log(res);
        var avatar_url = BASE_URL+'/media/'+ res.data.avatar;
        $('.tx img').attr('src', avatar_url);
        $('.yhm').html(res.data.nickname);
        $('#birthday').html(res.data.birthday);
        $('#location').html(res.data.location);
        $('#note').html(res.data.info);
        $('#tag').html(res.data.sign);
        $('.hc').attr('href',BASE_URL_WEB+homepage_userId+'/hc');
      }else{
        alert(res.error);
      }

    }
  })
})