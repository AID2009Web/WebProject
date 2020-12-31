$(function(){
  var faderData = [
    "1.png","2.jpg",
    "3.jpg","4.png",
    "5.jpg","6.png",
    "7.jpg","8.jpg",
    ]

  var BASE_URL = '../static/images/banner/';
  var html = '';
  $.each(faderData,function(i,o){
      html += `<li class="slide">
          <img src="${BASE_URL+o}" alt="">
       </li>` ;
  })
  $('.fader').append(html);
  $('.fader').easyFader();


  var userData = [
    {
      'username': '一位不知名用户',
      'msg':'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa libero explicabo dolores quidem reprehenderit nulla eos tempora qui quaerat rerum deleniti doloribus harum aliquid, esse cupiditate in beatae saepe veniam?',
      'msg_pic': '../static/images/pic/18.jpeg',
    },
    {
      'username': '特邀用户',
      'msg':'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa libero explicabo dolores quidem reprehenderit nulla eos tempora qui quaerat rerum deleniti doloribus harum aliquid, esse cupiditate in beatae saepe veniam?',
      'msg_pic': '../static/images/pic/79.jpeg',
    },
    {
      'username': '匿名用户',
      'msg':'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa libero explicabo dolores quidem reprehenderit nulla eos tempora qui quaerat rerum deleniti doloribus harum aliquid, esse cupiditate in beatae saepe veniam?',
      'msg_pic': '../static/images/pic/80.jpeg',
    },
    {
      'username': '知名用户',
      'msg':'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa libero explicabo dolores quidem reprehenderit nulla eos tempora qui quaerat rerum deleniti doloribus harum aliquid, esse cupiditate in beatae saepe veniam?',
      'msg_pic': '../static/images/pic/86.jpeg',
    },
    {
      'username': 'VIP用户',
      'msg':'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa libero explicabo dolores quidem reprehenderit nulla eos tempora qui quaerat rerum deleniti doloribus harum aliquid, esse cupiditate in beatae saepe veniam?',
      'msg_pic': '../static/images/pic/85.jpeg',
    },
    {
      'username': '充钱用户',
      'msg':'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa libero explicabo dolores quidem reprehenderit nulla eos tempora qui quaerat rerum deleniti doloribus harum aliquid, esse cupiditate in beatae saepe veniam?',
      'msg_pic': '../static/images/pic/50.jpeg',
    },

  ]


  var view = '\
        <div class="view">\
           <ul>\
               <li>\
                   <a href="">\
                       <img src="../static/images/icon/comment.png" alt="">\
                   </a>\
               </li>\
               <li>\
                   <a href="" >\
                       <img src="../static/images/icon/like.png" alt="">\
                   </a>\
               </li>\
               <li>\
                   <a href="" >\
                       <img src="../static/images/icon/share.png" alt="">\
                   </a>\
               </li>\
           </ul>\
       </div>\
  '



  function getMsg(num){
    var count =0;
    var str = $.each(userData,function(i,o){})
    return '\
    <div class="msg">\
      <div class="msg_pic">\
        <img src="'+str[num].msg_pic+'" alt="" class="msg_img">\
      </div>\
      <div class="user">\
        <a href="../templates/homepage_m.html">\
          <div class="head"></div>\
        </a>\
        <div class="info">'+str[num].username+'</div>\
        <span class="content">'+str[num].msg+'</span>\
        '+view+'\
      </div>\
    </div>'
        
  }

  function getList(msg){
    return '<li>'+msg+'</li>'
  }

  function getUlist(ml){
    return '<ul>'+ml+'</ul>'
  }



  var mlist = ''
  for(var j=0;j<3;j++){
    messages = ''
  for(var i=0;i<2;i++){
      var num = Math.floor(Math.random()*(userData.length))
      messages += getMsg(num)
      // console.log(messages);
  }
  mlist += getList(messages)
  }
 
  var re = getUlist(mlist)

  $('.message').append(re)
  


  var food = function (){
    pics = [
    {pic:'../static/images/pic/18.jpeg',title:'美味雪糕'},
    {pic:'../static/images/pic/50.jpeg',title:'牛排没事'},
    {pic:'../static/images/pic/80.jpeg',title:'一块蛋糕'},
    {pic:'../static/images/pic/6.jpeg',title:'应该好吃'},
    {pic:'../static/images/pic/15.jpeg',title:'两碗红豆粥'},
    {pic:'../static/images/pic/86.jpeg',title:'脏脏包'},
    {pic:'../static/images/pic/92.jpeg',title:'这是拌饭吧'},
    {pic:'../static/images/pic/85.jpeg',title:'一碗面'},
    {pic:'../static/images/pic/79.jpeg',title:'盖浇饭'},
    {pic:'../static/images/pic/75.jpeg',title:'不知是啥'},
  ]
  // var ww = window.screen.width
  // var img = document.getElementsByClassName('pic')
  temp = []
  
  $('.lesson').each(function(i,o){
    while(true){
        var num = Math.floor(Math.random()*pics.length);
        if (temp.indexOf(num)==-1){
          // console.log(temp);
          temp.push(num);
          break;
        }
      }  
    var pic = '<a href="../templates/lesson.html">\
      <img src="'+pics[num].pic+'" alt="">\
    <div class="ptitle">'+ pics[num].title +'</div>\
    </a>'
    o.src= pics[num].pic;
    $(this).append(pic);
    // o.width = ww * 0.20;
    
    })
    };
  
  food();
  $('.lesson img').onmouseover=function(){
    console.log('hj');
  }
  $('.lesson img').each(function(i,o){
    o.onmouseover=function(){
      $(this).siblings('.ptitle').css('opacity','1');
    }
    o.onmouseout = function(){
      $(this).siblings('.ptitle').css('opacity','0');
    }
  })

})