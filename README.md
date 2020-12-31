# 初始文件
2020/12/12
### GIT

* 使用github管理  
* .gitignore文件默认跳过缓存文件WebProject/__pycache__

### Django

* WebProject/settings.py 
    * 修改显示语言与时区
        ```
        LANGUAGE_CODE = 'zh-Hans'

        TIME_ZONE = 'Asia/Shanghai'

        ```
    
    * 修改模板路径
    
      ```
      'DIRS': [os.path.join(BASE_DIR,'templates')],
      ```
    
    * 增加静态文件的路径
    
        ```
        STATICFILES_DIRS = [
            os.path.join(BASE_DIR, 'static'),
        ]
        ```
    
        
    
* WebProject/urls.py  

    * 增加default路由  
    * 增加静态CSS/JS导入方法  

* templates 文件夹为放HTML文件  

    * 默认模板为index.html 增加了
        1. header / main / footer 标签
        2. 默认导入common.css和 jQuery

* static/css 文件夹为放CSS样式

    * 其中common.css 样式为通用样式  用于统一风格 后续可更改 	

* images 文件夹为图标/图片文件存放  

* 

