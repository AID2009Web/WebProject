$(function(){
  var js = `<script src="../static/js/scrollReveal.js"></script>`
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
        var topics = res.data.topics
        if (topics.length == 0){
          $('.message').html('没有内容');
          console.log('0');
          
        }else{
          $('.message').css('height','100%')

          for(var i=0;i<topics.length;i++){

            if(1){
              var view = `
              <div class="view">
                <ul>
                    <li>
                        <a href="javascript:void(0)" >
                            <img src="../static/images/icon/comment.png" alt="">
                            <div>1231</div>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0)" >
                            <img src="../static/images/icon/like.png" alt="">
                            <div>1231</div>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0)" >
                            <img src="../static/images/icon/share.png" alt="">
                            <div>642</div>
                        </a>
                    </li>
                </ul>
              </div>`
              
              var html = `
              <li>
                <div class="msg_withoutpic" data-scroll-reveal="enter bottom over 1s">
                  <div class="user_m">
                    <div class="head"></div>
                    <div class="info">`+ res.data.topics[i].author +`</div>
                    <div class="time">`+ res.data.topics[i].created_time+`</div>
                    <span class="content">`+ res.data.topics[i].content +`</span>`
                    + view + `
                  </div>
                </div>
              </li> 
              `
              $('.message>ul').prepend(html);
              console.log(res.data.topics[i]);

            }
        
          }
          //初始化scroll
          window.scrollReveal = new scrollReveal();
        }
      }else{
        alert(res.error)
      }
    }
  })


})