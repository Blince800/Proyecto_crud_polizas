from django.db import models

class Catalogos(models.Model):
    id_catalogo = models.AutoField(primary_key=True)
    tipo_catalogo = models.CharField(max_length=50)
    clave = models.CharField(max_length=20)
    valor = models.CharField(max_length=100)
    activo = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'catalogos'

class Domicilios(models.Model):
    id_domicilio = models.AutoField(primary_key=True)
    calle = models.CharField(max_length=100)
    no_exterior = models.CharField(max_length=10, null=True, blank=True)
    no_interior = models.CharField(max_length=10, null=True, blank=True)
    edificio = models.CharField(max_length=50, null=True, blank=True)
    cp = models.CharField(max_length=10)
    colonia = models.CharField(max_length=100)
    alcaldia_municipio = models.CharField(max_length=100)
    estado = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'domicilios'

class Personas(models.Model):
    TIPO_PERSONA_CHOICES = [
        ('FISICA', 'Física'),
        ('MORAL', 'Moral'),
    ]
    
    id_persona = models.AutoField(primary_key=True)
    tipo_persona = models.CharField(max_length=6, choices=TIPO_PERSONA_CHOICES)
    nombre = models.CharField(max_length=200)
    rfc = models.CharField(max_length=20, null=True, blank=True)
    telefono = models.CharField(max_length=20, null=True, blank=True)
    email = models.EmailField(max_length=100, null=True, blank=True)
    id_domicilio = models.ForeignKey(Domicilios, on_delete=models.SET_NULL, null=True, blank=True, db_column='id_domicilio')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'personas'

class DocumentosLegales(models.Model):
    TIPO_DOCUMENTO_CHOICES = [
        ('ACTA_CONSTITUTIVA', 'Acta Constitutiva'),
        ('PODER_LEGAL', 'Poder Legal'),
    ]
    
    id_documento = models.AutoField(primary_key=True)
    id_persona = models.ForeignKey(Personas, on_delete=models.CASCADE, db_column='id_persona')
    tipo_documento = models.CharField(max_length=20, choices=TIPO_DOCUMENTO_CHOICES)
    numero_documento = models.CharField(max_length=100, null=True, blank=True)
    fecha_documento = models.DateField(null=True, blank=True)
    nombre_notario = models.CharField(max_length=100, null=True, blank=True)
    numero_notaria = models.CharField(max_length=50, null=True, blank=True)
    ciudad_notaria = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'documentos_legales'

class InformacionLaboral(models.Model):
    id_info_laboral = models.AutoField(primary_key=True)
    id_persona = models.ForeignKey(Personas, on_delete=models.CASCADE, db_column='id_persona')
    ingresos_mensuales = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    ocupacion = models.CharField(max_length=100, null=True, blank=True)
    empresa = models.CharField(max_length=100, null=True, blank=True)
    antiguedad = models.CharField(max_length=50, null=True, blank=True)
    id_domicilio_laboral = models.ForeignKey(Domicilios, on_delete=models.SET_NULL, null=True, blank=True, related_name='domicilio_laboral', db_column='id_domicilio_laboral')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'informacion_laboral'

class Inmuebles(models.Model):
    id_inmueble = models.AutoField(primary_key=True)
    id_domicilio = models.ForeignKey(Domicilios, on_delete=models.CASCADE, db_column='id_domicilio')
    giro_negocio = models.CharField(max_length=100, null=True, blank=True)
    
    # Campos de uso del inmueble
    uso_habitacion = models.BooleanField(default=False)
    uso_oficina = models.BooleanField(default=False)
    uso_comercial = models.BooleanField(default=False)
    uso_bodega = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'inmuebles'

    def get_usos_display(self):
        usos = []
        if self.uso_habitacion:
            usos.append("Habitación")
        if self.uso_oficina:
            usos.append("Oficina")
        if self.uso_comercial:
            usos.append("Comercial")
        if self.uso_bodega:
            usos.append("Bodega")
        return ", ".join(usos)

