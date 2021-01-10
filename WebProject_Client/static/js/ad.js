//外部js文件
$(function(){
	var css = '<link rel="stylesheet" href="/static/css/rightIcon.css"></link>'
  $('title').after(css)


	var rightIcon = '<!-- 右侧浮动按钮 -->\
	<div class="rightIcon">\
		<!-- 回到顶部按钮 -->\
		<div class="goTopButton">\
			<a href="#top" id="goTopButton">\
				<img src="/static/images/icon/toTop.png" alt="">\
			</a>\
		</div>\
		<!-- 购物车 -->\
		<div class="bCarButton">\
			<a href="#car" id="bCarButton">\
				<img src="/static/images/icon/bCar.png" alt="">\
			</a>\
		</div>\
	</div>'

	$('main').append(rightIcon);
	// console.log($('.video').hasClass('hide'));
	var goods = document.getElementById('goods')
	var top = document.getElementById('goTopButton');
	if (0){
		goods.style.display = 'block';
		top.style.display = 'block';
	}else{
		window.onscroll = function()
		{
			var h =document.body.scrollTop;
			if(!h)
				h=document.documentElement.scrollTop;
			// console.log(h);
			if(h>200)
			{
				goods.style.display = 'block';
				top.style.display = 'block';
			}
			else
			{
				goods.style.display = 'none';
				top.style.display = 'none';
			}
		};
	}
	
})
