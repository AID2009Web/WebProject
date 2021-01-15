# 初始文件
V3.2021/01/10  
V2.2021/01/01  
V1.2020/12/12  

### GIT  

* 使用github 备份  
* .gitignore文件默认跳过缓存文件  
  * `WebProject_Client/WebProject_Client/__pycache__`  
  * `WebProject_Server/WebProject_Server/__pycache__`  
  * 以及各个APP下所生成的`__pycache__`  
  * 以及各个APP下migrations所生成的迁移文件。  

### 同步开发需要注意的点  
1. 数据库创建  
1.1 创建名为web的数据库（编码UTF8）  
`create database web default charset utf8;`  
1.2 WebProject_Server下的setting.py文件，确认DATABASES配置正确。  
1.3 WebProject_Server下进行数据迁移生成表。  
`python3 manage.py makemigrations`  
`python3 manage.py migrate`  
2. 本地调试服务开启【使用Django开启服务】
(访问路径：127.0.0.1:8000)  
2.1 WebProject_Server开启端口为5000的服务。  
`python3 manage.py runserver 0.0.0.0:5000`  
2.2 WebProject_Client开启端口为8000的服务。  
`python3 manage.py runserver 0.0.0.0:8000`  
2.3 Celery开启服务（如不使用异步处理SMS时不开启,如需开启需要Redis支持）  
`~`  
3. 本地多线程调试服务开启【使用nginx/uwsgi】
(访问路径：127.0.0.1)默认端口为80  
3.1 开启uwsgi:开启后进入守护进程  
`sudo uwsgi --init uwsgi.ini`  
3.2 开启nginx:  
`sudo /etc/init.d/nginx start`  

4. 局域网演示  
4.1 WebProject_Server下的setting.py文件，确认ALLOWED_HOSTS是否绑定开启服务的本机IP。  
4.2 WebProject_Client/static/js下的init.js文件确认地址开启正确。  
5. 服务器上线  
5.1 待完善  




### Django  
部分设置  
#### WebProject_Client 即网页前端  
* 设置 settings.py   
  * 修改显示语言与时区  
    `LANGUAGE_CODE = 'zh-Hans'`
    `TIME_ZONE = 'Asia/Shanghai'`

  * 修改模板路径  
    `'DIRS': [os.path.join(BASE_DIR,'templates')]`
  * 增加静态文件的路径  
    `STATICFILES_DIRS = [ os.path.join(BASE_DIR, 'static'),    ]`
  
* 路由及模板对应  

|路由|模板|备注|
|---|---|---|
|`/`|`index.html`|首页|
|`/login`|`login.html`|登录注册页|
|`/u/<uid>/info`||用户个人信息页|
|`/u/<uid>/hm`|`homepage_m.html`|用户个人动态页|
|`/u/<uid>/hl`|`homepage_l.html`|用户个人教程页|
|`/u/<uid>/hc`|`homepage_c.html`|用户收藏页|
|`/square`|`square.html`|广场页|
|`/shop`|`shop.html`|商城页|
|`/<uid>/topic`|`topic.html`|发布动态页|
|`/<int:uid>/lesson`|`lesson_add.html`|发布教程页|
|`/<int:uid>/lesson/<int:lid>`|`lesson.html`|教程详细页|
|`/item/<int:gid>`|`shopitem.html`|商品详情页|
|`/item/add`|`shopitem_add.html`||商品增加页|
|`/item/del`|`shopitem_del.html`|商品删除页|
|`/order/<int:oid>`|`order.html`|订单提交页|



* WebProject/urls.py  

    * 增加default路由  
    * 增加静态CSS/JS导入方法  

* templates 文件夹为放HTML文件  
* static/css 文件夹为放CSS样式
* static/css 文件夹为放js文件
* static/images 文件夹为图标/图片文件存放  

#### WebProject_Server 即网站后端  
* 设置 settings.py   
  * 修改显示语言与时区  
    `LANGUAGE_CODE = 'zh-Hans'`
    `TIME_ZONE = 'Asia/Shanghai'`
  * 取消格林尼治时间保存，取前端当前时区时间   
    `USE_TZ = False`  
  * 修改数据库
  `DATABASES = {
    	'default': {
    	'ENGINE': 'django.db.backends.mysql',
    	'NAME': 'web',
    	'USER': 'root',
    	'PASSWORD': '123456',
    	'HOST': '127.0.0.1',
    	'PORT': '3306',
    	}
   } `
  
### 前后分离后所需技术  
#### 
* 前端通过`HTTP`协议向后端发起请求  
* 由于普通发起请求跟接收响应是同步的，一旦卡住只能等待，效率较低。故引用`AJAX`异步处理，无需等待。【 Asynchronous Javascript And Xml 】  
* 由于传递的数据很多且不能传递对象，故前后端使用`JSON` 传递数据，将复杂响应数据构建为轻量级的数据交换格式。【 JavaScript Object Notation 】  
* 由于`AJAX`只能处理同源的信息，所以数据的`跨域传递`需要通过`JSONP`使用模式和`CORS`跨域资源共享。前端浏览器自主完成请求，后端服务器需要配置。【 JSON with Padding】【 Cross-Origin Resource Sharing 】  
* 由于跨域会被 Django 的`CSRF`保护拦截，使用`token`令牌解决。常用`JWT`。【Cross-Site Request Forgey】【 Json-Web-Token 】  
* 
### 并发访问所需技术  
#### 上线服务器  
nginx/uwsgi
* 使用Web服务器网关端口uwsgi启动服务器【Web Server Gateway Interface】  
启动：`sudo uwsgi --ini uwsgi.ini`  
停止：`sudo uwsgi --stop uwsgi.pid`  
强制结束：`ps -ef | grep 'uwsgi' | grep -v grep | awk '{print $2}' | xargs sudo kill -9`
* uwsgi配置文件`uwsgi.ini`(注：用socket) 

* 使用nginx反向代理服务器  
启动：`sudo /etc/init.d/nginx start`  
停止：`sudo /etc/init.d/nginx stop`  
* nginx配置文件`/etc/nginx/sites-enabled/default` 

* 静态文件配置  
uwsgi配置STATIC_ROOT
执行 `python3 manage.py collectstatic`  
nginex配置location /static

### 接口所需技术  
### 全局变量  
前端设置全局变量JS文件，方便切换  

#### SMS短信发送  
使用容联云通讯进行短信API接入。  

* 前端向后端发起请求。  
* 后端构建地址、请求包头、请求包体后封装并向容联云发送请求。  
* 后端接收容联云响应并反馈给前端。  
* 后端通过｀Redis｀缓存验证码，与前端POST回的验证码进行比对。  
* 由于同步发送验证方式在高并发场景可能会阻塞，所以导入使用`Celery`启动消费者-生产者模式进行高并发的异步处理。  

#### 已登录校验  
保持会话状态：  
cookie记录于浏览器，容易被截获。  
session记录于服务器，但在用户数量增多时，则增加服务器负载。  
使用token校验。对数据进行base64编码，组合成为JWT格式作为token。JWT包含header、payload、signature。会话信息保存在payload。  

#### 缓存与权限  
整页缓存`cache_page`不区分权限分类，会导致在用户缓存有效期内，游客访问用户内容。  
局部缓存，通过缓存API实现多份缓存。  
数据一致性，数据更新时删除缓存。  