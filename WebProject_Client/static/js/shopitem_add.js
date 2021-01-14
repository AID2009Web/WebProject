$(function(){
  var ed = '<script src="../static/js/wangEditor.js"></script>'
  $('head').append(ed)

  const E = window.wangEditor;
  const editor = new E('#editor');
  editor.customConfig.zIndex = 0;
  editor.create();

  sumbit = function (){
    var title = $('#title').val();
    
    var typeId = $("input[name='type']:checked").val();
    var introduce = $('#type0').val();
    var price = $('#price0').val();
    var type = [[typeId,introduce,price],]
    
    var category = $("input[name='category']:checked").val();
    var content = editor.txt.html();

    var formdata = new FormData();
    if($('#cover')[0].files[0]){
      formdata.append('cover',$('#cover')[0].files[0]);
    }
    formdata.append('title', title)
    formdata.append('category', category)
    formdata.append('content', content)
    formdata.append('type', type)
    console.log(formdata)
    
    $.ajax({
      type: 'POST',
      contentType: false,
      processData: false,
      dataType: 'json',
      url: BASE_URL + '/v1/item',
      data: formdata,
      
      success: function(res){
        if(res.code==200){
          alert('发布成功');
          console.log(res);
          
          
        }else{
          alert(res.code)
        }
      }
    })
  }
  
  $('#cover').change(function viewImage(){
    var file = $('#cover').prop('files')[0];
    console.log(file);
    
    if (file){
      console.log('1')
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(even){
        $('#cover_preview').attr('style', 'background-image: url('+even.currentTarget.result+');');
      }
    }
  });

  $("#price0").on('input  propertychange',function(){
		//确保输入的是数字
		this.value = this.value.replace(/[^\d\.]/g, '');
		//确保第一个输入的是数字
    this.value = this.value.replace(/^\./g,'');
    //确保不能输入两个小数点
    this.value = this.value.replace(/\.{2,}/g,'.');
    //保证小数点只出现一次，而不能出现两次以上     
    this.value = this.value.replace('.','$#$').replace(/\./g,'').replace('$#$','.');
    //确保只能输入两位小数
    this.value = this.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
  })
  
})
