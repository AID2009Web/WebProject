$(function(){
  var js = `<script src="../static/js/xcConfirm.js"></script>`
  $('head').append(js)
  var css = `<link rel="stylesheet" href="/static/css/comment.css">`
  $('title').after(css)

  $.ajax({
    url: BASE_URL + '/v1/item',
    type: 'GET',
    success: function(res){
      if(res.code==200){
          console.log(res);
          console.log('Y');
          var shops = '';
          for(var item of res.data.items){
            var shop = `
            <li class="items-item">
              <div class="del" gid="${item.gid}" onclick="del(this)">删除</div>
              <a href="${BASE_URL_WEB+'/item/'+item.gid}">
                <div class="item-img" style="background-image: url(${BASE_URL+'/media/' + item.image});">
                </div>
              </a>
              <div class="price">
                  
                  <span class="price-after">${item.price}</span>
              </div>
              <div class='item-title'>
                  <p class='title-text'>${item.title}</p>
              </div>
              
            </li>`;
            shops += shop;
          };
          $('.shopsbox ul').append(shops);
          
          
          
      }else{
          console.log('N');
      }
    }
  })
  
  del = function(res){
    var gid = $(res).attr("gid")
    console.log(gid);
    window.wxc.xcConfirm("确认删除？",{onOk:function(){
      $.ajax({
        type: 'DELETE',
        url: BASE_URL+'/v1/item/'+gid,
        
        success: function(res){
          if (res.code == 200){
            // alert('删除成功');
            window.location.reload();
          }else{
            alert(res.error)
          }
        }
      })
    }})
  }
  

})