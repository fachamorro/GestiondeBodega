from django.db import models

class TipoProducto(models.Model):
    id=models.AutoField(primary_key=True)
    descripcion = models.TextField(max_length=50,help_text="Ingrese el Tipo de producto")
    fechaRegistroTipoProducto=models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.descripcion
    class Meta:
        ordering=['id']
class Producto(models.Model):
    id=models.AutoField(primary_key=True)
    descripcion = models.TextField(max_length=50,help_text="Ingrese la descripcion del producto")
    cantidad= models.IntegerField(default=0)
    tipoProducto=models.ForeignKey(TipoProducto, on_delete=models.CASCADE)
    fechaRegistroProducto=models.DateTimeField(auto_now=True)
    estado= models.BooleanField(blank=True, null=True)
    def __str__(self):
        return self.descripcion
    class Meta:
        ordering=['descripcion']
         
class LoteProducto(models.Model):
    id=models.AutoField(primary_key=True)
    numeroLote = models.TextField(help_text="Ingrese el numero de lote del producto")
    cantidad= models.IntegerField()
    precioUnitario = models.DecimalField(max_digits=10, decimal_places=5)
    fechaCaducidad=models.DateField(blank=True, null=True)
    producto=models.ForeignKey(Producto, on_delete=models.SET_NULL, null=True)
    def __str__(self):
        return self.numeroLote    
    class Meta:
        ordering=['id']
        
class Proveedor(models.Model):
    id=models.AutoField(primary_key=True)
    ruc=models.BigIntegerField(default = 0, unique=True)
    razonSocial=models.TextField(max_length=50, unique=True)
    telefono=models.IntegerField()
    direccion=models.TextField(max_length=50)
    email=models.EmailField(unique=True)
    def __str__(self):
        return self.razonSocial
    class Meta:
        ordering=['razonSocial']

class Cliente(models.Model):
    id=models.AutoField(primary_key=True)
    CEDULA='CE'
    RUC='RU'
    PASAPORTE='PA'
    tiposIdentificacion=(
        (CEDULA,'CEDULA'),
        (RUC,'RUC'),
        (PASAPORTE,'PASAPORTE'),
    )
    tipoIdentificacion=models.CharField(
        max_length=2,
        choices=tiposIdentificacion,
        default=CEDULA
    )
    dui=models.BigIntegerField(help_text='La cedula debe tener 10 digitos')
    nombres=models.TextField(max_length=50)
    apellidos=models.TextField(max_length=50)
    telefono=models.IntegerField()
    direccion=models.TextField(max_length=50)
    email=models.EmailField(unique=True, null=True)
    estado= models.BooleanField(blank=True, null=True)
    def __str__(self):
        return self.apellidos+" "+self.nombres+" DUI: "+str(self.dui)
    class Meta:
        ordering=['apellidos']

class Usuario(models.Model):
    id=models.AutoField(primary_key=True)
    tipoUsuario=(
        ('OPERADOR','OPERADOR'),
        ('ADMINISTRADOR','PASAPORTE'),
    )
    tipoIdentificacion=(
        ('CEDULA','CEDULA'),
        ('PASAPORTE','PASAPORTE'),
    )
    dui=models.BigIntegerField(help_text='La cedula debe tener 10 digitos')
    nombres=models.TextField(max_length=50)
    apellidos=models.TextField(max_length=50)
    telefono=models.IntegerField()
    direccion=models.TextField(max_length=50, null=True)
    email=models.EmailField(unique=True, null=True)
    def __str__(self):
        return self.dui
    
class OrdenCompra(models.Model):
    id=models.AutoField(primary_key=True)
    numeroOrdenCompra=models.IntegerField(unique=True, null=True)
    fechaCompra=models.DateField()
    proveedor=models.ForeignKey(Proveedor, on_delete=models.SET_NULL, null=True)
    valorTotal=models.DecimalField(max_digits=10, decimal_places=5)
    usuario=models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True)
    fechaRegistroOrdenCompra=models.DateTimeField(auto_now=True)
    estado= models.BooleanField(blank=True, null=True)
    def __str__(self):
        return f'Orden Compra Nro.: {self.id}'
    
class ItemOrdenCompra(models.Model):
    id = models.AutoField(primary_key=True)
    producto = models.ForeignKey(Producto, on_delete=models.SET_NULL, null=True)
    lote =models.TextField(help_text="Ingrese el numero de lote del producto")
    cantidad = models.IntegerField(null=True)
    precioUnitario = models.DecimalField(max_digits=10, decimal_places=5, null=True)
    valorTotalItem = models.DecimalField(max_digits=10, decimal_places=5, null=True)
    ordenCompra=models.ForeignKey(OrdenCompra, on_delete=models.SET_NULL, null=True)
    def __str__(self):
        return str(self.ordenCompra)

class OrdenEgreso(models.Model):
    id=models.AutoField(primary_key=True)
    numeroOrdenEgreso=models.IntegerField(unique=True, null=True)
    fechaEgreso=models.DateTimeField(auto_now=True)
    cliente=models.ForeignKey(Cliente, on_delete=models.SET_NULL, null=True)
    valorTotal=models.DecimalField(max_digits=10, decimal_places=5)
    usuario=models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True)
    fechaRegistroOrdenEgreso=models.DateTimeField(auto_now=True)
    estado= models.BooleanField(blank=True, null=True)
    def __str__(self):
        return f'Orden Egreso Nro.: {self.id}'
    #usuario=models.usser
    
class ItemOrdenEgreso(models.Model):
    id=models.AutoField(primary_key=True)
    producto = models.ForeignKey(Producto, on_delete=models.SET_NULL, null=True)
    lote=models.ForeignKey(LoteProducto, on_delete=models.SET_NULL, null=True)
    cantidad= models.IntegerField()
    precioUnitario = models.DecimalField(max_digits=10, decimal_places=5)
    valorTotalItem=models.DecimalField(max_digits=10, decimal_places=5)
    ordenEgreso=models.ForeignKey(OrdenEgreso, on_delete=models.SET_NULL, null=True)
    def __str__(self):
        return self.ordenEgreso
    

