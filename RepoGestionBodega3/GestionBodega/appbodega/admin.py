from django.contrib import admin

from .models import Cliente, ItemOrdenCompra, ItemOrdenEgreso, LoteProducto, OrdenCompra, OrdenEgreso, Producto, Proveedor, TipoProducto, Usuario

# Register your models here.
admin.site.register(TipoProducto)
admin.site.register(Producto)
admin.site.register(Cliente)
admin.site.register(Proveedor)
admin.site.register(LoteProducto)
admin.site.register(Usuario)
admin.site.register(OrdenCompra)
admin.site.register(OrdenEgreso)
admin.site.register(ItemOrdenCompra)
admin.site.register(ItemOrdenEgreso)