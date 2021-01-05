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