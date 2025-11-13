from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import *
from .serializers import *

# Create your views here.

# =============================================================================
# SECCIÓN 1: PERSONAS Y UBICACIONES
# =============================================================================

class CatalogosViewSet(viewsets.ModelViewSet):
    queryset = Catalogos.objects.all()
    serializer_class = CatalogosSerializer
    permission_classes = [permissions.IsAuthenticated]

class DomiciliosViewSet(viewsets.ModelViewSet):
    queryset = Domicilios.objects.all()
    serializer_class = DomicilioSerializer
    permission_classes = [permissions.IsAuthenticated]

class PersonasViewSet(viewsets.ModelViewSet):
    queryset = Personas.objects.all()
    serializer_class = PersonaSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = Personas.objects.all()
        tipo_persona = self.request.query_params.get('tipo_persona')
        if tipo_persona:
            queryset = queryset.filter(tipo_persona=tipo_persona)
        return queryset

class DocumentosLegalesViewSet(viewsets.ModelViewSet):
    queryset = DocumentosLegales.objects.all()
    serializer_class = DocumentosLegalesSerializer
    permission_classes = [permissions.IsAuthenticated]

class InformacionLaboralViewSet(viewsets.ModelViewSet):
    queryset = InformacionLaboral.objects.all()
    serializer_class = InformacionLaboralSerializer
    permission_classes = [permissions.IsAuthenticated]

class InfoConyugalViewSet(viewsets.ModelViewSet):
    queryset = InfoConyugal.objects.all()
    serializer_class = InfoConyugalSerializer
    permission_classes = [permissions.IsAuthenticated]

class InfoConyugalArrendatarioViewSet(viewsets.ModelViewSet):
    queryset = InfoConyugalArrendatario.objects.all()
    serializer_class = InfoConyugalArrendatarioSerializer
    permission_classes = [permissions.IsAuthenticated]

# =============================================================================
# SECCIÓN 2: INMUEBLES Y COBERTURAS
# =============================================================================

class InmueblesViewSet(viewsets.ModelViewSet):
    queryset = Inmuebles.objects.all()
    serializer_class = InmueblesSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = Inmuebles.objects.all()
        uso_habitacion = self.request.query_params.get('uso_habitacion')
        if uso_habitacion:
            queryset = queryset.filter(uso_habitacion=uso_habitacion)
        return queryset

class InmueblesUsosViewSet(viewsets.ModelViewSet):
    queryset = InmueblesUsos.objects.all()
    serializer_class = InmueblesUsosSerializer
    permission_classes = [permissions.IsAuthenticated]

class CoberturasViewSet(viewsets.ModelViewSet):
    queryset = Coberturas.objects.all()
    serializer_class = CoberturasSerializer
    permission_classes = [permissions.IsAuthenticated]

class CuentasBancariasViewSet(viewsets.ModelViewSet):
    queryset = CuentasBancarias.objects.all()
    serializer_class = CuentasBancariasSerializer
    permission_classes = [permissions.IsAuthenticated]

# =============================================================================
# SECCIÓN 3: CONTRATOS Y RELACIONADOS
# =============================================================================

class ContratosViewSet(viewsets.ModelViewSet):
    queryset = Contratos.objects.all()
    serializer_class = ContratoSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = Contratos.objects.all()
        # Filtros opcionales
        fecha_inicio = self.request.query_params.get('fecha_inicio')
        if fecha_inicio:
            queryset = queryset.filter(fecha_inicio__gte=fecha_inicio)
        return queryset

class OcupantesViewSet(viewsets.ModelViewSet):
    queryset = Ocupantes.objects.all()
    serializer_class = OcupantesSerializer
    permission_classes = [permissions.IsAuthenticated]

class ReferenciasPersonalesViewSet(viewsets.ModelViewSet):
    queryset = ReferenciasPersonales.objects.all()
    serializer_class = ReferenciasPersonalesSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = ReferenciasPersonales.objects.all()
        tipo_referencia = self.request.query_params.get('tipo_referencia')
        if tipo_referencia:
            queryset = queryset.filter(tipo_referencia=tipo_referencia)
        return queryset

class GarantiasViewSet(viewsets.ModelViewSet):
    queryset = Garantias.objects.all()
    serializer_class = GarantiasSerializer
    permission_classes = [permissions.IsAuthenticated]

class DatosEscrituraViewSet(viewsets.ModelViewSet):
    queryset = DatosEscritura.objects.all()
    serializer_class = DatosEscrituraSerializer
    permission_classes = [permissions.IsAuthenticated]

class PersonasInmuebleViewSet(viewsets.ModelViewSet):
    queryset = PersonasInmueble.objects.all()
    serializer_class = PersonasInmuebleSerializer
    permission_classes = [permissions.IsAuthenticated]

class ArrendadorAnteriorViewSet(viewsets.ModelViewSet):
    queryset = ArrendadorAnterior.objects.all()
    serializer_class = ArrendadorAnteriorSerializer
    permission_classes = [permissions.IsAuthenticated]

# =============================================================================
# SECCIÓN 4: USUARIOS Y SEGURIDAD
# =============================================================================

class RolesViewSet(viewsets.ModelViewSet):
    queryset = Roles.objects.all()
    serializer_class = RolesSerializer
    permission_classes = [permissions.IsAuthenticated]

class UsuariosInternosViewSet(viewsets.ModelViewSet):
    queryset = UsuariosInternos.objects.all()
    serializer_class = UsuariosInternosSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = UsuariosInternos.objects.all()
        activo = self.request.query_params.get('activo')
        if activo is not None:
            queryset = queryset.filter(activo=activo.lower() == 'true')
        return queryset
    
