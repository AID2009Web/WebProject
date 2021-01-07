//外部js文件
$(function(){
	var css = '<link rel="stylesheet" href="../static/css/rightIcon.css"></link>'
	$('title').after(css)


	var rightIcon = `<!-- 右侧浮动按钮 -->
	<div class="rightIcon">
		<!-- 回到顶部按钮 -->
		<div class="goTopButton">
			<a href="#top" id="goTopButton">
				<img src="../static/images/icon/toTop.png" alt="">
			</a>
		</div>
		<!-- 购物车 -->
		<div class="bCarButton">
			<a href="#car" id="bCarButton">
				<img src="../static/images/icon/bCar.png" alt="">
			</a>
		</div>
	</div>`

	$('footer').before(rightIcon);

	window.onscroll = function()
	{
		var h =document.body.scrollTop;
		if(!h)
			h=document.documentElement.scrollTop;
		var top = document.getElementById('goTopButton');
		if(h>0)
		{
			top.style.display = 'block';
		}
		else
		{
			top.style.display = 'none';
		}
	};

})






