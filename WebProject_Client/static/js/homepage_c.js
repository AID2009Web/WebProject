$(function(){
  
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
  var ww = window.screen.width
  // var img = document.getElementsByClassName('pic')
  temp = []
  
  $('.blogpic').each(function(i,o){
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
    o.width = ww * 0.20;
    
    })
    };
  
  food();
  $('.blogpic img').onmouseover=function(){
    console.log('hj');
  }
  $('.blogpic img').each(function(i,o){
    o.onmouseover=function(){
      $(this).siblings('.ptitle').css('opacity','1');
    }
    o.onmouseout = function(){
      $(this).siblings('.ptitle').css('opacity','0');
    }
  })
  
})
