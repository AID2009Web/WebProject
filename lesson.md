# 教程模块API说明文档
### 数据库结构  
|字段|属性|备注|
|---|---|---|
|id|primary key 主键；auto-increment 自增|本表唯一ID。|
|title|varchar[50]||
|category|varchar[20]|教程分类。food(美食)，life(生活)|
|limit|varchar[10]|权限。public(公开)，private(私人)|
|introduce|varchar[90]|教程简介。默认内容前一百一十个字|
|content|text|教程内容|
|image|varchar[100]|封面图|
|video|text|教程视频外链|
|created_time|datetime|创建时间|
|updatetime|datetime|修改时间|
|author|int[11]；foreign key 外键； CASCADE|作者|

## 接口说明  
### 1.发表教程  
URL: `http://127.0.0.1:5000/v1/lesson/<uid>`  
### 1.1 请求方式  
POST
### 1.2 请求格式  
fromdata 具体参数如下：  
|字段|类型|备注|
|---|---|---|
|title|varchar||
|category|varchar|教程分类。|
|limit|varchar|权限|
|introduce|varchar|内容TEXT格式|
|content|varchar|内容带HTML格式|
|image|varchar|封面图|
|video|text|教程视频外链|

### 1.3 响应格式  
json 具体参数如下：  
|字段|类型|备注|
|---|---|---|
|code|int|状态码。默认正常为200，异常见1.4|
|error|varchar|错误提示|
|uid|varchar|用户ID数据库编码|
响应示例：  
{'code': 200, 'uid': '123'}  
### 1.4 异常码  
|异常码|含义|备注|
|---|---|---|
|10110|用户未登录||
|10400|请求错误||
|10401|权限码错误||
|10402|分类码错误||
|10403|入库失败||
|500|服务器异常||
异常响应示例：  
{'code': 10401, 'error': '权限码错误'} 

### 2.获取教程列表接口  
URL: `http://127.0.0.1:5000/v1/lesson/<uid>`  
### 2.1 请求方式  
GET
### 2.2 请求格式  
获取除内容/视频外全部数据。
用户本人可获取公开与私人教程。
访客可获取公开教程，不能获取私人教程
### 2.3 响应格式  
json 具体参数如下：  
|字段|类型|备注|
|---|---|---|
|code|int|状态码。默认正常为200，异常见２.4|
|error|varchar|错误提示|
|data|{}|返回数据。|
|reader|varchar|用户ID数据库编码|
|lessons|[]|返回教程数据。id/title/image/category/limit/inductor/author/created_time|

响应示例：  
{'code': 200, 'data':{'reader': '123', 'lessons':[{'id':lesson_id, 'title':'xx', 'image':'xxx','category': 'food', 'limit':'public', 'introduce':'sss', 'author':nickname, 'created_time':'2020-12-31 12:00:00'}]}}  
### 2.4 异常码  
|异常码|含义|备注|
|---|---|---|
|10400|请求错误||
|10404|访问用户不存在||
|500|服务器异常||
异常响应示例：  
{'code': 10404, 'error': '访问用户不存在'} 

### 3.获取教程详情接口  
URL: `http://127.0.0.1:5000/v1/lesson/<uid>？lid=<lid>`  
### 3.1 请求方式  
GET
### 3.2 请求格式  
地址后添加查询字符串lid,值为具体教程文章ID
### 3.3 响应格式  
json 具体参数如下：  
|字段|类型|备注|
|---|---|---|
|code|int|状态码。默认正常为200，异常见3.4|
|error|varchar|错误提示|
|data|{}|返回教程数据。id/title/category/limit/inductor/content/author/created_time/message|

响应示例：  
{'code': 200, 'data':{'id':lesson_id, 'category': 'food', 'limit':'public', 'introduce':'sss', 'content': 'xxx', 'author':nickname, 'created_time':'2020-12-31 12:00:00','messages_count': 2, 'messages':{'content': 'vvv', 'created_time': "2021-01-10 23:18:15", 'id': 8, 'publisher': "用户3210", 'publisher_avatar': "avatar/boy.png", 'reply': [{'msg_id': 10, 'content': "11", 'publisher': "用户8901", 'publisher_avatar': "avatar/a_DKe6dJZ.jpg",created_time: "2021-01-10 23:19:30"}]}}}
### 3.4 异常码  
|异常码|含义|备注|
|---|---|---|
|10400|请求错误||
|10404|访问用户不存在||
|10405|访问教程不存在||
|500|服务器异常||
异常响应示例：  
{'code': 10404, 'error': '访问用户不存在'} 

### 4.删除教程详情接口  
URL: `http://127.0.0.1:5000/v1/lesson/<uid>？lid=<lid>`  
### 4.1 请求方式  
DELETE
### 4.2 请求格式  
地址后添加查询字符串lid,值为具体教程文章ID
### 4.3 响应格式  
json 具体参数如下：  
|字段|类型|备注|
|---|---|---|
|code|int|状态码。默认正常为200，异常见4.4|
|error|varchar|错误提示|


响应示例：  
{'code': 200 }
### 3.4 异常码  
|异常码|含义|备注|
|---|---|---|
|10400|请求错误||
|10404|访问用户不存在||
|10405|访问教程不存在||
|10406|没有权限删除||
|10407|数据库操作失败||
|500|服务器异常||
异常响应示例：  
{'code': 10404, 'error': '访问用户不存在'} 