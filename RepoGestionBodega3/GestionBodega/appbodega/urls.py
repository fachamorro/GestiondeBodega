from django.urls import path

from django.conf.urls import url
from . import views

urlpatterns = [
    #tipo producto    
    path("tipoproducto/", views.TipoProductoList.as_view()),
    path("tipoproducto/<int:pk>", views.TipoProductoDetail.as_view()),

    path("loteproducto/", views.LoteProductoList.as_view()),
    path("loteproducto/<int:pk>", views.LoteProductoDetail.as_view()),
    path("loteproducto/filtro/<int:pk>", views.LoteProductoFiltroList.as_view()),

    path("producto/", views.ProductoList.as_view()),
    path("producto/<int:pk>", views.ProductoDetail.as_view()),
    
    path("proveedor/", views.ProveedorList.as_view()),
    path("proveedor/<int:pk>", views.ProveedorDetail.as_view()),

    path("cliente/", views.ClienteList.as_view()),
    path("cliente/<int:pk>", views.ClienteDetail.as_view()),

    path("usuario/", views.UsuarioList.as_view()),
    path("usuario/<int:pk>", views.UsuarioDetail.as_view()),

    path("ordencompra/", views.OrdenCompraList.as_view()),
    path("ordencompra/<int:pk>", views.OrdenCompraDetail.as_view()),

    path("itemordencompra/", views.ItemOrdenCompraList.as_view()),
    path("itemordencompra/filtrooc/<int:pk>", views.ItemOrdenCompraFiltroList.as_view()),
    path("itemordencompra/<int:pk>", views.ItemOrdenCompraDetail.as_view()),

    path("ordenegreso/", views.OrdenEgresoList.as_view()),
    path("ordenegreso/<int:pk>", views.OrdenEgresoDetail.as_view()),

    path("itemordenegreso/", views.ItemOrdenEgresoList.as_view()),
    path("itemordenegreso/filtrooe/<int:pk>", views.ItemOrdenEgresoFiltroList.as_view()),
    path("itemordenegreso/<int:pk>", views.ItemOrdenEgresoDetail.as_view()),
    
    #contar registros
    path('registros/contar/', views.contarRegistrosView.as_view()),
        
    #seguridad   
    path('login/', views.LoginView.as_view()),
    path('profile/', views.ProfileView.as_view()),

]
