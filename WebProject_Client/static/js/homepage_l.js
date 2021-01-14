$(function(){
  var js = `<script src="../static/js/scrollReveal.js"></script>`
  $('head').append(js)

  var url = document.location.toString();
  var arrUrl = url.split('//');
  var homepage_uId = arrUrl[1].split('/')[1];
  var avatar_url ='';

  var token = window.localStorage.getItem('web_token');
  var uid = window.localStorage.getItem('web_user');

  // 自己访问自己的主页
  if(uid == homepage_uId){
    $('.release').removeClass('hide');
    $('#topic_re').attr('href',BASE_URL_WEB+'/'+uid+'/topic');
    $('#lesson_re').attr('href',BASE_URL_WEB+'/'+uid+'/lesson');
    $('.hm').html('我的动态');
    $('.hl').html('我的教程');
    $('.hc').html('我的收藏');
    $('.follow').addClass('hide');
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
        avatar_url = BASE_URL+'/media/'+ res.data.avatar;
        $('.tx img').attr('src', avatar_url);
        $('.yhm').html(res.data.nickname);
        $('#birthday').html(res.data.birthday);
        $('#location').html(res.data.location);
        $('#note').html(res.data.info);
        $('#tag').html(res.data.sign);
        $('.hc').attr('href',BASE_URL_WEB+'/'+ homepage_uId+'/hc');
        $('.hm').attr('href',BASE_URL_WEB+'/'+ homepage_uId+'/hm');
        $('title').html(res.data.nickname+'主页')
      }else{
        alert(res.error);
      }
    }
  })


  //　获取被访问用户动态信息 
  $.ajax({
    url: BASE_URL + '/v1/lesson/' + homepage_uId,
    type: 'GET',
    beforeSend: function(request){
      request.setRequestHeader("Authorization", token);
    },
    success: function(res){
      if(res.code == 200){
        console.log(res)
        var lessons = res.data.lessons
        if (lessons.length == 0){
          $('.message').html('没有内容');
          console.log('0');
          
        }else{
          $('.message').css('height','100%')
          for(var lesson of lessons){
            if(lesson.image != ''){
              var cover = `style="background-image: url(`+BASE_URL+'/media/' + lesson.image+`);"`;
            }else{
              var cove = '';
            }
            var view_link = BASE_URL_WEB + '/' + homepage_uId + '/lesson/'+ lesson.id + '#action';
            if(1){
              var view = `
              <div class="view">
                <ul>
                    <li>
                        <a href="`+view_link+`" class="comment">
                            <img src="../static/images/icon/comment.png" alt="">
                            <div>`+lesson.comment+`</div>
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
              <li lid="`+lesson.id+`">
                <div class="msg_withpic" data-scroll-reveal="enter bottom over 1s">
                  <div class="msg_pic">
                    <div class="msg_img"`+cover+`></div>
                  </div>
                  <div class="user_m">
                    <div class="head"></div>
                    <div class="info">`+ lesson.author +`</div>
                    <div class="time">`+ lesson.created_time+`</div>
                    <span class="content">`+ lesson.introduce +`</span>`
                    + view + `
                  </div>
                </div>
              </li> 
              `
              
              $('.message>ul').prepend(html);
              
            }
            
          }
          //初始化scroll
          window.scrollReveal = new scrollReveal();
          $('.head').css('background-image', ('url('+avatar_url+')'))
          // 添加跳转
          $('.msg_img').on('click',function(){
            var id = $(this).parents('li').attr("lid")
            console.log(id);
            window.location.href = BASE_URL_WEB + '/' + homepage_uId + '/lesson/'+ id
          })
        }
      }else{
        alert(res.error)
      }
    }
  })


})