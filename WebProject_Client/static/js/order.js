$(function () {
    // 初始化 地址三级联动选择
    $('#addr_select').distpicker({
        province: '请选择省份/自治区',
        city: '请选择城市/地区',
        district: '请选择区/县'
    });
    var item_html = "";
    var total_price = parseFloat(0);

    var url = document.location.toString();
    var arrUrl = url.split('//');

    var oid = arrUrl[1].split('/')[2];
    console.log(oid);

    var token = window.localStorage.getItem('web_token');
    var uid = window.localStorage.getItem('web_user');
    if (!(token)) {
        alert('请先登录');
        $('body').addClass('hide');
        window.location.href = '/login';
    }

    $.ajax({
        url: BASE_URL + '/v1/order?oid=' + oid,
        type: 'GET',
        beforeSend: function (request) {
            request.setRequestHeader('Authorization', token);
        },
        success: function (res) {
            if (res.code == 200) {
                console.log(res);
                // alert('导入商品列表');
                var items = res.data.item
                if (items.length == 0) {
                    alert('没有商品数据');
                } else {
                    
                    
                    for (var item of items) {
                        console.log(item);
                        var id = item.id;
                        var title = item.title;
                        var image = item.image;
                        var price = parseFloat(item.price);
                        var count = item.count;
                        item_html += '<dd class="item fixWindow">';
                        item_html += '<div class="item-row">';
                        item_html += '<div class="col col-1">';
                        item_html += '<div class="good-pic">';
                        item_html += '<img src="' + BASE_URL + '/media/' + image + '" alt="" width="40px" height="40px">';
                        item_html += '</div>';
                        item_html += '<div class="good-info"><a href="' + BASE_URL_WEB + '/item/' + id + '">' + title + '</a></div>';
                        item_html += '</div>';
                        item_html += '<div class="col col-2">' + price.toFixed(2) + '元</div>';
                        item_html += '<div class="col col-3">' + count + '</div>';
                        item_html += '<div class="col col-4">' + (price * count).toFixed(2) + '</div>';
                        item_html += '</div>';
                        item_html += '</dd>';
                        total_price += parseFloat(price * count);
                        ;
                        console.log(total_price);
                    }
                    $(".good-list dt").after(item_html);
                        total_price = total_price.toFixed(2);
                        
                        var total_price_html = `<div class="good-confirm-price">
                                <ul>
                                    <li>订单总额：<span>${total_price}元</span></li>
                                    <li>活动优惠：<span>0元</span></li>
                                    <li>优惠券抵扣：<span>0元</span></li>
                                    <li>运费：<span>0元</span></li>
                                </ul>
                                <p class="good-confirm-total">
                                    应付总额：
                                    <span>
                                        <strong id="totalPrice">${total_price}</strong>
                                        元
                                    </span>
                                </p>
                            </div>`;
                        $(".good-confirm-note").after(total_price_html);
                }

            } else {
                alert(res.error)
            }
        }
    })
    // $.fn.serializeObject = function () {
    //     var o = {};
    //     var a = this.serializeArray();
    //     $.each(a, function () {
    //         if (o[this.name]) {
    //             if (!o[this.name].push) {
    //                 o[this.name] = [o[this.name]];
    //             }
    //             o[this.name].push(this.value || '');
    //         } else {
    //             o[this.name] = this.value || '';
    //         }
    //     });
    //     return o;
    // };

    // var $checkoutForm = $('#checkout-form');
    // var formData = $checkoutForm.serializeObject();

    checkoutOrder = function () {
        console.log('click checkout order button')
        console.log(total_price)
        var order_id = "2019111821315602" + total_price.toString()
        post_data = { "order_id": order_id }
        $.ajax({
            url: BASE_URL+'/payment/jump/',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(post_data),
            contentType: 'application/json',
            success: function (res) {
                if (res.code == 200) {

                    window.location = res.pay_url
                    // alert('订单已生成');
                    //window.localStorage.setItem('dnblog_token',res.data.token);
                } else {
                    alert(res.error);
                }
            }
        });
    }

    $('.mbt-addr-body-list>dl').click(function () {
        $(this).addClass('selected').siblings('.select').removeClass('selected');
        $('#addrState').val(1);
    });
    var top;
    var left;
    var $edit_box = $('.mbt-addr-body-list .selected')
    $('.addr-edit').click(function () {
        top = $edit_box.offset().top
        left = $edit_box.offset().left
        $('.xm-edit-addr-box').css({
            "width": "300px",
            "top": top,
            "left": left,
            "display": "block"
        });
    });
    $('.addr-add').click(function () {
        top = $(this).offset().top
        left = $(this).offset().left
        $('.xm-edit-addr-box').css({
            "width": "300px",
            "top": top,
            "left": left,
            "display": "block"
        });
    })
    $('#J_editAddrCancel').click(function () {
        console.log('取消地址编辑');
        $('.xm-edit-addr-box').css({
            "display": "none"
        });
        $('#addr_select').distpicker('reset');
    });
});