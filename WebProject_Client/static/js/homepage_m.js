$(function(){
  var js = `<script src="../static/js/scrollReveal.js"></script>
  <script src="/static/js/xcConfirm.js"></script>`
  $('head').append(js)
  var css = `<link rel="stylesheet" href="/static/css/comment.css">`
  $('title').after(css)

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
        $('.hl').attr('href',BASE_URL_WEB+'/'+ homepage_uId+'/hl');
        $('title').html(res.data.nickname+'主页')
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

          for(var topic of topics){

            if(1){
              var view = `
              <div class="view">
                <ul>
                    <li>
                        <a href="javascript:void(0)" class="replyComment" tid=`+topic.id+`>
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
              
              var options =`
                <div class="options">[+]
                  <ul>
                    <li id="modify">修改</li>
                    <li id="del">删除</li>
                  </ul>
                </div>`

              var html = `
              <li tid=`+topic.id+`>
                <div class="msg_withoutpic" data-scroll-reveal="enter bottom over 1s">
                  <div class="user_m">
                    <div class="head" style="background-image: url(`+avatar_url+`);"></div>
                    <div class="info">`+ topic.author +`</div>
                    <div class="time">`+ topic.created_time+`</div>`
                    + options + `
                    <span class="content">`+ topic.content +`</span>`
                    + view + `
                  </div>
                </div>
              </li> 
              `
              console.log(topic.id);
              $('.message>ul').prepend(html);
            }
          }

          //初始化scroll
          window.scrollReveal = new scrollReveal();

          var list = document.getElementsByClassName('replyComment');
          for(var i of list){
            i.addEventListener('click', function(even){
              even.preventDefault();
              var cid = this.getAttribute('cid');
              var tid = this.getAttribute('tid');
              window.wxc.xcConfirm("请输入回复：","input",{onOk:function(reply){
                // console.log(reply);
                if(reply != ''){
                  var post_data = {'content': reply}
                  var reply_url = BASE_URL + '/v1/message/t/'+ tid;
                  $.ajax({
                    type: 'POST',
                    contentType: 'application/json',
                    dataType: 'json',
                    url: reply_url,
                    data: JSON.stringify(post_data),
                    beforeSend: function(request){
                      request.setRequestHeader("Authorization", token);
                    },
                    success: function(res){
                      if(res.code == 200){
                        alert('评论成功')
                        window.location.reload()
                      }else{
                        alert(res.error)
                      }
                    }
                  })
                }
              }})
            })
          }
        }
      }else{
        alert(res.error);
      }
    }
  })

  $('#del').on('click',function(){
    window.wxc.xcConfirm("确认删除？",{onOk:function(){
      $.ajax({
        type: 'DELETE',
        url: BASE_URL+'/v1/lesson/'+author_uid+'?lid='+lid,
        beforeSend: function(request){
          request.setRequestHeader("Authorization", token);
        },
        success: function(res){
          if (res.code == 200){
            alert('删除成功');
            window.location.href = BASE_URL_WEB +'/'+ uid + '/hl';
          }else{
            alert(res.error)
          }
        }
      })
    }})
  })

  $('.options').on('hover',function(){
    console.log('sada');
    
  })
})