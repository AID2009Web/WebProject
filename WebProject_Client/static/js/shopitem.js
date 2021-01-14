$(function(){
  $('#buy').click(function(){
    window.location.href=BASE_URL_WEB+'/order'
  })
  var list_price=[]
  var list_type=[]

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
        


        html_tmp='<p>'+res.data.introduce+'</p>'
        $(".introduce").html(html_tmp)



        html_tmp='<p >评论：'+res.data.comment_num+'</p>'
        html_tmp+='<p >交易量：'+res.data.comment_num+'</p>'
        $(".comment_num").html(html_tmp)

        list_price=[]
        list_type=[]
        //款式
        console.log('types',res.data.types)
        html_tmp=''
        for(var i=0;i<res.data.types.length;i++){
          //0款式，1价格，2配图
          html_tmp+='<li onclick="choice(this)" value='+i+'>'+res.data.types[i][0]+' </li>'
          //配图，搞清楚图的取法即可
          //
          //
          //
          //
          //存价格
          list_price.push(res.data.types[i][1])
          //存款式
          list_type.push(res.data.types[i][0])

        }
         $(".type").html(html_tmp)


        //款式价格,默认第一个样式
        //html_tmp='<p>￥'+res.data.price+'</p>'
        html_tmp1='<p value='+i+' >￥'+res.data.types[0][1]+'</p>'
        $(".price").html(html_tmp1)
        //console.log('price',res.data.price)

        //弄清楚订单表结构就ok
        //
        //
        //
        //
        html_tmp='<p>'+'订单数量???'+'</p>'
        $(".volume").html(html_tmp)


        //详情内容（默认详情，而不是评价

        html_tmp='数据库内容==='+res.data.content
        html_tmp+='撑场面=====Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam tenetur distinctio, iusto repudiandae, suscipit aut dolorem hic libero beatae esse impedit neque labore dolorum soluta nobis ex nam commodi. Facilis!'
        html_tmp+=  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum sint officia perspiciatis temporibus adipisci ratione, voluptate, ut accusamus culpa expedita quo tempore distinctio deserunt commodi, dicta quasi sit asperiores cupiditate?'
         html_tmp+=' Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur ipsam neque autem alias laudantium commodi, architecto aliquid modi possimus nulla repellat impedit quibusdam! Quae nulla eaque quibusdam ullam harum non?'
        html_tmp+='Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, vel eligendi temporibus hic illum vitae asperiores deserunt architecto molestiae. Odio minus beatae nulla dolores ipsam eaque? Dignissimos dolorum debitis unde.'
        html_tmp+= " <img src='../static/images/shop_imgs/list15.jpg' alt=''>"
         html_tmp+='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam tenetur distinctio, iusto repudiandae, suscipit aut dolorem hic libero beatae esse impedit neque labore dolorum soluta nobis ex nam commodi. Facilis!'
        html_tmp+=  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum sint officia perspiciatis temporibus adipisci ratione, voluptate, ut accusamus culpa expedita quo tempore distinctio deserunt commodi, dicta quasi sit asperiores cupiditate?'
        html_tmp+='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam tenetur distinctio, iusto repudiandae, suscipit aut dolorem hic libero beatae esse impedit neque labore dolorum soluta nobis ex nam commodi. Facilis!'
        html_tmp+=  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum sint officia perspiciatis temporibus adipisci ratione, voluptate, ut accusamus culpa expedita quo tempore distinctio deserunt commodi, dicta quasi sit asperiores cupiditate?'

        $(".cdetail").html(html_tmp)

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