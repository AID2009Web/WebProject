$(function(){

 
  var url = document.location.toString();
  var arrUrl = url.split('//');
  var gid = arrUrl[1].split('/')[2];
  //item_id=window.Location
  
  console.log(gid)
  $.ajax({
    'url': BASE_URL+'/v1/item?gid='+gid,
    'type':'get',
    //beforeSend:
    success:function(res){
      if (res.code==200){
        console.log(res);
        $('.img').attr('style','background-image: url('+BASE_URL+'/media/'+res.item.image+')')
        $('.cdetail').html(res.item.content)
        $('.introduce').html(res.item.title)

        
        // html_tmp='<p >评论：'+res.data.comment_num+'</p>'
        // html_tmp+='<p >交易量：'+res.data.comment_num+'</p>'
        // $(".comment_num").html(html_tmp)
        $('.price>p').html(res.item.type[0].price);
        // for(var itemType of res.item.type){
        //   var type_list = `<li tid="${itemType.type_id}" price="${itemType.price}">${itemType.introduce}</li>`;
        //   $('.type').append(type_list);
        // }








        // html_tmp='<p>'+'订单数量???'+'</p>'
        // $(".volume").html(html_tmp)



        //评论内容(div自带display：none
                //html_tmp='评论～～～～～～～暂时没有数据～～～～～～～～～～～～～～内容'
                //html_tmp+=  '撑场面=====Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum sint officia perspiciatis temporibus adipisci ratione, voluptate, ut accusamus culpa expedita quo tempore distinctio deserunt commodi, dicta quasi sit asperiores cupiditate?'
                //html_tmp+= " <img src='../static/images/shop_imgs/list15.jpg' alt=''>"


        html_body = '</div>';
        html_body += '<div class="news_pl">';
        //html_body += '<h2>文章评论</h2>';
        html_body += '<div class="gbko">';
        html_body += '<div class="l_box f_l" style="padding:20px;">';
        html_body += '<div class="commentstitle">';
        html_body += '<h3 id="comments">到现在<span class="commentsnumber">有' + res.data.messages_count + '条评论</span></h3>';
        html_body += '</div>';


        var messages_list = res.data.messages
        for(var message in messages_list){
            //评论内容
          html_body += '<ol class="commentlist">';
            html_body += '<li>';
            html_body += '<div class="top">'+'username不知道啊';
            //html_body += '<div class="top"><a href="#"  class="url">' + messages_list[message].publisher  + '</a>';

            html_body += '<span class="time"> @';
            html_body += '<a href="#" title="">' + messages_list[message].created_time  + '</a>';
            html_body += '<a href="#" class="replyComment" mid=' + messages_list[message].id + '>回复</a>';
            html_body += '</span>';
            html_body += '</div>';

            html_body += '<div class="body">';
            html_body += messages_list[message].content;
            html_body += '</div>';

            html_body += '</li>';

            var reply_list = messages_list[message].reply

            console.log('reply_list is ')
            console.log(reply_list)

            //回复内容
            for(var rm in reply_list){
                //console.log(reply_list[rm])
                html_body += '<li>';
                html_body += '<div class="reply">';
                html_body += '<div class="top">'+'username不知道啊2';
                //html_body += '<a href="#" class="url">' + reply_list[rm].publisher + '</a>';
                html_body += '<span class="time">';
                html_body += '@ <a href="#" title="">' + reply_list[rm].created_time + '</a>';

                //楼中楼回复,id应该是puyblisher??
                //html缩进，数据库id结构指向有点问题
                //html_body += '<a href="#" class="replyComment" mid=' + messages_list[message].id + '>回复</a>';


                html_body += '</span>';
                html_body += '</div>';
                html_body += '<div class="body">' + reply_list[rm].content  + '</div>';
                html_body += '</div>';
                html_body += '</li>';
            }
            html_body += '</ol>';
        }


        //弹窗回复
        html_body += '<div id="commentform">';
        html_body += '<h3 id="respond">在这添加你的留言！</h3>';
        html_body += '<dir id="editor"></dir>';
        //html_body += '<br>';
        html_body += '<p>';
        html_body += '<input id="id_article" name="article" type="hidden" value="1">';
        html_body += '<input name="button" type="button" id="button"  tabindex="5" value="提交" class="button" />';
        html_body += '</p>';
        html_body += '</div>';


        $(".ccomment").html(html_body)
        //富文本
        var E = window.wangEditor;
        editor = new E('#editor');
        editor.create();



        //$(".ccomment").html(html_tmp)






      }
      else{
        alert(res.error)
      }
    }
  })
  
  var type = document.getElementsByClassName('typ');
  for(var i of type){
    i.onclick = function(){
      for(var j of type){
        j.className = 'typ';
      }
      this.className = 'typ selected';
      var tid = $(this).attr('tid');
      var price = $(this).attr('price');
      $('.price>p').html(price);
    }
  }



  $('#buy').click(function(){
    var price = $('.price>p').text();
    var style = $('.selected').attr('tid');
    if(style==undefined){
      style = '0';
    }
    var orderNum = $('#orderNum').val();
    var post_data = {
      'gid': gid,
      'type': style,
      'price': price,
      'orderNum': orderNum,
    };
    console.log(post_data);
    $.ajax({
      url: BASE_URL + '/v1/order',
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(post_data),
      beforeSend: function(request){
        request.setRequestHeader('Authorization', token);
      },
      success: function(res){
        if(res.code == 200){
          alert('success');
          console.log(res);
        }else{
          alert('res.error')
        }
      }
    })
  })

  //选择样式
  //存放所选样式
  var select_type=''
  function choice(obj){

    //alert(obj.value)
    //款式价格
        html_tmp='<p>￥'+list_price[obj.value]+'</p>'
        $(".price").html(html_tmp)
    //存样式
    select_type=list_type[obj.value]
  }


  //选择cnav（详情或评价
  function select_cnav(obj){
      //alert(obj.class)
      //console.log(obj)
      //console.log(obj['className'])
      //console.log(obj['id'])
      //console.log($("#detail")[0]['className'])
      //console.log($("#detail").attr['id'])

      //console.log($(".ccomment"))
      //console.log($(".cdetail").attr['style'])

      obj['className']='cnav active'

      if (obj['id']=='comment'){
          $("#detail")[0]['className']='cnav'
          $(".ccomment")[0]['style']='display:block'
          $(".cdetail")[0]['style']='display:none'
      }
      else{
          $("#comment")[0]['className']='cnav'
          $(".ccomment")[0]['style']='display:none'
          $(".cdetail")[0]['style']='display:block'
      }
 }


$(function () {
    token = window.localStorage.getItem('user_token');
    //发送评论
    $('#button').on('click', function(){

        var content = editor.txt.html();
        var post_data = {'content': content}
        console.log(content)
        console.log(editor.txt.text())
        $.ajax({
            // 请求方式
            type:"post",
            // contentType
            contentType:"application/json",
            // dataType
            dataType:"json",
            // url
            url:"http://127.0.0.1:5000/v1/messages/" + item_id ,
            // 把JS的对象或数组序列化一个json 字符串
            data:JSON.stringify(post_data),
            // result 为请求的返回结果对象
            beforeSend: function(request) {
              request.setRequestHeader("Authorization", token);
            },
            success:function (result) {
                if (200 == result.code){
                    alert("发布成功")
                    window.location.reload()
                }else{
                    alert(result.error)
                    //window.location.href = '/login'
                }
             }
        })

    })


    //回复
    var list = document.getElementsByClassName('replyComment');
    for (var i of list) {
        i.addEventListener("click", function (ev) {
        ev.preventDefault();
        //console.log('123123123')
        var m_id = this.getAttribute('mid')
        var txt=  "请输入回复：";
        window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.input,{
            onOk:function(reply){
                //console.log(reply);
                //console.log('------------reply-----')
                var post_data = {'content': reply, 'parent_id': m_id};
                var reply_url =  "http://127.0.0.1:5000/v1/messages/" + item_id
                $.ajax({
                // 请求方式
                type:"post",
                // contentType
                contentType:"application/json",
                // dataType
                dataType:"json",
                // url
                url: reply_url,
                // 把JS的对象或数组序列化一个json 字符串
                data:JSON.stringify(post_data),
                // result 为请求的返回结果对象
                beforeSend: function(request) {
                  request.setRequestHeader("Authorization", token);
                },
                success:function (result) {
                    if (200 == result.code){
                        alert("发布成功")
                        window.location.reload()

                    }else{
                        alert(result.error)
                        //window.location.href = '/login'
                        }
                    }
                })
            }
        });
      }, false);
    }


})










})