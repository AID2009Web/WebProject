$(function () {
    // 初始化 地址三级联动选择
    $('#addr_select').distpicker({
        province: '请选择省份/自治区',
        city: '请选择城市/地区',
        district: '请选择区/县'
    });
    var a, b, c, d1, d, e;
    var item_html = "";
    var total_price = parseFloat(0);

    var url = document.location.toString();
    var arrUrl = url.split('//');

    var oid = arrUrl[1].split('/')[2];

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
                // alert('导入商品列表');
                var items = res.data.item
                if (items.length == 0) {
                    alert('没有商品数据');
                } else {
                    for (var item of items) {
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
    });
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

    $('body').delegate('#checkoutToPay', 'click', function () {
        if ($('#addrState').val() == 0) {
            alert('请选择下单地址')
        } else {
            // var item = [];
            // var item_id, item_count;
            // var username = 'tedu';
            // var order_num = random_No(3);
            // var addr_id = $('.address-id').val()
            // var order_content = $('.good-confirm-note input').val();
            // var shiptime = $('#shiptime-select .selected').children(':first').val();
            // $('.item-row').each(function () {
            //     item_id = $(this).find('a').attr('href');
            //     item_count = $(this).find('.col-3').html();
            //     item[item.length] = {
            //         "item_id": item_id.split('/')[(item_id.split('/')).length - 1],
            //         "item_count": item_count
            //     };
            // });
            // var post_data = {
            //     "username": username,
            //     "order_num": order_num,
            //     "addr_id": addr_id,
            //     "pay_id": "201",
            //     "shipment": "301",
            //     "shiptime": shiptime,
            //     "order_content": order_content,
            //     "item": item
            // };
            var order_id = "2019111821315602" + total_price.toString()
            post_data = {"order_id": order_id}
            $.ajax({
                url: BASE_URL + '/payment/jump/',
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(post_data),
                contentType: 'application/json',
                success: function (res) {
                    if (res.code == 200) {
                        window.location = res.pay_url
                        //alert('订单已生成');
                        //window.localStorage.setItem('dnblog_token',res.data.token);
                    } else {
                        alert(res.error);
                    }
                }
            });
        }
    });

    $('body').delegate('.mbt-addr-body-list>dl', 'click', function () {
        $(this).addClass('selected').siblings('.selected').removeClass('selected');
        $('#addrState').val(1);
        a = $(this).find('.addr-name').text();
        b = $(this).find('.addr-tag').text();
        c = $(this).find('.addr-tel').text();
        d1 = $(this).find('.addr-province').text();
        d = $(this).find('.addr-region').text();
        e = $(this).find('.addr-street').text();
        set_editbox(a, b, c, d1, d, e);
    });

    var top;
    var left;
    $('body').delegate('.addr-edit', 'click', function () {
        top = $(this).parent().offset().top - 57;
        left = $(this).parent().offset().left - 19;
        $('.xm-edit-addr-box').css({
            "width": "300px",
            "top": top,
            "left": left,
            "display": "block"
        });
        set_editbox(a, b, c, d1, d, e);
        bgdrop();
    });
    $('.addr-add').click(function () {
        $('.mbt-addr-body-list').find('.selected').removeClass('selected')
        top = $(this).offset().top
        left = $(this).offset().left
        $('.xm-edit-addr-box').css({
            "width": "300px",
            "top": top,
            "left": left,
            "display": "block"
        });
        clear_editbox();
        bgdrop();
    });

    $('#J_editAddrCancel').click(function () {
        $('.xm-edit-addr-box').css({
            "display": "none"
        });
        $("#J_editAddrBackdrop").hide()
        clear_editbox();
        $('#addr_select').distpicker('reset');
    });

    // 提交地址
    $('#J_editAddrOk').click(function () {
        var $value = $(this).parent().parent()
        if ($value.find('#Consignee').val() === '') {
            alert('请填收货人姓名')
            return 'error'
        }
        if (!isPhoneNo($value.find('#Telephone').val())) {
            alert('手机号格式不正确')
            return 'error'
        }
        if ($value.find('#Provinces').val() === '' ||
            $value.find('#Citys').val() === '' ||
            $value.find('#Countys').val() === '') {
            alert('地址选择不正确')
            return 'error'
        }
        if ($value.find('#Street').val() === '') {
            alert('请填写地址')
            return 'error'
        }
        if ($value.find('#Zipcode').val() === '') {

        } else if ($value.find('#Zipcode').val().length < 6) {
            alert('请填6位邮政编码，或者留空')
            return 'error'
        }

        var addr_id = $('.mbt-addr-body-list').find('.selected').find('.address-id').val() || '';
        var consignee = $value.find('#Consignee').val();
        var tag = $value.find('#Tag').val();
        var tel = $value.find('#Telephone').val();
        var province = $value.find('#Provinces').val();
        var city = $value.find('#Citys').val();
        var county = $value.find('#Countys').val();
        var street = $value.find('#Street').val();
        var zipcode = $value.find('#Zipcode').val() || '000000';
        var post_data = {
            "uid": uid, "id": addr_id, "consignee": consignee, "tag": tag,
            "tel": tel, "province": province, "city": city, "county": county,
            "street": street, "zipcode": zipcode
        }
        $.ajax({
            url: BASE_URL+'/v1/order/' + uid + '/address',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(post_data),
            contentType: 'application/json',
            success: function (res) {
                if (res.code == 200) {
                    if ($('.mbt-addr-body-list').find('.selected').length) {
                        reset_addr(
                            res.data.consignee,
                            res.data.tag,
                            res.data.tel,
                            res.data.province,
                            res.data.city + " / " + res.data.county,
                            res.data.street + "(" + res.data.zipcode + ")"
                        );
                        $('.xm-edit-addr-box').hide();
                        $("#J_editAddrBackdrop").hide();
                        alert("地址更新成功");
                    } else {
                        var addr_html = new_addr(
                            res.data.id,
                            res.data.consignee,
                            res.data.tag,
                            res.data.tel,
                            res.data.province,
                            res.data.city,
                            res.data.county,
                            res.data.street,
                            res.data.zipcode
                        )
                    }
                    $('.xm-edit-addr-box').hide();
                    $("#J_editAddrBackdrop").hide();
                    $('.mbt-addr-body-list').children(":first").before(addr_html);
                } else {
                    alert(res.error);
                }
            }
        });
    });

    function bgdrop() {
        var e = $(document).width(), f = $(document).height();
        $("#J_editAddrBackdrop").css({
            width: e,
            height: f
        }).show();
    }

    function set_editbox(a, b, c, d1, d, e) {
        var $set = $('#J_editAddrBox');
        $set.find('#Consignee').val(a);
        $set.find('#Tag').val(b);
        $set.find('#Telephone').val(c);
        $('#addr_select').distpicker('destroy').distpicker({
            province: d1,
            city: d.split(' / ')[0],
            district: d.split(' / ')[1]
        });
        $set.find('#Street').val(e.split(/[(]|[)]/)[0]);
        $set.find('#Zipcode').val(e.split(/[(]|[)]/)[1]);
    }

    function clear_editbox() {
        var $clear = $('#J_editAddrBox');
        $clear.find('#Consignee').val('');
        $clear.find('#Tag').val('');
        $clear.find('#Telephone').val('');
        $('#addr_select').distpicker('destroy').distpicker({
            province: '请选择省份/自治区',
            city: '请选择城市/地区',
            district: '请选择区/县'
        });
        $clear.find('#Street').val('');
        $clear.find('#Zipcode').val('');
    }
    // 随机生成订单号，传入参数3可生成16位订单号
    function random_No(randomLen) {
        var random_no = "";
        for (var i = 0; i < randomLen; i++) {
            random_no += Math.floor(Math.random() * 10);
        }
        random_no = new Date().getTime() + random_no;
        return random_no;
    }

    function isPhoneNo(phone) {
        var pattern = /^1[34578]\d{9}$/;
        return pattern.test(phone);
    }

    function reset_addr(a, b, c, d1, d, e) {
        var $reset = $('.mbt-addr-body-list').find('.selected');
        $reset.find('.addr-name').text(a)
        $reset.find('.addr-tag').html(b);
        $reset.find('.addr-tel').text(c);
        $reset.find('.addr-province').text(d1);
        $reset.find('.addr-region').text(d);
        $reset.find('.addr-street').text(e);
    }

    function new_addr(a, b, c, d, e, f, g, h, i) {
        var addr_html = "";
        addr_html += '<dl class="addr-item">';
        addr_html += '<dt>';
        addr_html += '<strong class="addr-name">' + b + '</strong>';
        addr_html += '<span class="addr-tag">' + c + '</span>';
        addr_html += '</dt>';
        addr_html += '<dd>';
        addr_html += '<p class="addr-tel">' + d + '</p>';
        addr_html += '<p class="addr-province">' + e + '</p>';
        addr_html += '<p class="addr-region">' + f + ' / ' + g + '</p>';
        addr_html += '<p class="addr-street">' + h + '(' + i + ')' + '</p>';
        addr_html += '<span class="addr-edit">编辑</span>';
        addr_html += '</dd>';
        addr_html += '<dd style="display: none">';
        addr_html += '<input type="radio" name="checkout[address]" class="address-id" value="' + a + '">';
        addr_html += '</dd>';
        addr_html += '</dl>';
        return addr_html;
    }

    $('.item-shiptime').click(function () {
        $(this).addClass('selected').siblings('.selected').removeClass('selected');
    })

    $.ajax({
        url: BASE_URL+'/v1/order/' + uid + '/address',
        type: 'get',
        dataType: 'json',
        beforeSend: function (request) {

        },
        success: function (res) {
            if (res.code == 200) {
                var addr = res.data.addr
                if (addr.length == 0) {
                    // alert('请先添加地址')
                } else {
                    var addr_html = '';
                    for (var d in addr) {
                        addr_html += new_addr(
                            addr[d].id, addr[d].consignee, addr[d].tag,
                            addr[d].tel, addr[d].province, addr[d].city,
                            addr[d].county, addr[d].street, addr[d].zipcode
                        )
                    }
                }
            } else {
                alert(res.error);
            }
            $('.mbt-addr-body-list').children().before(addr_html);
        }
    });
});