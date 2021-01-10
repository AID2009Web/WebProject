$(function(){
  var js = `<script src="/static/js/xcConfirm.js"></script>
  <script src="/static/js/wangEditor.js"></script>`
  $('head').append(js)
  var css = `<link rel="stylesheet" href="/static/css/comment.css">`
  $('title').after(css)

  var url = document.location.toString();
  var arrUrl = url.split('//');
  var author_uid = arrUrl[1].split('/')[1];
  var lid = arrUrl[1].split('/')[3];
  var avatar_url = '';

  var token = window.localStorage.getItem('web_token');
  var uid = window.localStorage.getItem('web_user');

  console.log('被访问用户：'+author_uid)
  console.log('被访问的教程：'+ lid);
  console.log('登录用户：'+uid);

  if(uid == author_uid){
    $('.follow').attr('class','hide');
  }

  // 获取被访问用户个人信息
  $.ajax({
    url: BASE_URL + '/v1/u/' + author_uid,
    type: 'GET',
    beforeSend: function(request){
      request.setRequestHeader("Authorization", token);
    },
    success: function(res){
      if (res.code == 200){
        console.log('被访问用户：'+ res.uid);
        console.log(res);
        avatar_url = BASE_URL + '/media/' + res.data.avatar;
        $('.user_img img').attr('src', avatar_url);
        $('.userinfo').html(res.data.nickname);
        $('title').html(res.data.nickname+'教程');
      }else{
        alert(res.error);
      }
    }
  })
  // 获取被访问用户教程
  $.ajax({
    url: BASE_URL + '/v1/lesson/' + author_uid + '?lid=' + lid,
    type: 'GET',
    beforeSend: function(request){
      request.setRequestHeader("Authorization", token);
    },
    success: function(res){
      if(res.code == 200){
        console.log(res);
        if(!(res.data.vide)){
          $('.video').addClass('hide');
        }
        $('.title').html(res.data.title);
        $('.content_info .date').html('发表日期：'+res.data.created_time)
        $('.content').html(res.data.content);
        $('.comment span').text(res.data.messages_count)
        for(var message of res.data.messages){
          var avatar_url = BASE_URL+'/media/'+ message.publisher_avatar;
          var comment = `
          <li>
            <div class="top">
                <a href="Javascript:void(0)">`+message.publisher+`<div class="head" style="background-image: url(`+avatar_url+`);"></div></a>
                <span class="time">`+message.created_time+`</span>
                <a href="Javascript:void(0)" class="replyComment" cid="`+message.id+`">回复</a>
            </div>
            <div class="body">`+message.content+`</div>
          </li>`
          for(var reply of message.reply){
            var avatar_url = BASE_URL+'/media/'+ reply.publisher_avatar;
            comment += `
            <li>
              <div class="subcomment">
                <div class="top">
                    <a href="Javascript:void(0)">`+reply.publisher+`<div class="head" style="background-image: url(`+avatar_url+`);"></div></a>
                    <span class="time">`+reply.created_time+`</span>
                    <a href="Javascript:void(0)" class="replyComment" cid="`+reply.msg_id+`">回复</a>
                </div>
                <div class="body">`+reply.content+`</div>
              </div>  
            </li>`
          }
          $('.commentlist ul').append(comment)
        }

        var list = document.getElementsByClassName('replyComment');
        console.log(list);
        for(var i of list){
          i.addEventListener('click', function(even){
            even.preventDefault();
            var cid = this.getAttribute('cid');
            window.wxc.xcConfirm("请输入回复：","input",{onOk:function(reply){
              // console.log(reply);
              if(reply != ''){
                var post_data = {'content': reply, 'parent_id': cid}
                var reply_url = BASE_URL + '/v1/message/l/'+ lid;
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

      }else{
        alert(res.error)
      }
    }
  })

  const E = window.wangEditor;
  const editor = new E('#editor');
  editor.customConfig.menus = ['emoticon'];
  editor.customConfig.zIndex = 0;
  editor.create();


  sumbit = function (){
    var content_text = editor.txt.text();
    var post_data = {'content': content_text} 
    
    if(content_text != ''){
      $.ajax({
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        url: BASE_URL + '/v1/message/l/'+ lid,
        data: JSON.stringify(post_data),
        beforeSend: function(request){
          request.setRequestHeader('Authorization', token);
        },
        success: function(res){
          if(res.code==200){
            alert('评论成功');
            window.location.reload();
          }else{
            alert(res.error)
          }
        }
      })
    }
    
  }





})