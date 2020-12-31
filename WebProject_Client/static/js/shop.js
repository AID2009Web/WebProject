$(function(){
    // console.log(faderData);
    var BASE_URL = '../static/images/shop_imgs/';
    var html1 = '';
    $.each(faderData,function(i,o){
        html1 += `<li class="slide">
        <a href="#">
            <img src="${BASE_URL+o.img_url}" alt="">
        </a>
    </li>` ;
    })
    // console.log(html1);
    $('.fader_controls').before(html1);
    $('.fader').easyFader();

    function add_shops(data){
        var html2 = '';
        $.each(data,function(i,o){
            var shop = `<li class="items-item">
            <a href="../templates/shopitem.html">
                <div class="item-img">
                    <img src="${BASE_URL+o.image}" alt="">
                </div>
                <div class="price">
                    
                    <span class="price-after">${o.price}</span>
                </div>
                <div class='item-title'>
                    <p class='title-text'>${o.description}</p>
                </div>
            </a>
        </li>`;
        html2 += shop;
        })
        // console.log(html2);
        $('.shopsbox').append(html2);
    }
    
    add_shops(shopData.slice(0,8));
    var canLoad = true;//判读是否可以加载数据
    $(document).scroll(function(){  
        var scrollTop = $(document).scrollTop()
        var windowHeight = $(window).height()
        var documentHeight = $(document).height()
        if(documentHeight-scrollTop-windowHeight<=50){
            var size = $('.items-item').length;
            if(canLoad){
                var data = shopData.slice(size,size+4);
                if (data.length>0){
                    add_shops(data)
                }else{
                    // alert('没数据了')
                    canLoad = false//没有数据后就禁止加载
                }
            }
        }
    })

    function randomRun(){
        // 打乱数组顺序
        imgData.sort(function(){
            // 如果值为正数就换位置
            return Math.random()-0.5
        })
        for(var i = 0; i < imgs.length; i++) {
            imgs[i].src = BASE_URL+imgData[i];
        }
    }
    var imgs = document.getElementsByClassName('img1');
    var timerId = setInterval(randomRun,3000)

})

