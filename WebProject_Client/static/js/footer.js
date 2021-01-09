$(function(){
  var css = '<link rel="stylesheet" href="/static/css/footer.css"></link>'
  $('title').after(css)

  var html = `<!---------footer------- -->
  <div>
    Design by
    <a href="#">AID2009-SZ</a>
    <a href="#">粤备号：XXXXXXXXXXXX-1</a>
  </div>`

  $('footer').append(html); 
})