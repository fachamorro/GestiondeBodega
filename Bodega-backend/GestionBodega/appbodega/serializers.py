from rest_framework import serializers

from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from .models import  TipoProducto, Producto, Cliente, Proveedor, LoteProducto, Usuario, OrdenCompra, OrdenEgreso, ItemOrdenCompra, ItemOrdenEgreso

class TipoProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model=TipoProducto
        fields=['id','descripcion','fechaRegistroTipoProducto']
        extra_kwargs={
            'descripcion':{'required':True},
        }
       
class LoteProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model=LoteProducto
        fields=['id','numeroLote','cantidad','precioUnitario','fechaCaducidad','producto']
        
class ProductoSerializer(serializers.ModelSerializer):
   # posts = serializers.SerializerMethodField()
    
    class Meta:
        model=Producto
        fields=['id','descripcion','cantidad','tipoProducto','fechaRegistroProducto','estado']
        #fields=['id','descripcion','cantidad','tipoProducto','fechaRegistroProducto','estado','posts']
    #def get_posts(self, obj):
     #   posts = Producto.objects.all().count()
     #   return posts
        
class ProveedorSerializer(serializers.ModelSerializer):
    class Meta:
        model=Proveedor
        fields=['id','ruc','razonSocial','telefono','direccion','email']
        extra_kwargs = {
            "razonSocial": {"error_messages": {"unique": "La Razon Social ya existe!!"}}
        }

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model=Cliente
        fields=['id','tipoIdentificacion','dui','nombres','apellidos','telefono','direccion','email']

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model=Usuario
        fields=['id','tipoUsuario','tipoIdentificacion','dui','nombres','apellidos','telefono','direccion','email']
    
class OrdenCompraSerializer(serializers.ModelSerializer):
    class Meta:
        model=OrdenCompra
        fields=['id','numeroOrdenCompra','fechaCompra','proveedor','valorTotal','usuario','fechaRegistroOrdenCompra','estado']
    
class ItemOrdenCompraSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemOrdenCompra
        fields = ['id','producto','lote','cantidad','precioUnitario','valorTotalItem','ordenCompra']

class OrdenEgresoSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrdenEgreso
        fields = ['id','numeroOrdenEgreso','fechaEgreso','cliente','valorTotal','usuario','fechaRegistroOrdenEgreso','estado']
    
class ItemOrdenEgresoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemOrdenEgreso
        fields = ['id','producto','lote','cantidad','precioUnitario','valorTotalItem','ordenEgreso']
        

class LoginSerializer(serializers.Serializer):
    """
    This serializer defines two fields for authentication:
      * username
      * password.
    It will try to authenticate the user with when validated.
    """
    username = serializers.CharField(
        label="Username",
        write_only=True
    )
    password = serializers.CharField(
        label="Password",
        # This will be used when the DRF browsable API is enabled
        style={'input_type': 'password'},
        trim_whitespace=False,
        write_only=True
    )

    def validate(self, attrs):
        # Take username and password from request
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            # Try to authenticate the user using Django auth framework.
            user = authenticate(request=self.context.get('request'),
                                username=username, password=password)
            if not user:
                # If we don't have a regular user, raise a ValidationError
                msg = 'Access denied: wrong username or password.'
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = 'Both "username" and "password" are required.'
            raise serializers.ValidationError(msg, code='authorization')
        # We have a valid user, put it in the serializer's validated_data.
        # It will be used in the view.
        attrs['user'] = user
        return attrs

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'first_name',
            'last_name',
        ]