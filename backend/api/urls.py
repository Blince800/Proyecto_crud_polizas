from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Crear el router
router = DefaultRouter()

# =============================================================================
# REGISTRAR TODOS LOS VIEWSETS
# =============================================================================

# Sección 1: Personas y Ubicaciones
router.register(r'catalogos', views.CatalogosViewSet)
router.register(r'domicilios', views.DomiciliosViewSet)
router.register(r'personas', views.PersonasViewSet)
router.register(r'documentos-legales', views.DocumentosLegalesViewSet)
router.register(r'informacion-laboral', views.InformacionLaboralViewSet)
router.register(r'info-conyugal', views.InfoConyugalViewSet)
router.register(r'info-conyugal-arrendatario', views.InfoConyugalArrendatarioViewSet)

# Sección 2: Inmuebles y Coberturas
router.register(r'inmuebles', views.InmueblesViewSet)
router.register(r'inmuebles-usos', views.InmueblesUsosViewSet)
router.register(r'coberturas', views.CoberturasViewSet)
router.register(r'cuentas-bancarias', views.CuentasBancariasViewSet)

# Sección 3: Contratos y Relacionados
router.register(r'contratos', views.ContratosViewSet)
router.register(r'ocupantes', views.OcupantesViewSet)
router.register(r'referencias-personales', views.ReferenciasPersonalesViewSet)
router.register(r'garantias', views.GarantiasViewSet)
router.register(r'datos-escritura', views.DatosEscrituraViewSet)
router.register(r'personas-inmueble', views.PersonasInmuebleViewSet)
router.register(r'arrendador-anterior', views.ArrendadorAnteriorViewSet)

# Sección 4: Usuarios y Seguridad
router.register(r'roles', views.RolesViewSet)
router.register(r'usuarios-internos', views.UsuariosInternosViewSet)

# URLs del API
urlpatterns = [
    path('', include(router.urls)),
]

# URL para el API browser (opcional)
urlpatterns += [
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]