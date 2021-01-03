$(function(){
  var url = document.location.toString();
  var arrUrl = url.split('//');
  var homepage_userId = arrUrl[1].split('/')[1];
  
  var token = window.localStorage.getItem('web_token');
  var user_id = window.localStorage.getItem('web_user');

  $.ajax({
    url: 'http://127.0.0.1:5000/v1/u/' + homepage_userId,
    type: 'GET',
    beforeSend: function(request){
      request.setRequestHeader("Authorization", token);
    },
    success: function(res){
      if(res.code == 200){
        console.log('被访问用户:'+ res.user_id);
        console.log(res);
        var avatar_url = 'http://127.0.0.1:5000/media/'+ res.data.avatar;
        $('.tx img').attr('src', avatar_url);
        $('.yhm').html(res.data.nickname);
        $('#birthday').html(res.data.birthday);
        $('#location').html(res.data.location);
        $('#note').html(res.data.info);
        $('#tag').html(res.data.sign);
        $('.hc').attr('href','http://127.0.0.1:8000/'+homepage_userId+'/hc');
      }else{
        alert(res.error);
      }

    }
  })
})