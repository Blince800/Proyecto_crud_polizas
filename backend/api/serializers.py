from rest_framework import serializers
from .models import *

class PersonaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Personas
        fields = '__all__'

class DomicilioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Domicilios
        fields = '__all__'

class ContratoSerializer(serializers.ModelSerializer):
    arrendador_nombre = serializers.CharField(source='id_arrendador.nombre', read_only=True)
    arrendatario_nombre = serializers.CharField(source='id_arrendatario.nombre', read_only=True)
    inmueble_direccion = serializers.CharField(source='id_inmueble.id_domicilio.calle', read_only=True)
    
    class Meta:
        model = Contratos
        fields = '__all__'

# ... tus serializers existentes ...

class CatalogosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Catalogos
        fields = '__all__'

class DocumentosLegalesSerializer(serializers.ModelSerializer):
    persona_nombre = serializers.CharField(source='id_persona.nombre', read_only=True)
    
    class Meta:
        model = DocumentosLegales
        fields = '__all__'

class InformacionLaboralSerializer(serializers.ModelSerializer):
    persona_nombre = serializers.CharField(source='id_persona.nombre', read_only=True)
    
    class Meta:
        model = InformacionLaboral
        fields = '__all__'

class InfoConyugalSerializer(serializers.ModelSerializer):
    persona_nombre = serializers.CharField(source='id_persona.nombre', read_only=True)
    
    class Meta:
        model = InfoConyugal
        fields = '__all__'

class InfoConyugalArrendatarioSerializer(serializers.ModelSerializer):
    persona_nombre = serializers.CharField(source='id_persona.nombre', read_only=True)
    
    class Meta:
        model = InfoConyugalArrendatario
        fields = '__all__'

# ... después de tus serializers existentes ...

class InmueblesSerializer(serializers.ModelSerializer):
    domicilio_info = DomicilioSerializer(source='id_domicilio', read_only=True)
    usos_display = serializers.CharField(source='get_usos_display', read_only=True)
    
    class Meta:
        model = Inmuebles
        fields = '__all__'

class InmueblesUsosSerializer(serializers.ModelSerializer):
    inmueble_info = InmueblesSerializer(source='id_inmueble', read_only=True)
    uso_info = CatalogosSerializer(source='id_uso_catalogo', read_only=True)
    
    class Meta:
        model = InmueblesUsos
        fields = '__all__'

class CoberturasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coberturas
        fields = '__all__'

class CuentasBancariasSerializer(serializers.ModelSerializer):
    persona_nombre = serializers.CharField(source='id_persona.nombre', read_only=True)
    
    class Meta:
        model = CuentasBancarias
        fields = '__all__'

# ... después de tus serializers existentes ...

class OcupantesSerializer(serializers.ModelSerializer):
    contrato_info = ContratoSerializer(source='id_contrato', read_only=True)
    
    class Meta:
        model = Ocupantes
        fields = '__all__'

class ReferenciasPersonalesSerializer(serializers.ModelSerializer):
    contrato_info = ContratoSerializer(source='id_contrato', read_only=True)
    
    class Meta:
        model = ReferenciasPersonales
        fields = '__all__'

class GarantiasSerializer(serializers.ModelSerializer):
    contrato_info = ContratoSerializer(source='id_contrato', read_only=True)
    domicilio_garantia_info = DomicilioSerializer(source='id_domicilio_garantia', read_only=True)
    
    class Meta:
        model = Garantias
        fields = '__all__'

class DatosEscrituraSerializer(serializers.ModelSerializer):
    garantia_info = GarantiasSerializer(source='id_garantia', read_only=True)
    
    class Meta:
        model = DatosEscritura
        fields = '__all__'

class PersonasInmuebleSerializer(serializers.ModelSerializer):
    contrato_info = ContratoSerializer(source='id_contrato', read_only=True)
    
    class Meta:
        model = PersonasInmueble
        fields = '__all__'

class ArrendadorAnteriorSerializer(serializers.ModelSerializer):
    contrato_info = ContratoSerializer(source='id_contrato', read_only=True)
    
    class Meta:
        model = ArrendadorAnterior
        fields = '__all__'

# ... después de tus serializers existentes ...

class RolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roles
        fields = '__all__'

class UsuariosInternosSerializer(serializers.ModelSerializer):
    rol_nombre = serializers.CharField(source='id_rol.nombre_rol', read_only=True)
    
    class Meta:
        model = UsuariosInternos
        fields = '__all__'
        extra_kwargs = {
            'password_hash': {'write_only': True}
        }