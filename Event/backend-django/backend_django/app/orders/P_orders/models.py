from django.db import models
from django.utils.timezone import now
from django.contrib.postgres.fields import ArrayField

# 📝 ENUMS
class OrderStatusEnum(models.TextChoices):
     PENDING = 'pending', 'Pending'
     COMPLETED = 'completed', 'Completed'
     CANCELLED = 'cancelled', 'Cancelled'
     REFUNDED = 'refunded', 'Refunded'

class PaymentStatusEnum(models.TextChoices):
     PENDING = 'pending', 'Pending'
     PAID = 'paid', 'Paid'
     FAILED = 'failed', 'Failed'
     REFUNDED = 'refunded', 'Refunded'

class OrderLineStatusEnum(models.TextChoices):
     ACTIVE = 'active', 'Active'
     CANCELLED = 'cancelled', 'Cancelled'
     REFUNDED = 'refunded', 'Refunded'

class ItemTypeEnum(models.TextChoices):
     TICKET = 'ticket', 'Ticket'
     COMPLEMENT = 'complement', 'Complement'

class TicketUnitStatusEnum(models.TextChoices):
     ACTIVE = 'active', 'Active'
     USED = 'used', 'Used'
     IN_CLAIM = 'inClaim', 'In Claim'
     REFUNDED = 'refunded', 'Refunded'


# 🧾 P_Order (Tabla: p_order)
class P_Order(models.Model):
     idorder = models.AutoField(primary_key=True, db_column='idorder')
     idclient = models.IntegerField(db_column='idclient')
     idevent = models.IntegerField(db_column='idevent')
     subtotaltickets = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, db_column='subtotaltickets')
     subtotalcomplements = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, db_column='subtotalcomplements')
     subtotalcommissions = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, db_column='subtotalcommissions')
     totalprice = models.DecimalField(max_digits=10, decimal_places=2, db_column='totalprice')
     payment = models.CharField(max_length=50, null=True, blank=True, db_column='payment')
     paymentreference = models.CharField(max_length=100, null=True, blank=True, db_column='paymentreference')
     paymentstatus = models.CharField(
          max_length=20,
          choices=PaymentStatusEnum.choices,
          default=PaymentStatusEnum.PENDING,
          db_column='paymentstatus'
     )
     status = models.CharField(
          max_length=20,
          choices=OrderStatusEnum.choices,
          default=OrderStatusEnum.PENDING,
          db_column='status'
     )
     datepurchase = models.DateTimeField(default=now, db_column='datepurchase')
     createdat = models.DateTimeField(auto_now_add=True, db_column='createdat')
     updatedat = models.DateTimeField(auto_now=True, db_column='updatedat')

     class Meta:
          db_table = 'p_order'
          managed = False  # Django no intentará crear/modificar la tabla

     def __str__(self):
          return f"Order #{self.idorder} - Client {self.idclient}"


# 🧾 P_OrderLine (Tabla: p_orderline)
class P_OrderLine(models.Model):
     idorderline = models.AutoField(primary_key=True, db_column='idorderline')
     idorder = models.IntegerField(db_column='idorder')
     itemtype = models.CharField(
          max_length=20,
          choices=ItemTypeEnum.choices,
          db_column='itemtype'
     )
     itemid = models.IntegerField(db_column='itemid')
     quantity = models.PositiveIntegerField(db_column='quantity')
     discount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, db_column='discount')
     subtotal = models.DecimalField(max_digits=10, decimal_places=2, db_column='subtotal')
     status = models.CharField(
          max_length=20,
          choices=OrderLineStatusEnum.choices,
          default=OrderLineStatusEnum.ACTIVE,
          db_column='status'
     )
     createdat = models.DateTimeField(auto_now_add=True, db_column='createdat')
     updatedat = models.DateTimeField(auto_now=True, db_column='updatedat')

     class Meta:
          db_table = 'p_orderline'
          managed = False

     def __str__(self):
          return f"OrderLine #{self.idorderline} - Order #{self.idorder} - {self.itemtype}"


# 🎫 P_TicketUnit (Tabla: p_ticketunit)
class P_TicketUnit(models.Model):
     idticketunit = models.AutoField(primary_key=True, db_column='idticketunit')
     idorder = models.IntegerField(db_column='idorder')
     idticketinfo = models.IntegerField(db_column='idticketinfo')
     code = models.CharField(max_length=50, unique=True, db_column='code')
     unitprice = models.DecimalField(max_digits=10, decimal_places=2, db_column='unitprice')
     complements = ArrayField(models.IntegerField(), default=list)
     nameassistant = models.CharField(max_length=100, null=True, blank=True, db_column='nameassistant')
     dniassistant = models.CharField(max_length=20, null=True, blank=True, db_column='dniassistant')
     status = models.CharField(
          max_length=20,
          choices=TicketUnitStatusEnum.choices,
          default=TicketUnitStatusEnum.ACTIVE,
          db_column='status'
     )
     createdat = models.DateTimeField(auto_now_add=True, db_column='createdat')
     updatedat = models.DateTimeField(auto_now=True, db_column='updatedat')

     class Meta:
          db_table = 'p_ticketunit'
          managed = False

     def __str__(self):
          return f"TicketUnit #{self.idticketunit} - Order #{self.idorder}"
