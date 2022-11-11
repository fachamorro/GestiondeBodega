from django.shortcuts import render
from rest_framework import generics,views,permissions
from rest_framework.response import Response
from django.contrib.auth import login, logout
from rest_framework import status
from django.http import JsonResponse
from rest_framework.views import APIView

from .models import TipoProducto, Producto, Cliente, Proveedor, LoteProducto, Usuario, OrdenCompra, OrdenEgreso, ItemOrdenCompra, ItemOrdenEgreso
from .serializers import *

class TipoProductoList(generics.ListCreateAPIView):
    queryset=TipoProducto.objects.all()
    #permission_classes=[permissions.IsAuthenticatedOrReadOnly]
    serializer_class=TipoProductoSerializer
class TipoProductoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=TipoProducto.objects.all()
    #permission_classes=[permissions.IsAuthenticatedOrReadOnly]
    serializer_class=TipoProductoSerializer

class LoteProductoList(generics.ListCreateAPIView):
    queryset=LoteProducto.objects.all()
    #permission_classes=[permissions.IsAuthenticatedOrReadOnly]
    serializer_class=LoteProductoSerializer
class LoteProductoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=LoteProducto.objects.all()
    #permission_classes=[permissions.IsAuthenticatedOrReadOnly]
    serializer_class=LoteProductoSerializer
class LoteProductoFiltroList(generics.ListCreateAPIView):
    serializer_class=LoteProductoSerializer
    def get_queryset(self):
        producto = Producto.objects.get(id=self.kwargs['pk'])
        resultList = LoteProducto.objects.filter(producto=producto)
        return resultList
    
class ProductoList(generics.ListCreateAPIView):
    queryset=Producto.objects.all()
    serializer_class=ProductoSerializer
    
class ProductoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=Producto.objects.all()
    serializer_class=ProductoSerializer

class ProveedorList(generics.ListCreateAPIView):
    queryset=Proveedor.objects.all()
    serializer_class=ProveedorSerializer
class ProveedorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=Proveedor.objects.all()
    serializer_class=ProveedorSerializer
    
class ClienteList(generics.ListCreateAPIView):
    queryset=Cliente.objects.all()
    serializer_class=ClienteSerializer
class ClienteDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=Cliente.objects.all()
    serializer_class=ClienteSerializer
    
class UsuarioList(generics.ListCreateAPIView):
    queryset=Usuario.objects.all()
    serializer_class=UsuarioSerializer
class UsuarioDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=Usuario.objects.all()
    serializer_class=UsuarioSerializer

class OrdenCompraList(generics.ListCreateAPIView):
    queryset=OrdenCompra.objects.all()
    serializer_class=OrdenCompraSerializer

class OrdenCompraDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=OrdenCompra.objects.all()
    serializer_class=OrdenCompraSerializer
    #metodo que retorna la orden de compra grabada
    def list(self, request):
        # Note the use of `get_queryset()` instead of `self.queryset`
        queryset = self.get_queryset()
        serializer = OrdenCompraSerializer(queryset, many=True)
        return Response(serializer.data)
    
    
class ItemOrdenCompraList(generics.ListCreateAPIView):
    queryset=ItemOrdenCompra.objects.all()
    serializer_class=ItemOrdenCompraSerializer
    
class ItemOrdenCompraFiltroList(generics.ListCreateAPIView):
    serializer_class=ItemOrdenCompraSerializer

    def get_queryset(self):
        post = OrdenCompra.objects.get(id=self.kwargs['pk'])
        comment = ItemOrdenCompra.objects.filter(ordenCompra=post)
        return comment
    
class ItemOrdenCompraDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=ItemOrdenCompra.objects.all()
    serializer_class=ItemOrdenCompraSerializer
    #metodo que retorna item orden de compra grabada
    def list(self, request):
        # Note the use of `get_queryset()` instead of `self.queryset`
        queryset = self.get_queryset()
        serializer = ItemOrdenCompraSerializer(queryset, many=True)
        return Response(serializer.data)
    
class OrdenEgresoList(generics.ListCreateAPIView):
    queryset=OrdenEgreso.objects.all()
    serializer_class=OrdenEgresoSerializer
    
class ItemOrdenEgresoFiltroList(generics.ListCreateAPIView):
    serializer_class=ItemOrdenEgresoSerializer

    def get_queryset(self):
        ordenE = OrdenEgreso.objects.get(id=self.kwargs['pk'])
        resultList = ItemOrdenEgreso.objects.filter(ordenEgreso=ordenE)
        return resultList
    
class OrdenEgresoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=OrdenEgreso.objects.all()
    serializer_class=OrdenEgresoSerializer
    def list(self, request):
        # Note the use of `get_queryset()` instead of `self.queryset`
        queryset = self.get_queryset()
        serializer = OrdenEgresoSerializer(queryset, many=True)
        return Response(serializer.data)
    
class ItemOrdenEgresoList(generics.ListCreateAPIView):
    queryset=ItemOrdenEgreso.objects.all()
    serializer_class=ItemOrdenEgresoSerializer
    
class ItemOrdenEgresoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=ItemOrdenEgreso.objects.all()
    serializer_class=ItemOrdenEgresoSerializer
    def list(self, request):
        # Note the use of `get_queryset()` instead of `self.queryset`
        queryset = self.get_queryset()
        serializer = ItemOrdenEgresoSerializer(queryset, many=True)
        return Response(serializer.data)

#contar registros

class contarRegistrosView(APIView):
    def get(self, request):
        respuest= {
            'productos': Producto.objects.all().count(),
            'proveedores': Proveedor.objects.all().count(),
            'clientes': Cliente.objects.all().count(),
            'ordenescompra': OrdenCompra.objects.all().count(),
            'ordenesegreso': OrdenEgreso.objects.all().count(),
        }
    #return Producto.objects.all().count()
        return Response(respuest)
    

#Seguridad

#https://www.guguweb.com/2022/01/23/django-rest-framework-authentication-the-easy-way/
class LoginView(views.APIView):
    # This view should be accessible also for unauthenticated users.
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = LoginSerializer(data=self.request.data,
            context={ 'request': self.request })
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return Response(None, status=status.HTTP_202_ACCEPTED)

class ProfileView(generics.RetrieveAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user