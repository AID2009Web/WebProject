from django.db import models


class Order(models.Model):
    """
    取消订单0 已下单1 完成2
    未支付  0 已支付1
    未配送  0 配送中1 完成2

    总状态        订单状态    支付状态    配送状态
    已下单未支付     1           0           0
    主动取消订单     0           0           0
    超时取消订单     0           0           0
    已支付待发货     1           1           0
    已发货待确认     1           1           1
    已收货订单完成   2           1           2
    """
    # 订单状态码：取消订单0 已下单未支付100 已支付待发货110 已发货待确认111 已收货订单完成212
    ORDER_STATUS = ((0, 'cancel'), (100, 'created'),(101, 'unpaid'), (110, 'paid'), (111, 'shipped'), (212, 'completed'))
    # order = models.IntegerField(unique=True, verbose_name='订单编号')
    status = models.IntegerField(choices=ORDER_STATUS, null=True, verbose_name='订单状态')
    buyer = models.ForeignKey(to='user.User', to_field='id', on_delete=models.CASCADE, verbose_name='购买者')
    # address = models.CharField(max_length=100, verbose_name='订单配送地址')
    date_created = models.DateTimeField(auto_now_add=True, verbose_name='订单创建时间')


class Item(models.Model):
    # order = models.IntegerField(max_length=11)
    order = models.ForeignKey(Order, to_field='id', on_delete=models.CASCADE, verbose_name='')
    item = models.ForeignKey(to='item.Item', to_field='id', on_delete=models.CASCADE, verbose_name='商品')
    count = models.IntegerField(default=1, verbose_name='')
    price = models.DecimalField(max_digits=8, decimal_places=2, default=0, verbose_name='')
    # 评论内容：blank=True 字段不为空，由Django填充空字符串
    comment = models.CharField(max_length=140, blank=True, verbose_name='')
    # 评论时间由数据库自动写入：对象创建则生成时间；写入评论时自动修改为当期时间
    date = models.DateTimeField(auto_now=True, verbose_name='')


class Lesson(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, verbose_name='')
    # lesson = models.ForeignKey(to='lesson.Lesson0', to_field='id', on_delete=models.CASCADE, verbose_name='')
    price = models.DecimalField(max_digits=8, decimal_places=2, default=0, verbose_name='')


class BuyerAddr(models.Model):
    """
    主键id自动生成；用户buyer关联外键user_user0的id字段；收货人name; 电话tel；收货地址addr_1 addr_2...
    """
    # buyer = models.ForeignKey(to='user.User0', to_field='id', on_delete=models.CASCADE, verbose_name='')
    name = models.CharField(max_length=11, blank=True, verbose_name='')
    tel = models.IntegerField(null=True, verbose_name='')
    addr_1 = models.CharField(max_length=100, blank=True, verbose_name='')
    addr_2 = models.CharField(max_length=100, blank=True, verbose_name='')
    addr_3 = models.CharField(max_length=100, blank=True, verbose_name='')
    addr_4 = models.CharField(max_length=100, blank=True, verbose_name='')
    addr_5 = models.CharField(max_length=100, blank=True, verbose_name='')


class Status(models.Model):
    # 订单状态码：取消订单0 已下单未支付100 已支付待发货110 已发货待确认111 已收货订单完成212
    ORDER_STATUS = ((0, 'cancel'), (100, 'unpaid'), (110, 'paid'), (111, 'shipped'), (212, 'completed'))
    order = models.IntegerField(unique=True, verbose_name='订单编号')
    status = models.IntegerField(choices=ORDER_STATUS, null=True, verbose_name='订单状态')
    # 订单创建时间：数据库自动写入（对象创建则生成）；其他需手动写入
    date_created = models.DateTimeField(auto_now_add=True, verbose_name='订单创建时间')
    date_paid = models.DateTimeField(verbose_name='订单支付时间')
    date_shipped = models.DateTimeField(verbose_name='订单发货时间')
    date_completed = models.DateTimeField(verbose_name='订单完成时间')
