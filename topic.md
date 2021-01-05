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