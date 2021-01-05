# 评论模块API说明文档
### 数据库结构 
|字段|属性|备注|
|---|---|---|
|id|primary key 主键；auto-increment 自增|本表唯一ID。|
|content|varchar[50]|留言内容|
|created_time|datetime|创建时间|
|parent_message|int[11] default=0|回复的父留言。默认为0|
|author|int[11]；foreign key 外键； CASCADE|评论人|
|topic|int[11]；foreign key 外键； CASCADE|评论地|
