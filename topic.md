# 动态模块API说明文档
### 数据库结构  
|字段|属性|备注|
|---|---|---|
|id|primary key 主键；auto-increment 自增|本表唯一ID。|
|limit|varchar[10]|权限。public(公开)，private(私人)|
|content|text|动态内容|
|image|text|配图|
|created_time|datetime|创建时间|
|updatetime|datetime|修改时间|
|author|int[11]；foreign key 外键； CASCADE|作者|

## 接口说明  
### 1.发表动态  
URL: `http://127.0.0.1:5000/v1/topics/<uid>`  
### 1.1 请求方式  
POST
### 1.2 请求格式  
json 具体参数如下：  
|字段|类型|备注|
|---|---|---|
|limit|varchar|权限|
|content|varchar|内容带HTML格式|
请求示例：  
`{'limit':'public', 'content': '<p>xxx</p>'} `
### 1.3 响应格式  
json 具体参数如下：  
|字段|类型|备注|
|---|---|---|
|code|int|状态码。默认正常为200，异常见1.4|
|error|varchar|错误提示|
|user_id|varchar|用户ID|
响应示例：  
{'code': 200, 'user_id': '123'}  
### 3.4 异常码  
|异常码|含义|备注|
|---|---|---|
|10110|用户未登录||
|10300|请求错误||
|10301|权限码错误||
|10302|入库失败||
|500|服务器异常||
异常响应示例：  
{'code': 10301, 'error': '权限码错误'} 