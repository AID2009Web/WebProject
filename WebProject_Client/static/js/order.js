$(function () {
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