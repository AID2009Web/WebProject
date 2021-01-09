# 教程模块API说明文档
### 数据库结构  
|字段|属性|备注|
|---|---|---|
|id|primary key 主键；auto-increment 自增|本表唯一ID。|
|title|varchar[50]||
|category|varchar[20]|教程分类。food(美食)，life(生活)|
|limit|varchar[10]|权限。public(公开)，private(私人)|
|introduce|varchar[90]|教程简介。默认内容前三十个字|
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
json 具体参数如下：  
|字段|类型|备注|
|---|---|---|
|title|varchar||
|category|varchar|教程分类。|
|limit|varchar|权限|
|introduce|varchar|内容TEXT格式|
|content|varchar|内容带HTML格式|
|image|varchar|封面图|
|video|text|教程视频外链|
请求示例：  
`{'title':'xxx', 'category':'food', 'limit':'public', 'content_text':'xxx','content': '<p>xxx</p>', 'video':'xxxx'} `
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
获取全部数据。
用户本人可获取公开与私人教程。
访客可获取公开教程，不能获取私人教程
### 2.3 响应格式  
json 具体参数如下：  
|字段|类型|备注|
|---|---|---|
|code|int|状态码。默认正常为200，异常见２.4|
|error|varchar|错误提示|
|data|{}|返回数据。|
|uid|varchar|用户ID数据库编码|
|lessons|[]|返回教程数据。id/title/category/limit/inductor/author/created_time|

响应示例：  
{'code': 200, 'data':{'reader': '123', 'lessons':[{'id':lesson_id, 'category': 'food', 'limit':'public', 'introduce':'sss', 'author':nickname, 'created_time':'2020-12-31 12:00:00'}]}}  
### 2.4 异常码  
|异常码|含义|备注|
|---|---|---|
|10400|请求错误||
|10404|访问用户不存在||
|500|服务器异常||
异常响应示例：  
{'code': 10404, 'error': '访问用户不存在'} 