$(function(){


    var food = function (){
        pics = [
        {pic:'../static/images/food_1.jpg',title:'美食图片一'},
        {pic:'../static/images/food_2.jpg',title:'美食图片二'},
        {pic:'../static/images/food_3.jpg',title:'美食图片三'},
        {pic:'../static/images/food_4.jpg',title:'美食图片四'},
        {pic:'../static/images/food_5.jpg',title:'美食图片五'},
        {pic:'../static/images/food_6.jpg',title:'美食图片六'},
        {pic:'../static/images/food_7.jpg',title:'美食图片七'},
        {pic:'../static/images/food_8.jpg',title:'美食图片八'},
        {pic:'../static/images/food_9.jpg',title:'美食图片九'},
        {pic:'../static/images/food_10.jpg',title:'美食图片十'},
      ]
      var ww = window.screen.width
      // var img = document.getElementsByClassName('pic')
      temp = []
      document.getElementById
        

      $('.pic').each(function(i,o){
        while(true){
            var num = Math.floor(Math.random()*pics.length);
            if (temp.indexOf(num)==-1){
              // console.log(temp);
              temp.push(num);
              break;
            }
          }  
      o.src= pics[num].pic;
      o.width = ww * 0.20;
      var div_t = '<div class="pic_title">'+ pics[num].title +'</div>'
      $(this).after(div_t)
      })
    };

    food();
    
    $('.food_list img').onmouseover=function(){
      console.log('hj');
    }
    $('.food_list img').each(function(i,o){
      o.onmouseover=function(){
        $(this).siblings('.pic_title').css('opacity','1');
      }
      o.onmouseout = function(){
        $(this).siblings('.pic_title').css('opacity','0');
      }
    })
  })  