class InmueblesUsos(models.Model):
    id_inmueble_uso = models.AutoField(primary_key=True)
    id_inmueble = models.ForeignKey(Inmuebles, on_delete=models.CASCADE, db_column='id_inmueble')
    id_uso_catalogo = models.ForeignKey(Catalogos, on_delete=models.CASCADE, db_column='id_uso_catalogo')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'inmuebles_usos'
        unique_together = ('id_inmueble', 'id_uso_catalogo')

class Coberturas(models.Model):
    id_cobertura = models.AutoField(primary_key=True)
    tipo_cobertura = models.CharField(max_length=50)
    monto_poliza = models.DecimalField(max_digits=12, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'coberturas'

class CuentasBancarias(models.Model):
    id_cuenta = models.AutoField(primary_key=True)
    id_persona = models.ForeignKey(Personas, on_delete=models.CASCADE, db_column='id_persona')
    banco = models.CharField(max_length=100)
    beneficiario = models.CharField(max_length=200)
    numero_cuenta = models.CharField(max_length=50)
    clabe = models.CharField(max_length=20, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'cuentas_bancarias'

class Contratos(models.Model):
    id_contrato = models.AutoField(primary_key=True)
    id_arrendador = models.ForeignKey(Personas, on_delete=models.CASCADE, related_name='contratos_arrendador', db_column='id_arrendador')
    id_arrendatario = models.ForeignKey(Personas, on_delete=models.CASCADE, related_name='contratos_arrendatario', db_column='id_arrendatario')
    id_obligado_solidario = models.ForeignKey(Personas, on_delete=models.SET_NULL, null=True, blank=True, related_name='contratos_obligado', db_column='id_obligado_solidario')
    id_inmueble = models.ForeignKey(Inmuebles, on_delete=models.CASCADE, db_column='id_inmueble')
    id_cobertura = models.ForeignKey(Coberturas, on_delete=models.SET_NULL, null=True, blank=True, db_column='id_cobertura')
    
    # Información del contrato
    fecha_inicio = models.DateField()
    fecha_termino = models.DateField()
    renta_mensual = models.DecimalField(max_digits=12, decimal_places=2)
    iva_incluido = models.BooleanField(default=False)
    mas_iva = models.BooleanField(default=False)
    mantenimiento_incluido = models.BooleanField(default=False)
    mantenimiento_adicional = models.BooleanField(default=False)
    monto_adicional = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    deposito_garantia = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    lugares_estacionamiento = models.IntegerField(null=True, blank=True)
    mascotas = models.TextField(null=True, blank=True)
    inventario = models.TextField(null=True, blank=True)
    servicios = models.TextField(null=True, blank=True)
    
    # Pago de póliza
    pago_poliza_arrendador = models.BooleanField(default=False)
    pago_poliza_arrendatario = models.BooleanField(default=False)
    porcentaje_poliza = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    
    # Términos y condiciones
    acepto_terminos = models.BooleanField(default=False)
    motivos_cambio = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'contratos'

class Ocupantes(models.Model):
    id_ocupante = models.AutoField(primary_key=True)
    id_contrato = models.ForeignKey(Contratos, on_delete=models.CASCADE, db_column='id_contrato')
    nombre = models.CharField(max_length=200)
    parentesco = models.CharField(max_length=100, null=True, blank=True)
    motivo_cambio = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'ocupantes'

class ReferenciasPersonales(models.Model):
    TIPO_REFERENCIA_CHOICES = [
        ('PERSONAL', 'Personal'),
        ('LABORAL', 'Laboral'),
        ('ARRENDADOR_ANTERIOR', 'Arrendador Anterior'),
    ]
    
    id_referencia = models.AutoField(primary_key=True)
    id_contrato = models.ForeignKey(Contratos, on_delete=models.CASCADE, db_column='id_contrato')
    tipo_referencia = models.CharField(max_length=20, choices=TIPO_REFERENCIA_CHOICES)
    nombre = models.CharField(max_length=200)
    telefono = models.CharField(max_length=20, null=True, blank=True)
    email = models.EmailField(max_length=100, null=True, blank=True)
    relacion = models.CharField(max_length=100, null=True, blank=True)
    domicilio = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'referencias_personales'

class Garantias(models.Model):
    id_garantia = models.AutoField(primary_key=True)
    id_contrato = models.ForeignKey(Contratos, on_delete=models.CASCADE, db_column='id_contrato')
    id_domicilio_garantia = models.ForeignKey(Domicilios, on_delete=models.CASCADE, db_column='id_domicilio_garantia')
    numero_escritura = models.CharField(max_length=100, null=True, blank=True)
    fecha_escritura = models.DateField(null=True, blank=True)
    nombre_notario_escritura = models.CharField(max_length=100, null=True, blank=True)
    numero_notaria_escritura = models.CharField(max_length=50, null=True, blank=True)
    ciudad_escritura = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'garantias'

class DatosEscritura(models.Model):
    id_escritura = models.AutoField(primary_key=True)
    id_garantia = models.ForeignKey(Garantias, on_delete=models.CASCADE, db_column='id_garantia')
    numero_escritura = models.CharField(max_length=100, null=True, blank=True)
    fecha_escritura = models.DateField(null=True, blank=True)
    nombre_notario = models.CharField(max_length=100, null=True, blank=True)
    numero_notaria = models.CharField(max_length=50, null=True, blank=True)
    ciudad_escritura = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'datos_escritura'

class InfoConyugal(models.Model):
    id_info_conyugal = models.AutoField(primary_key=True)
    id_persona = models.ForeignKey(Personas, on_delete=models.CASCADE, db_column='id_persona')
    nombre_conyuge = models.CharField(max_length=200, null=True, blank=True)
    regimen_conyugal = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'info_conyugal'

class InfoConyugalArrendatario(models.Model):
    id_info_conyugal = models.AutoField(primary_key=True)
    id_persona = models.ForeignKey(Personas, on_delete=models.CASCADE, related_name='info_conyugal_arrendatario', db_column='id_persona')
    nombre_conyuge = models.CharField(max_length=200, null=True, blank=True)
    regimen_conyugal = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'info_conyugal_arrendatario'

class PersonasInmueble(models.Model):
    id_persona_inmueble = models.AutoField(primary_key=True)
    id_contrato = models.ForeignKey(Contratos, on_delete=models.CASCADE, db_column='id_contrato')
    nombre = models.CharField(max_length=200)
    parentesco = models.CharField(max_length=100, null=True, blank=True)
    tipo = models.CharField(max_length=50, default='OCUPANTE')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'personas_inmueble'

class ArrendadorAnterior(models.Model):
    id_arrendador_anterior = models.AutoField(primary_key=True)
    id_contrato = models.ForeignKey(Contratos, on_delete=models.CASCADE, db_column='id_contrato')
    nombre = models.CharField(max_length=200)
    telefono = models.CharField(max_length=20, null=True, blank=True)
    email = models.EmailField(max_length=100, null=True, blank=True)
    domicilio = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'arrendador_anterior'

class Roles(models.Model):
    id_rol = models.AutoField(primary_key=True)
    nombre_rol = models.CharField(max_length=50, unique=True)
    descripcion = models.CharField(max_length=255, null=True, blank=True)
    permisos_json = models.JSONField(null=True, blank=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    activo = models.BooleanField(default=True)

    class Meta:
        db_table = 'roles'

class UsuariosInternos(models.Model):
    id_usuario_interno = models.AutoField(primary_key=True)
    id_rol = models.ForeignKey(Roles, on_delete=models.CASCADE, db_column='id_rol')
    email = models.EmailField(unique=True)
    password_hash = models.CharField(max_length=255)
    nombre_completo = models.CharField(max_length=255)
    activo = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    ultimo_login = models.DateTimeField(null=True, blank=True)
    fecha_bloqueo = models.DateTimeField(null=True, blank=True)
    intentos_fallidos = models.IntegerField(default=0)

    class Meta:
        db_table = 'usuarios_internos'