# 订单模块API说明文档
### 数据库结构  
#### 基本信息  
|字段|属性|备注|
|---|---|---|
|id|primary key 主键；auto-increment 自增|本表唯一ID。|
|order|int[11]；unique 唯一|订单编号。|
|status|enum|订单状态。详见备注。|
|buyer|int[11]；foreign key 外键； CASCADE|购买者。本表作为从表，链接主表user_user的id字段|
|address|varchar[100]| 下单地址。|
|date_created|datetime|创建时间|
备注：
|状态|代码|状态|代码|状态|代码|
|---|---|---|---|---|
|取消订单|0|已下单|1|完成|2|
|未支付|0|已支付|1|||
|未配送|0|配送中|1|完成|2|

|总状态|订单状态|支付状态| 配送状态|
|---|---|---|---|---|
|已下单未支付|1|0|0|
|主动取消订单|0|0|0|
|超时取消订单|0|0|0|
|已支付待发货|1|1|0|
|已发货待确认|1|1|1|
|已收货订单完成|2|1|2|
#### 商品信息  
|字段|属性|备注|
|---|---|---|
|id|primary key 主键；auto-increment 自增|本表唯一ID。|
|order|int[11]|订单编号。本表作为从表，链接主表order_order的id字段|
|item|int[11]；foreign key 外键； CASCADE|商品。本表作为从表，链接主表item_item的id字段|
|count|int[2]；default默认值| 购买商品数量。默认值为1，最大为99|
|price| decimal(8,2)| 商品单价。默认值为0.00。记录下单时的单价 |
#### 教程信息  
|字段|属性|备注|
|---|---|---|
|id| primary key 主键；auto-increment 自增 | 本表唯一ID |
|order|int[11]| 订单编号。本表作为从表，链接主表order_order的id字段|
|lesson|int[11]；foreign key 外键； CASCADE|教程。本表作为从表，链接主表lesson_lesson的id字段|
|price|decimal(8,2)；default 默认值 |单价。默认值为0.00。记录下单时的单价 |
#### 用户送货地址表  
|字段|属性|备注|
|---|---|---|
|id| primary key 主键；auto-increment 自增 | 本表唯一ID |
|buyer| int[11]；foreign key 外键； CASCADE|购买者。本表作为从表，链接主表user_user的id字段|
|consignee|varchar[15]|收货人|
|tel| varchar[11]|手机号|
|tag| varchar[10]|地址标签|
|province| varchar[10]|省份|
|city| varchar[15]|城市|
|county| varchar[15]|区县|
|street| varchar[35]|街道|
|zipcode| varchar[6]|邮政编码|
#### 订单状态时间表  
|字段|属性|备注|
|---|---|---|
|id| primary key 主键；auto-increment 自增 | 本表唯一ID |
|order| int[11]；unique 唯一| 订单编号|
|status|enum|订单状态。|
|date_created|datetime|订单创建时间|
|date_paid|datetime|订单支付时间|
|date_shipped|datetime|订单发货时间|
|date_completed|datetime|订单完成时间|


## 接口说明  
### 1.创建订单  
URL: `http://127.0.0.1:5000/v1/order`  
### 1.1 请求方式  
POST
### 1.2 请求格式  
json 具体参数如下：  
|字段|类型|备注|
|---|---|---|
||[]|包含各个商品|
|gid|int|商品ID|
|type|varchar|商品款式代码。|
|price|varchar|商品价格|
|orderNum|int|数量|
### 1.3 响应格式  
json 具体参数如下：  
|字段|类型|备注|
|---|---|---|
|code|int|状态码。默认正常为200，异常见1.4|
|error|varchar|错误提示|
|oid|int|订单编号|
响应示例：  
{'code': 200}  
### 1.4 异常码  
|异常码|含义|备注|
|---|---|---|
|10110|用户未登录||
|10700|请求错误||
|10701|订单创建失败||
|10702|商品不存在||
|10703|商品订单创建失败||
|500|服务器异常||
异常响应示例：  
{'code': 10602 'error': '分类码错误'} 

### 2.获取订单接口  
URL: `http://127.0.0.1:5000/v1/order?oid=<oid>`  
### 2.1 请求方式  
GET
### 2.2 请求格式  
获取指定订单数据。  
### 2.3 响应格式  
json 具体参数如下：  
|字段|类型|备注|
|---|---|---|
|code|int|状态码。默认正常为200，异常见2.4|
|error|varchar|错误提示|
|data|{}|返回数据。items|
|items|[]|返回数据。id/price/count/title/image|
响应示例：  
{'code': 200, 'data':{}}
### 2.4 异常码  
|异常码|含义|备注|
|---|---|---|
|10702|商品不存在||
|10704|订单不存在||
|10705|订单商品获取失败||
|500|服务器异常||
异常响应示例：  
{'code': 500} 

### 3.获取地址接口  
URL: `http://127.0.0.1:5000/v1/order/<uid>/address`  
### 3.1 请求方式  
GET  
### 3.2 请求格式  
获取指定用户地址  
### 3.3 响应格式  
json 具体参数如下：  
|字段|类型|备注|
|code|int|状态码。默认正常为200，异常见3.4|
|error|varchar|错误提示|
|data|{}|返回数据。uid/addr|
|addr|[]|返回款式数据。{id/consignee/tag/tel/province/city/county/street/zipcode}|
响应示例：  
{'code': 200, 'data':{}}

### 3.4 异常码  
|异常码|含义|备注|
|---|---|---|
|10700|请求错误||
|10706|用户错误||
|10707|地址保存失败||
|10708|地址修改失败||
|500|服务器异常||
异常响应示例：  
{'code': 10606, 'error': '访问商品不存在'} 

### 未实现功能   
PUT请求修改  
订单ID有争议：  
（1）点击立即下单时创建入库，点击提交订单时改变状态；  
（2）点击立即下单生成订单号，点击提交订单时按订单号创建入库。  
存在问题：  
（1）下单不提交会产生废弃订单。需要定时清理；  
（2）不能保证生成的订单号唯一；
