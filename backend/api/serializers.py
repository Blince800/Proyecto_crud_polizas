from rest_framework import serializers
from .models import *

class InmueblesUsosSerializer(serializers.ModelSerializer):
    class Meta:
        model = InmueblesUsos
        fields = '__all__'
class DomicilioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Domicilios
        fields = '__all__'

class CuentaBancariaSerializer(serializers.ModelSerializer):
    class Meta:
        model = CuentasBancarias 
        fields = '__all__'

class CoberturasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coberturas
        fields = '__all__'

class PersonaSerializer(serializers.ModelSerializer):
    id_domicilio = DomicilioSerializer(required=False, allow_null=True)
    
    class Meta:
        model = Personas
        fields = '__all__'
    
    def create(self, validated_data):
        domicilio_data = validated_data.pop('id_domicilio', None)
        domicilio_instance = None
        
        if domicilio_data:
            domicilio_serializer = DomicilioSerializer(data=domicilio_data)
            domicilio_serializer.is_valid(raise_exception=True)
            domicilio_instance = domicilio_serializer.save()
        
        if domicilio_instance:
            validated_data['id_domicilio'] = domicilio_instance

        return Personas.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        domicilio_data = validated_data.pop('id_domicilio', None)
        
        if domicilio_data and instance.id_domicilio:
            domicilio_serializer = DomicilioSerializer(
                instance=instance.id_domicilio, 
                data=domicilio_data, 
                partial=True
            )
            domicilio_serializer.is_valid(raise_exception=True)
            domicilio_serializer.save()
            
        return super().update(instance, validated_data)

class InmueblesSerializer(serializers.ModelSerializer):
    id_domicilio = DomicilioSerializer()
    usos_display = serializers.SerializerMethodField()
    usos_list = serializers.SerializerMethodField()

    class Meta:
        model = Inmuebles
        fields = '__all__'

    def get_usos_display(self, obj):
        #Obtener los usos como texto usando los campos booleanos del modelo
        return obj.get_usos_display()

    def get_usos_list(self, obj):
        #Obtener lista de usos usando los campos booleanos del modelo
        return obj.get_usos_list()

    def create(self, validated_data):
        domicilio_data = validated_data.pop('id_domicilio')
        
        # Crear domicilio
        domicilio_serializer = DomicilioSerializer(data=domicilio_data)
        domicilio_serializer.is_valid(raise_exception=True)
        domicilio_instance = domicilio_serializer.save()
        
        # Crear inmueble
        inmueble_instance = Inmuebles.objects.create(
            id_domicilio=domicilio_instance, 
            **validated_data
        )
        
        return inmueble_instance

    def update(self, instance, validated_data):
        domicilio_data = validated_data.pop('id_domicilio', None)
        
        # Actualizar domicilio si existe
        if domicilio_data and instance.id_domicilio:
            domicilio_serializer = DomicilioSerializer(
                instance=instance.id_domicilio, 
                data=domicilio_data, 
                partial=True
            )
            domicilio_serializer.is_valid(raise_exception=True)
            domicilio_serializer.save()
        
        #usar update
        return super().update(instance, validated_data)
class ContratoSerializer(serializers.ModelSerializer):
    arrendador_nombre = serializers.CharField(source='id_arrendador.nombre', read_only=True)
    arrendatario_nombre = serializers.CharField(source='id_arrendatario.nombre', read_only=True)
    obligado_solidario_nombre = serializers.CharField(source='id_obligado_solidario.nombre', read_only=True, allow_null=True)
    inmueble_direccion = serializers.CharField(source='id_inmueble.id_domicilio.calle', read_only=True)
    cobertura_tipo = serializers.CharField(source='id_cobertura.tipo_cobertura', read_only=True, allow_null=True)
    
    # Serializers anidados para lectura
    arrendador_detalle = PersonaSerializer(source='id_arrendador', read_only=True)
    arrendatario_detalle = PersonaSerializer(source='id_arrendatario', read_only=True)
    inmueble_detalle = InmueblesSerializer(source='id_inmueble', read_only=True)
    cobertura_detalle = CoberturasSerializer(source='id_cobertura', read_only=True)

    class Meta:
        model = Contratos
        fields = '__all__'

    def create(self, validated_data):
        
        #Crear contrato con IDs existentes (no crear nuevas personas/inmuebles)
        
        # Asegurar que los campos obligatorios existen
        required_fields = ['id_arrendador', 'id_arrendatario', 'id_inmueble']
        for field in required_fields:
            if field not in validated_data:
                raise serializers.ValidationError({field: 'Este campo es requerido'})
        
        return super().create(validated_data)

    def update(self, instance, validated_data):    
        
        return super().update(instance, validated_data)
    
    def validate(self, data):
        """
        Validación personalizada para el contrato
        """
        # Validar que fecha_termino sea posterior a fecha_inicio
        fecha_inicio = data.get('fecha_inicio', self.instance.fecha_inicio if self.instance else None)
        fecha_termino = data.get('fecha_termino', self.instance.fecha_termino if self.instance else None)
        
        if fecha_inicio and fecha_termino:
            if fecha_inicio >= fecha_termino:
                raise serializers.ValidationError({
                    "fecha_termino": "La fecha de término debe ser posterior a la fecha de inicio"
                })
        
        # Validar que al menos una parte pague la póliza
        pago_arrendador = data.get('pago_poliza_arrendador', 
                                 self.instance.pago_poliza_arrendador if self.instance else False)
        pago_arrendatario = data.get('pago_poliza_arrendatario', 
                                   self.instance.pago_poliza_arrendatario if self.instance else False)
        
        if not pago_arrendador and not pago_arrendatario:
            raise serializers.ValidationError({
                "pago_poliza": "Debe especificar quién paga la póliza (arrendador o arrendatario)"
            })
        
        return data
class CatalogosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Catalogos  # Usa el modelo Catalogos que definiste
        fields = '__all__'

class DocumentosLegalesSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentosLegales 
        fields = '__all__'

class InformacionLaboralSerializer(serializers.ModelSerializer):
    class Meta:
        model = InformacionLaboral
        fields = '__all__'

class InfoConyugalSerializer(serializers.ModelSerializer):
    class Meta:
        model = InfoConyugal
        fields = '__all__'

class OcupantesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ocupantes
        fields = '__all__'
class ReferenciasPersonalesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReferenciasPersonales
        fields = '__all__'

class GarantiasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Garantias
        fields = '__all__'

class DatosEscrituraSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatosEscritura
        fields = '__all__'

class PersonasInmuebleSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonasInmueble
        fields = '__all__'

class ArrendadorAnteriorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArrendadorAnterior
        fields = '__all__'

class RolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roles
        fields = '__all__'

class UsuariosInternosSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsuariosInternos
        fields = '__all__'