# 评论模块API说明文档

## 数据库  
### MessageTopic 数据库结构 
|字段|属性|备注|
|---|---|---|
|id|primary key 主键；auto-increment 自增|本表唯一ID。|
|content|varchar[50]|留言内容|
|created_time|datetime|创建时间|
|parent_message|int[11] default=0|回复的父留言。默认为0|
|user|int[11]；foreign key 外键； CASCADE|评论人|
|topic|int[11]；foreign key 外键； CASCADE|评论地|

### MessageLesson 数据库结构 
|字段|属性|备注|
|---|---|---|
|id|primary key 主键；auto-increment 自增|本表唯一ID。|
|content|varchar[50]|留言内容|
|created_time|datetime|创建时间|
|parent_message|int[11] default=0|回复的父留言。默认为0|
|user|int[11]；foreign key 外键； CASCADE|评论人|
|lesson|int[11]；foreign key 外键； CASCADE|评论地|

## 接口说明  
### 1.发表动态评论  
URL: `http://127.0.0.1:5000/v1/message/t/<tid>`  
### 1.1 请求方式  
POST
### 1.2 请求格式  
json 具体参数如下：  
|字段|类型|备注|
|---|---|---|
|content|varchar|评论内容|
|parent_id|int|评论地|
请求示例：  
`{'content': 'xxx', 'parent_id':'12'} `
### 1.3 响应格式  
json 具体参数如下：  
|字段|类型|备注|
|---|---|---|
|code|int|状态码。默认正常为200，异常见1.4|
|error|varchar|错误提示|
响应示例：  
{'code': 200}  
### 1.4 异常码  
|异常码|含义|备注|
|---|---|---|
|10110|用户未登录||
|10500|请求错误||
|10501|评论不存在||
|10502|评论入库失败||
|500|服务器异常||
异常响应示例：  
{'code': 10500, 'error': '请求错误'} 

### 2.发表教程评论  
URL: `http://127.0.0.1:5000/v1/message/l/<lid>`  
### 2.1 请求方式  
POST
### 2.2 请求格式  
json 具体参数如下：  
|字段|类型|备注|
|---|---|---|
|content|varchar|评论内容|
|parent_id|int|评论地|
请求示例：  
`{'content': 'xxx', 'parent_id':'12'} `
### 2.3 响应格式  
json 具体参数如下：  
|字段|类型|备注|
|---|---|---|
|code|int|状态码。默认正常为200，异常见2.4|
|error|varchar|错误提示|
响应示例：  
{'code': 200}  
### 2.4 异常码  
|异常码|含义|备注|
|---|---|---|
|10110|用户未登录||
|10500|请求错误||
|10501|评论不存在||
|10502|评论入库失败||
|500|服务器异常||
异常响应示例：  
{'code': 10500, 'error': '请求错误'} 