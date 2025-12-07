import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 

const API_BASE_URL = 'http://localhost:8000/api/';

function ContratoCreacion() {
  const [formData, setFormData] = useState({

    //Datos Arrendador
    nombreArrendador: '',
    tipoArrendador: '',
    calleArrendador: '',
    noExteriorArrendador: '',
    edificioArrendador: '',
    noInteriorArrendador: '',
    cpArrendador: '',
    coloniaArrendador: '',
    alcaldiaArrendador: '',
    estadoArrendador: '',
    rfcArrendador: '',
    telefonoArrendador: '',
    emailArrendador: '',

    //Si el arrendador es persona moral
    actacarrendador: '',
    fechaActaArrendador: '',
    poderLegalArrendador: '',
    fechaPoderArrendador: '',
    nombreNotarioArrendador: '',
    numeroNotariaArrendador: '',
    ciudadNotariaArrendador: '',


    //Cuenta Bancaria
    banco: '',
    beneficiario: '',
    cuentaBancaria: '',
    clabe: '',
    
    //Tipo de Cobertura
    tipoCobertura: '',
    montoPoliza: '',
    
    //Domicilio Inmueble
    calleInmueble: '',
    noExteriorInmueble: '',
    edificioInmueble: '',
    noInteriorInmueble: '',
    cpInmueble: '',
    coloniaInmueble: '',
    alcaldiaInmueble: '',
    estadoInmueble: '',
    
    //Uso del Inmueble
    usoHabitacion: false,
    usoOficina: false,
    usoComercial: false,
    usoBodega: false,
    giroNegocio: '',
    
    //Condiciones del Arrendamiento
    rentaMensual: '',
    ivaOption: '', 
    mantenimientoIncluido: false,
    mantenimientoAdicional: false,
    montoAdicional: '',
    fechaInicio: '',
    fechaTermino: '',
    depositoGarantia: '',
    lugaresEstacionamiento: '',
    mascotas: '',
    inventario: '',
    servicios: '',
    pagoPolizaArrendador: false,
    pagoPolizaArrendatario: false,
    porcentajePoliza: '',
    
    //Solicitud Arrendatario
    nombreArrendatario: '',
    tipoArrendatario: '',
    representanteLegal: '',
    actaConstitutiva: '',
    fechaActa: '',
    poderLegal: '',
    fechaPoder: '',
    nombreNotario: '',
    numeroNotaria: '',
    ciudadNotaria: '',
    
    //Domicilio Arrendatario
    calleArrendatario: '',
    noExteriorArrendatario: '',
    edificioArrendatario: '',
    noInteriorArrendatario: '',
    cpArrendatario: '',
    coloniaArrendatario: '',
    alcaldiaArrendatario: '',
    estadoArrendatario: '',
    rfcArrendatario: '',
    telefonoArrendatario: '',
    emailArrendatario: '',
    nombreConyuge: '',
    
    //Información Laboral
    ingresosMensuales: '',
    ocupacion: '',
    empresa: '',
    antiguedad: '',
    
    //Domicilio Laboral
    calleLaboral: '',
    noExteriorLaboral: '',
    edificioLaboral: '',
    noInteriorLaboral: '',
    cpLaboral: '',
    coloniaLaboral: '',
    alcaldiaLaboral: '',
    estadoLaboral: '',
    
    //Personas que ocuparán el inmueble
    personasInmueble: '',
    personasParentesco: '',
    personas2Inmueble: '',
    personas2Parentesco: '',
    personas3Inmueble: '',
    personas3Parentesco: '',
    motivosCambio: '',
    
    //Referencias Personales
    ref1Nombre: '',
    ref1Telefono: '',
    ref1Mail: '',
    ref1Relacion: '',
    ref1Domicilio: '',
    
    ref2Nombre: '',
    ref2Telefono: '',
    ref2Mail: '',
    ref2Relacion: '',
    ref2Domicilio: '',
    
    ref3Nombre: '',
    ref3Telefono: '',
    ref3Mail: '',
    ref3Relacion: '',
    ref3Domicilio: '',
    
    //Arrendador Anterior
    arrendadorAnteriorNombre: '',
    arrendadorAnteriorTelefono: '',
    arrendadorAnteriorMail: '',
    arrendadorAnteriorDomicilio: '',
    
    // Obligado Solidario
    obligadoNombre: '',
    obligadoRepresentante: '',
    obligadoActa: '',
    obligadoFechaActa: '',
    obligadoPoder: '',
    obligadoFechaPoder: '',
    obligadoNotario: '',
    obligadoNumeroNotaria: '',
    obligadoCiudadNotaria: '',
    
    // Domicilio Obligado
    calleObligado: '',
    noExteriorObligado: '',
    edificioObligado: '',
    noInteriorObligado: '',
    cpObligado: '',
    coloniaObligado: '',
    alcaldiaObligado: '',
    estadoObligado: '',
    rfcObligado: '',
    telefonoObligado: '',
    emailObligado: '',
    nombreConyugeObligado: '',
    regimenConyugal: '',
    
    // Inmueble en Garantía
    calleGarantia: '',
    noExteriorGarantia: '',
    edificioGarantia: '',
    noInteriorGarantia: '',
    cpGarantia: '',
    coloniaGarantia: '',
    alcaldiaGarantia: '',
    estadoGarantia: '',
    
    // Datos de Escritura
    noEscritura: '',
    fechaEscritura: '',
    nombreNotarioEscritura: '',
    numeroNotariaEscritura: '',
    ciudadEscritura: '',
    
    // Acepto Términos
    aceptoTerminos: false,

    tipoObligado: '',
    regimenConyugalArrendatario: '',
    regimenConyugalObligado: '',
    tipoGarantia: 'OBLIGADO',

    // Nuevos campos para control de visibilidad
    mostrarDocumentosArrendador: false,
    mostrarDocumentosArrendatario: false,
    mostrarObligadoSolidario: false,
    mostrarInmuebleGarantia: false,
  
  })

  const navigate = useNavigate(); 
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
      
    const newFormData = {
        ...formData,
        [name]: type === 'checkbox' ? checked : value
    };
      
    // Lógica condicional para visibilidad
    // 1. Control para arrendador persona moral
    if (name === 'tipoArrendador') {
        newFormData.mostrarDocumentosArrendador = (value === 'MORAL');
        if (value === 'FISICA') {
            // Limpiar campos de persona moral si cambia a física
            newFormData.actacarrendador = '';
            newFormData.fechaActaArrendador = '';
            newFormData.poderLegalArrendador = '';
            newFormData.fechaPoderArrendador = '';
            newFormData.nombreNotarioArrendador = '';
            newFormData.numeroNotariaArrendador = '';
            newFormData.ciudadNotariaArrendador = '';
        }
    }
    
    // 2. Control para arrendatario persona moral
    if (name === 'tipoArrendatario') {
        newFormData.mostrarDocumentosArrendatario = (value === 'MORAL');
        if (value === 'FISICA') {
            // Limpiar campos de persona moral si cambia a física
            newFormData.representanteLegal = '';
            newFormData.actaConstitutiva = '';
            newFormData.fechaActa = '';
            newFormData.poderLegal = '';
            newFormData.fechaPoder = '';
            newFormData.nombreNotario = '';
            newFormData.numeroNotaria = '';
            newFormData.ciudadNotaria = '';
        }
    }

      // 3. Control para tipo de garantía
      if (name === 'tipoGarantia') {
          newFormData.mostrarObligadoSolidario = (value === 'OBLIGADO' || value === 'AMBAS');
          newFormData.mostrarInmuebleGarantia = (value === 'INMUEBLE' || value === 'AMBAS');
          
          // Limpiar campos cuando no corresponden
      if (value === 'OBLIGADO') {
          // Limpiar solo campos de inmueble en garantía
          newFormData.calleGarantia = '';
          newFormData.noExteriorGarantia = '';
          newFormData.edificioGarantia = '';
          newFormData.noInteriorGarantia = '';
          newFormData.cpGarantia = '';
          newFormData.coloniaGarantia = '';
          newFormData.alcaldiaGarantia = '';
          newFormData.estadoGarantia = '';
          newFormData.noEscritura = '';
          newFormData.fechaEscritura = '';
          newFormData.nombreNotarioEscritura = '';
          newFormData.numeroNotariaEscritura = '';
          newFormData.ciudadEscritura = '';
      } else if (value === 'INMUEBLE') {
          // Limpiar solo campos de obligado solidario
          newFormData.obligadoNombre = '';
          newFormData.tipoObligado = '';
          newFormData.rfcObligado = '';
          newFormData.obligadoRepresentante = '';
          newFormData.obligadoActa = '';
          newFormData.obligadoFechaActa = '';
          newFormData.obligadoPoder = '';
          newFormData.obligadoFechaPoder = '';
          newFormData.obligadoNotario = '';
          newFormData.obligadoNumeroNotaria = '';
          newFormData.obligadoCiudadNotaria = '';
          newFormData.calleObligado = '';
          newFormData.noExteriorObligado = '';
          newFormData.edificioObligado = '';
          newFormData.noInteriorObligado = '';
          newFormData.cpObligado = '';
          newFormData.coloniaObligado = '';
          newFormData.alcaldiaObligado = '';
          newFormData.estadoObligado = '';
          newFormData.telefonoObligado = '';
          newFormData.emailObligado = '';
          newFormData.nombreConyugeObligado = '';
          newFormData.regimenConyugalObligado = '';
      } else if (value === 'AMBAS') {
          // No limpiar nada - mostrar ambas secciones
          // El usuario puede llenar ambas
      } else {
          // Si es NINGUNA (por si acaso), limpiar ambos
          newFormData.mostrarObligadoSolidario = false;
          newFormData.mostrarInmuebleGarantia = false;
          // Limpiar todos los campos de garantías
          // ... (agregar limpieza de todos los campos de ambas secciones)
      }
}

    
    setFormData(newFormData);
  };


const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar términos
    if (!formData.aceptoTerminos) {
        alert('Debe leer y aceptar los términos y condiciones.');
        return;
    }
    // Validación condicional para garantías
    if (formData.tipoGarantia === 'OBLIGADO' || formData.tipoGarantia === 'AMBAS') {
        if (!formData.obligadoNombre.trim()) {
            alert('Debe proporcionar el nombre del obligado solidario.');
            return;
        }
        // Agrega más validaciones específicas para obligado solidario...
    }

    if (formData.tipoGarantia === 'INMUEBLE' || formData.tipoGarantia === 'AMBAS') {
        if (!formData.calleGarantia.trim()) {
            alert('Debe proporcionar la calle del inmueble en garantía.');
            return;
        }
    }
    
// CONSTRUCCIÓN DE DATA ANIDADA (dataParaDjango)
    
const dataParaDjango = {
  
  // DATOS PRINCIPALES

  arrendador: { 
    nombre: formData.nombreArrendador,
    tipo_persona: formData.tipoArrendador, 
    rfc: formData.rfcArrendador,
    telefono: formData.telefonoArrendador,
    email: formData.emailArrendador,
    id_domicilio: { 
      calle: formData.calleArrendador,
      no_exterior: formData.noExteriorArrendador,
      no_interior: formData.noInteriorArrendador,
      edificio: formData.edificioArrendador,
      cp: formData.cpArrendador,
      colonia: formData.coloniaArrendador,
      alcaldia_municipio: formData.alcaldiaArrendador,
      estado: formData.estadoArrendador,
    }
  },
  
  arrendatario: { 
    nombre: formData.nombreArrendatario,
    tipo_persona: formData.tipoArrendatario, 
    rfc: formData.rfcArrendatario,
    telefono: formData.telefonoArrendatario,
    email: formData.emailArrendatario,
    id_domicilio: { 
      calle: formData.calleArrendatario,
      no_exterior: formData.noExteriorArrendatario,
      no_interior: formData.noInteriorArrendatario,
      edificio: formData.edificioArrendatario,
      cp: formData.cpArrendatario,
      colonia: formData.coloniaArrendatario,
      alcaldia_municipio: formData.alcaldiaArrendatario,
      estado: formData.estadoArrendatario,
    }
  },
  
  inmueble: { 
  id_domicilio: {
    calle: formData.calleInmueble,
    no_exterior: formData.noExteriorInmueble,
    no_interior: formData.noInteriorInmueble,
    edificio: formData.edificioInmueble,
    cp: formData.cpInmueble,
    colonia: formData.coloniaInmueble,
    alcaldia_municipio: formData.alcaldiaInmueble,
    estado: formData.estadoInmueble,
  },
  giro_negocio: formData.giroNegocio || null,

  usos: [
    formData.usoHabitacion ? 'HABITACION' : null,
    formData.usoOficina ? 'OFICINA' : null,
    formData.usoComercial ? 'COMERCIAL' : null,
    formData.usoBodega ? 'BODEGA' : null,
    // Si el usuario escribió algo en "giroNegocio" y no seleccionó nada más, 
    // o queremos explícitamente marcarlo como OTRO:
    (formData.giroNegocio && formData.giroNegocio.trim() !== '') ? 'OTRO' : null
  ].filter(Boolean),
},

  cuenta_bancaria: { 
    banco: formData.banco,
    beneficiario: formData.beneficiario,
    numero_cuenta: formData.cuentaBancaria,
    clabe: formData.clabe,
  },

  cobertura: { 
    tipo_cobertura: formData.tipoCobertura,
    monto_poliza: parseFloat(formData.montoPoliza) || 0,
  },
  
  // DOCUMENTOS LEGALES DEL ARRENDADOR
  
  documentos_arrendador: formData.mostrarDocumentosArrendador ? [
    {
      tipo_documento: 'ACTA_CONSTITUTIVA',
      numero_documento: formData.actacarrendador,
      fecha_documento: formData.fechaActaArrendador,
      nombre_notario: formData.nombreNotarioArrendador,
      numero_notaria: formData.numeroNotariaArrendador,
      ciudad_notaria: formData.ciudadNotariaArrendador
    },
    {
      tipo_documento: 'PODER_LEGAL',
      numero_documento: formData.poderLegalArrendador,
      fecha_documento: formData.fechaPoderArrendador,
      nombre_notario: formData.nombreNotarioArrendador, // Mismo notario
      numero_notaria: formData.numeroNotariaArrendador, // Misma notaría
      ciudad_notaria: formData.ciudadNotariaArrendador  // Misma ciudad
    }
  ].filter(doc => doc.numero_documento?.trim()) : [],
  
  // DOCUMENTOS LEGALES DEL ARRENDATARIO

  documentos_arrendatario: formData.mostrarDocumentosArrendatario ? [
    {
      tipo_documento: 'ACTA_CONSTITUTIVA',
      numero_documento: formData.actaConstitutiva,
      fecha_documento: formData.fechaActa,
      nombre_notario: formData.nombreNotario,
      numero_notaria: formData.numeroNotaria,
      ciudad_notaria: formData.ciudadNotaria,
      representante_legal: formData.representanteLegal
    },
    {
      tipo_documento: 'PODER_LEGAL',
      numero_documento: formData.poderLegal,
      fecha_documento: formData.fechaPoder,
      nombre_notario: formData.nombreNotario, // Mismo notario
      numero_notaria: formData.numeroNotaria, // Misma notaría  
      ciudad_notaria: formData.ciudadNotaria,  // Misma ciudad
      representante_legal: formData.representanteLegal
    }
  ].filter(doc => doc.numero_documento && doc.numero_documento.trim() !== '') : [],
  
  // REPRESENTANTE LEGAL DEL ARRENDATARIO
  
  informacion_laboral: {
    ingresos_mensuales: parseFloat(formData.ingresosMensuales) || 0,
    ocupacion: formData.ocupacion,
    empresa: formData.empresa,
    antiguedad: formData.antiguedad,
    domicilio_laboral: {
      calle: formData.calleLaboral,
      no_exterior: formData.noExteriorLaboral,
      no_interior: formData.noInteriorLaboral,
      edificio: formData.edificioLaboral,
      cp: formData.cpLaboral,
      colonia: formData.coloniaLaboral,
      alcaldia_municipio: formData.alcaldiaLaboral,
      estado: formData.estadoLaboral
    }
  },
  
  // OCUPANTES DEL INMUEBLE
  
  ocupantes: [
    {
      nombre: formData.personasInmueble,
      parentesco: formData.personasParentesco,
      motivo_cambio: formData.motivosCambio
    },
    {
      nombre: formData.personas2Inmueble,
      parentesco: formData.personas2Parentesco,
      motivo_cambio: formData.motivosCambio
    },
    {
      nombre: formData.personas3Inmueble, 
      parentesco: formData.personas3Parentesco,
      motivo_cambio: formData.motivosCambio
    }
  ].filter(ocupante => ocupante.nombre?.trim()),
  
  // REFERENCIAS PERSONALES (4 tipos)

  referencias: [
    // Referencia Personal 1
    {
      tipo_referencia: 'PERSONAL',
      nombre: formData.ref1Nombre,
      telefono: formData.ref1Telefono,
      email: formData.ref1Mail,
      relacion: formData.ref1Relacion,
      domicilio: formData.ref1Domicilio
    },
    // Referencia Personal 2
    {
      tipo_referencia: 'PERSONAL', 
      nombre: formData.ref2Nombre,
      telefono: formData.ref2Telefono,
      email: formData.ref2Mail,
      relacion: formData.ref2Relacion,
      domicilio: formData.ref2Domicilio
    },
    // Referencia Personal 3
    {
      tipo_referencia: 'PERSONAL',
      nombre: formData.ref3Nombre,
      telefono: formData.ref3Telefono,
      email: formData.ref3Mail, 
      relacion: formData.ref3Relacion,
      domicilio: formData.ref3Domicilio
    },
    // Arrendador Anterior
    {
      tipo_referencia: 'ARRENDADOR_ANTERIOR',
      nombre: formData.arrendadorAnteriorNombre,
      telefono: formData.arrendadorAnteriorTelefono,
      email: formData.arrendadorAnteriorMail,
      relacion: 'ARRENDADOR_ANTERIOR',
      domicilio: formData.arrendadorAnteriorDomicilio
    }
  ].filter(ref => ref.nombre?.trim()),
  
  // OBLIGADO SOLIDARIO
  
  obligado_solidario: formData.mostrarObligadoSolidario ? {
    persona: {
      nombre: formData.obligadoNombre,
      tipo_persona: formData.tipoObligado || 'FISICA',
      rfc: formData.rfcObligado,
      telefono: formData.telefonoObligado,
      email: formData.emailObligado,
      domicilio: {
        calle: formData.calleObligado,
        no_exterior: formData.noExteriorObligado,
        no_interior: formData.noInteriorObligado,
        edificio: formData.edificioObligado,
        cp: formData.cpObligado,
        colonia: formData.coloniaObligado,
        alcaldia_municipio: formData.alcaldiaObligado,
        estado: formData.estadoObligado
      }
    },
    documentos: [
      {
        tipo_documento: 'ACTA_CONSTITUTIVA',
        numero_documento: formData.obligadoActa,
        fecha_documento: formData.obligadoFechaActa,
        nombre_notario: formData.obligadoNotario,
        numero_notaria: formData.obligadoNumeroNotaria,
        ciudad_notaria: formData.obligadoCiudadNotaria,
        representante_legal: formData.obligadoRepresentante
      },
      {
        tipo_documento: 'PODER_LEGAL',
        numero_documento: formData.obligadoPoder,
        fecha_documento: formData.obligadoFechaPoder,
        nombre_notario: formData.obligadoNotario, // Mismo notario
        numero_notaria: formData.obligadoNumeroNotaria, // Misma notaría
        ciudad_notaria: formData.obligadoCiudadNotaria, // Misma ciudad
        representante_legal: formData.obligadoRepresentante
      }
    ].filter(doc => doc.numero_documento && doc.numero_documento.trim() !== ''),
  } : null,
  
  // INFORMACIÓN CONYUGAL (Arrendatario y Obligado)
  
  info_conyugal: [
    {
      id_persona: 'ARRENDATARIO',
      nombre_conyuge: formData.nombreConyuge,
      regimen_conyugal: formData.regimenConyugalArrendatario
    },
    ...(formData.mostrarObligadoSolidario ? [{
      id_persona: 'OBLIGADO',  
      nombre_conyuge: formData.nombreConyugeObligado,
      regimen_conyugal: formData.regimenConyugalObligado
    }] : [])
  ].filter(conyugal => conyugal.nombre_conyuge && conyugal.nombre_conyuge.trim() !== ''),
  
  // GARANTÍAS INMOBILIARIAS
  
  garantias: formData.mostrarInmuebleGarantia ? [
    {
      domicilio_garantia: {
        calle: formData.calleGarantia,
        no_exterior: formData.noExteriorGarantia,
        no_interior: formData.noInteriorGarantia,
        edificio: formData.edificioGarantia,
        cp: formData.cpGarantia,
        colonia: formData.coloniaGarantia,
        alcaldia_municipio: formData.alcaldiaGarantia,
        estado: formData.estadoGarantia
      },
      datos_escritura: {
        numero_escritura: formData.noEscritura,
        fecha_escritura: formData.fechaEscritura,
        nombre_notario: formData.nombreNotarioEscritura,
        numero_notaria: formData.numeroNotariaEscritura,
        ciudad_escritura: formData.ciudadEscritura
      }
    }
  ].filter(garantia => garantia.domicilio_garantia.calle && garantia.domicilio_garantia.calle.trim() !== ''): [],
  
  // CONDICIONES ADICIONALES DEL CONTRATO (CON IVA CORREGIDO)
  
  condiciones_contrato: {
    renta_mensual: parseFloat(formData.rentaMensual) || 0,
    mas_iva: formData.ivaOption === 'MAS_IVA',
    iva_incluido: formData.ivaOption === 'IVA_INCLUIDO',
    mantenimiento_incluido: formData.mantenimientoIncluido,
    mantenimiento_adicional: formData.mantenimientoAdicional,
    monto_adicional: parseFloat(formData.montoAdicional) || 0,
    fecha_inicio: formData.fechaInicio,
    fecha_termino: formData.fechaTermino,
    deposito_garantia: parseFloat(formData.depositoGarantia) || 0,
    lugares_estacionamiento: parseInt(formData.lugaresEstacionamiento) || 0,
    mascotas: formData.mascotas,
    inventario: formData.inventario,
    servicios: formData.servicios,
    pago_poliza_arrendador: formData.pagoPolizaArrendador,
    pago_poliza_arrendatario: formData.pagoPolizaArrendatario,
    porcentaje_poliza: formData.porcentajePoliza,
    motivos_cambio: formData.motivosCambio
  }
};
    // ... (Fin de dataParaDjango) ..
    
    // ENVÍO DE LA PETICIÓN POST
    try {
        // Petición POST sin los headers de Authorization
        const response = await axios.post(
            `${API_BASE_URL}contratos/`, 
            dataParaDjango
        );

        console.log("Respuesta de Django:", response.data);
        alert('Contrato creado con éxito! (¡Prueba de automatización exitosa!)');
        // navigate('/listado'); // Comenta esto si la automatización no requiere navegación

    } catch (error) {
        // Manejo de errores de validación de Django
        console.error("Error al crear el contrato:", error.response ? error.response.data : error.message);
        const errorMessage = error.response 
            ? JSON.stringify(error.response.data, null, 2) 
            : error.message;
        alert(`Error de validación en Django:\n${errorMessage}`);
    }
};

      return (
    <div className="formulario-container">
      <div className="app">
        <form onSubmit={handleSubmit} className="formulario">
          <h1>Formulario de Arrendamiento (Creación)</h1>

          {/* SECCIÓN 1: DATOS DEL ARRENDADOR */}
          <section className="seccion">
            <h2>DATOS DEL ARRENDADOR</h2>
              <div className="grid-form">
                <input type="text" name="nombreArrendador" title='Ingrese nombre del arrendador' placeholder="Nombre del arrendador" value={formData.nombreArrendador} onChange={handleChange} required />
                <input type="text" name="rfcArrendador" title='Ingrese el RFC del arrendador' placeholder="RFC" value={formData.rfcArrendador} onChange={handleChange} required />
                <input type="tel" name="telefonoArrendador" title='Ingrese el teléfono del arrendador' placeholder="Teléfono" value={formData.telefonoArrendador} onChange={handleChange} required />
                <input type="email" name="emailArrendador" title=' Ingrese el correo del arrendador' placeholder="E-mail" value={formData.emailArrendador} onChange={handleChange} required />
              </div>
                    
              {/* DOMICILIO DEL ARRENDADOR */}
              <div className="grid-form">
                <input type="text" name="calleArrendador" title='Ingrese la calle del arrendador' placeholder="Calle" value={formData.calleArrendador} onChange={handleChange} required />
                <input type="text" name="noExteriorArrendador" title='Ingrese el número exterior del arrendador' placeholder="No. Ext." value={formData.noExteriorArrendador} onChange={handleChange} required />
                <input type="text" name="edificioArrendador" title='Ingrese el Edificio del arrendador' placeholder="Edificio/Torre" value={formData.edificioArrendador} onChange={handleChange} />
                <input type="text" name="noInteriorArrendador" title='Ingrese el número interior del arrendador' placeholder="No. Int." value={formData.noInteriorArrendador} onChange={handleChange} />
                <input type="text" name="cpArrendador" title='Ingrese el código postal de arrendador' placeholder="C.P." value={formData.cpArrendador} onChange={handleChange} required />
                <input type="text" name="coloniaArrendador" title='Ingrese la colonia del arrendador' placeholder="Colonia" value={formData.coloniaArrendador} onChange={handleChange} required />
                <input type="text" name="alcaldiaArrendador" title='Ingrese la alcaldía del arrendador' placeholder="Alcaldía/Municipio" value={formData.alcaldiaArrendador} onChange={handleChange} required />
                <input type="text" name="estadoArrendador" title='Ingrese el estado del arrendador' placeholder="Estado" value={formData.estadoArrendador} onChange={handleChange} required />
              </div>
                    
              {/* TIPO DE PERSONA */}
              <div className="radio-group">
                <label>
                  <input type="radio" name="tipoArrendador" value="FISICA" title='¿Qúe tipo de persona és?' checked={formData.tipoArrendador === 'FISICA'} onChange={handleChange} required/>
                    PERSONA FÍSICA
                </label>
                <label>
                <input type="radio" name="tipoArrendador" value="MORAL" title='¿Qúe tipo de persona és?'checked={formData.tipoArrendador === 'MORAL'} onChange={handleChange} />
                    PERSONA MORAL
                </label>
              </div>
                    
              {/* DOCUMENTOS PERSONA MORAL (CONDICIONAL) */}
              {formData.mostrarDocumentosArrendador && (
                <>
                  <h2>SI EL ARRENDADOR ES PERSONA MORAL PROPORCIONAR</h2>
                    <div className="grid-form">
                      <input type="text" name='actacarrendador' placeholder='Acta constitutiva' title='' value={formData.actacarrendador} onChange={handleChange} required />
                      <input type="date" name='fechaActaArrendador' title='' value={formData.fechaActaArrendador} onChange={handleChange} required />
                      <input type="text" name='poderLegalArrendador' title='' placeholder='Poder del representante' value={formData.poderLegalArrendador} onChange={handleChange} required />
                      <input type="date" name='fechaPoderArrendador' title='' value={formData.fechaPoderArrendador} onChange={handleChange} required />
                      <input type="text" name='nombreNotarioArrendador' title='' placeholder='Nombre del notario' value={formData.nombreNotarioArrendador} onChange={handleChange} required />
                      <input type="text" name='numeroNotariaArrendador' title='' placeholder='Número de notaria' value={formData.numeroNotariaArrendador} onChange={handleChange} required />
                      <input type="text" name='ciudadNotariaArrendador' title='' placeholder='Ciudad de notaria' value={formData.ciudadNotariaArrendador} onChange={handleChange} required />
                    </div>
                </>
              )}
         </section>

          {/* SECCIÓN 2: CUENTA BANCARIA */}
          <section className="seccion">
            <h2>CUENTA BANCARIA PARA EL PAGO DE LA RENTA</h2>
              <div className="grid-form">
                <input type="text" name="banco" placeholder="Nombre del banco" title='Ingrese el banco del arrendador' value={formData.banco} onChange={handleChange} required />
                <input type="text" name="beneficiario" placeholder="Beneficiario" title='Ingrese el titular de la cuenta' value={formData.beneficiario} onChange={handleChange} required />
                <input type="text" name="cuentaBancaria" placeholder="Número de Cuenta" title='Ingrese el número de cuenta del arrendador' value={formData.cuentaBancaria} onChange={handleChange} required />
                <input type="text" name="clabe" placeholder="Clabe interbancaria" title='Ingrese clabe interbancaria del arrendador' value={formData.clabe} onChange={handleChange} required />
              </div>
           </section>

          {/* SECCIÓN 3: TIPO DE COBERTURA */}
          <section className="seccion">
            <h2>TIPO DE COBERTURA</h2>
              <div className="radio-group">
                <label>
                  <input type="radio" name="tipoCobertura" value="BASICA" title='Indique la cobertura de su preferencia' checked={formData.tipoCobertura === 'BASICA'} onChange={handleChange} required />
                    BÁSICA
                </label>
                <label>
                  <input type="radio" name="tipoCobertura" value="MEDIA" title='Indique la cobertura de su preferencia' checked={formData.tipoCobertura === 'MEDIA'} onChange={handleChange} />
                    MEDIA
                </label>
                <label>
                  <input type="radio" name="tipoCobertura" value="MAXIMA" title='Indique la cobertura de su preferencia' checked={formData.tipoCobertura === 'MAXIMA'} onChange={handleChange} />
                   MÁXIMA
                </label>
              </div>
              <div className="grid-form">
                <input type="number" name="montoPoliza" placeholder="Monto de la poliza" title='Ingrese el monto de la poliza' value={formData.montoPoliza} onChange={handleChange} required />
              </div>
          </section>

          {/* SECCIÓN 4: DATOS DEL INMUEBLE */}
          <section className="seccion">
            <h2>DATOS DEL INMUEBLE EN RENTA</h2>
              <div className="grid-form">
                <input type="text" name="calleInmueble" placeholder="Calle" title='Ingrese la calle del inmueble' value={formData.calleInmueble} onChange={handleChange} required />
                <input type="text" name="noExteriorInmueble" placeholder="No. Ext." title='ingrese el número exterior del inmueble' value={formData.noExteriorInmueble} onChange={handleChange} required />
                <input type="text" name="edificioInmueble" placeholder="Edificio/Torre" title='Ingrese el edificio del inmueble' value={formData.edificioInmueble} onChange={handleChange} />
                <input type="text" name="noInteriorInmueble" placeholder="No. Int." title='Ingrese el número interior del inmueble' value={formData.noInteriorInmueble} onChange={handleChange} />
                <input type="text" name="cpInmueble" placeholder="C.P." title='Ingrese el código postal del inmueble' value={formData.cpInmueble} onChange={handleChange} required />
                <input type="text" name="coloniaInmueble" placeholder="Colonia" title='Ingrese la colonia del inmueble' value={formData.coloniaInmueble} onChange={handleChange} required />
                <input type="text" name="alcaldiaInmueble" placeholder="Alcaldía/Municipio" title='Ingrese alcaldía o municipio del inmueble' value={formData.alcaldiaInmueble} onChange={handleChange} required />
                <input type="text" name="estadoInmueble" placeholder="Estado" title='Ingrese el estado del inmueble' value={formData.estadoInmueble} onChange={handleChange} required />
               </div>
          </section>

          {/* SECCIÓN 5: USO DEL INMUEBLE */}
          <section className="seccion">
            <div className="checkbox-group">
              <label>
                <input type="checkbox" name="usoHabitacion" title='Ingrese el uso/giro que se le dará al inmueble' checked={formData.usoHabitacion} onChange={handleChange} />
                  HABITACIÓN
              </label>
              <label>
               <input type="checkbox" name="usoOficina" title='Ingrese el uso/giro que se le dará al inmueble' checked={formData.usoOficina} onChange={handleChange} />
                  OFICINA
              </label>
              <label>
               <input type="checkbox" name="usoComercial" title='Ingrese el uso/giro que se le dará al inmueble' checked={formData.usoComercial} onChange={handleChange} />
                  COMERCIAL
              </label>
              <label>
                <input type="checkbox" name="usoBodega" title='Ingrese el uso/giro que se le dará al inmueble' checked={formData.usoBodega} onChange={handleChange} />
                  BODEGA
              </label>
            </div>
            <div className="input-group">
              <input type="text" name="giroNegocio" placeholder="Especifique otro uso si aplica" title='En caso de ser otro porfavor, ingrese que tipo de uso/giro se le dará' value={formData.giroNegocio} onChange={handleChange} />
                <label>Otro giro / Especificaciones:</label>
            </div>
          </section>

          {/* SECCIÓN 6: CONDICIONES DEL ARRENDAMIENTO */}
          <section className="seccion">
            <h2>CONDICIONES DEL ARRENDAMIENTO</h2>
             <div className="grid-form">
               <input type="number" name="rentaMensual" placeholder="Renta Mensual" title='Ingrese la renta mensual' value={formData.rentaMensual} onChange={handleChange} required/>
             </div>
              <h3>IVA</h3>
                <div className="radio-group">
                  <label>
                    <input type="radio" name="ivaOption" value="MAS_IVA"checked={formData.ivaOption === 'MAS_IVA'}onChange={handleChange} required />
                       MÁS IVA
                  </label>
                  <label>
                    <input type="radio" name="ivaOption" value="IVA_INCLUIDO" checked={formData.ivaOption === 'IVA_INCLUIDO'} onChange={handleChange} />
                       IVA INCLUIDO
                  </label>
                </div>
             <h3>CUOTA DE MANTENIMIENTO</h3>
              <div className="checkbox-group">
                <label>
                  <input type="checkbox" name="mantenimientoIncluido" checked={formData.mantenimientoIncluido} onChange={handleChange} required/>
                    INCLUIDA
                    </label>
                <label>
                  <input type="checkbox" name="mantenimientoAdicional" checked={formData.mantenimientoAdicional} onChange={handleChange} />
                    ADICIONAL
                </label>
              </div>
               {formData.mantenimientoAdicional && (
                 <input type="number" name="montoAdicional" placeholder="Monto adicional" title='Ingrese monto de mantenimiento' value={formData.montoAdicional} onChange={handleChange} />
                )}
              <h3>VIGENCIA DEL CONTRATO</h3>
                <div className="grid-form">
                  <input type="date" name="fechaInicio" title='Ingrese la fecha en la que inicia el contrato'  value={formData.fechaInicio} onChange={handleChange} required />
                  <input type="date" name="fechaTermino" title='Ingrese la fecha en la que finaliza el contrato' value={formData.fechaTermino} onChange={handleChange} required />
                </div>

                <div className="grid-form">
                  <input type="number" name="depositoGarantia" placeholder="Deposito en garantía" title='Ingrese el deposito en garantía' value={formData.depositoGarantia} onChange={handleChange} required />
                  <input type="number" name="lugaresEstacionamiento" placeholder="Lugares de estacionamiento" title='Ingrese el número de lugares de estacionamiento' value={formData.lugaresEstacionamiento} onChange={handleChange} required />
                </div>
              <h3>MASCOTAS</h3>
                <div className="radio-group">
                  <label>
                    <input type="radio" name="mascotas" value="SI" checked={formData.mascotas === 'SI'} onChange={handleChange} required />
                      SI
                  </label>
                  <label>
                    <input type="radio" name="mascotas" value="NO" checked={formData.mascotas === 'NO'} onChange={handleChange} />
                      NO
                  </label>
                </div>

              <h3>INVENTARIO</h3>
                <div className="radio-group">
                  <label>
                    <input type="radio" name="inventario" value="SI"  checked={formData.inventario === 'SI'} onChange={handleChange} required />
                      SI
                  </label>
                  <label>
                    <input type="radio" name="inventario" value="NO" checked={formData.inventario === 'NO'} onChange={handleChange} />
                      NO
                 </label>
                </div>
                <div className="grid-form">
                   <input type="text" name="servicios" placeholder="SERVICIOS CON LOS QUE CUENTA EL INMUEBLE" title='Ejemplo: Agua, luz, gas, etc.' value={formData.servicios} onChange={handleChange}/>
                </div>
                  

              <h3>PAGO DE LA POLIZA JURIDICA</h3>
                 <div className="checkbox-group">
                   <label>
                     <input type="checkbox" name="pagoPolizaArrendador" title='Quien o quienes realizan el pago' checked={formData.pagoPolizaArrendador} onChange={handleChange} required />
                       ARRENDADOR
                   </label>
                   <label>
                     <input type="checkbox" name="pagoPolizaArrendatario" title='Quien o quienes realizan el pago' checked={formData.pagoPolizaArrendatario} onChange={handleChange} />
                       ARRENDATARIO
                   </label>
                 </div>
                  <div className="grid-form">
                    <input type="text" name="porcentajePoliza" placeholder="AMBOS UN %:" title='Ejemplo 50% y 50%' value={formData.porcentajePoliza} onChange={handleChange} />
                  </div>
          </section>

          {/* SECCIÓN 7: SOLICITUD ARRENDAMIENTO */}
          <section className='seccion'>
            <h2>DATOS ARRENDATARIO</h2>
              <div className='grid-form'>
                <input type="text" name="nombreArrendatario" placeholder="Nombre de arrendatario" value={formData.nombreArrendatario} onChange={handleChange} required />
                <input type="text" name="rfcArrendatario" placeholder="RFC" value={formData.rfcArrendatario} onChange={handleChange} required />
                <input type="tel" name="telefonoArrendatario" placeholder="Teléfono" value={formData.telefonoArrendatario} onChange={handleChange} required />
                <input type="email" name="emailArrendatario" placeholder="Correo" value={formData.emailArrendatario} onChange={handleChange} required />
                <input type="text" name="regimenConyugalArrendatario" placeholder="Régimen Conyugal" value={formData.regimenConyugalArrendatario} onChange={handleChange} />
              </div>
                      
              {/* TIPO DE PERSONA ARRENDATARIO */}
              <div className="radio-group">
                <label>
                  <input type="radio" name="tipoArrendatario" value="FISICA" checked={formData.tipoArrendatario === 'FISICA'} onChange={handleChange} required/>
                     PERSONA FÍSICA
                </label>
                <label>
                  <input type="radio" name="tipoArrendatario" value="MORAL"checked={formData.tipoArrendatario === 'MORAL'} onChange={handleChange} />
                     PERSONA MORAL
                </label>
              </div>
                      
              {/* DOCUMENTOS PERSONA MORAL ARRENDATARIO (CONDICIONAL) */}
              {formData.mostrarDocumentosArrendatario && (
                <div className="grid-form">
                  <input type="text" name="representanteLegal" placeholder="Representante legal" value={formData.representanteLegal} onChange={handleChange} required />
                  <input type="text" name="actaConstitutiva" placeholder="Acta constitutiva" value={formData.actaConstitutiva} onChange={handleChange} required />
                  <input type="date" name="fechaActa" value={formData.fechaActa} onChange={handleChange} required />
                  <input type="text" name="poderLegal" placeholder="Poder legal" value={formData.poderLegal} onChange={handleChange} required />
                  <input type="date" name="fechaPoder" value={formData.fechaPoder} onChange={handleChange} required />
                  <input type="text" name="nombreNotario" placeholder="Nombre de notario" value={formData.nombreNotario} onChange={handleChange} required />
                  <input type="text" name="numeroNotaria" placeholder="Número de notaria" value={formData.numeroNotaria} onChange={handleChange} required />
                  <input type="text" name="ciudadNotaria" placeholder="Ciudad" value={formData.ciudadNotaria} onChange={handleChange} required />
                </div>
                )}
          </section> 

          {/* SECCIÓN 8: DOMICILIO ARRENDATARIO*/} 
          <section className='seccion'>
           <h2>DOMICILIO ARRENTATARIO (SI EL USO DEL INMUEBLE ES DISTINTO AL HABITACIONAL)</h2>
             <div className="grid-form">
              <input type="text" name="calleArrendatario" placeholder="Calle" title='Ingresa calle de arrendatario' value={formData.calleArrendatario} onChange={handleChange} />
              <input type="text" name="noExteriorArrendatario" placeholder="No. Exterior" title='Ingresa número exterior de arrendatario' value={formData.noExteriorArrendatario} onChange={handleChange} />
              <input type="text" name="edificioArrendatario" placeholder="Edificio" title='Ingresa edificio del arrandatario' value={formData.edificioArrendatario} onChange={handleChange} />
              <input type="text" name="noInteriorArrendatario" placeholder="No. Interior" title='Ingresa número interior de arrendatario' value={formData.noInteriorArrendatario} onChange={handleChange} />
              <input type="text" name="cpArrendatario" placeholder="C.P." title='Ingresa código postal del arrendatario' value={formData.cpArrendatario} onChange={handleChange} />
              <input type="text" name="coloniaArrendatario" placeholder="Colonia" title='Ingresa colonia del arrendatario' value={formData.coloniaArrendatario} onChange={handleChange} />
              <input type="text" name="alcaldiaArrendatario" placeholder="Alcaldía" title='Ingresa la alcaldía del arrendatario' value={formData.alcaldiaArrendatario} onChange={handleChange} />
              <input type="text" name="estadoArrendatario" placeholder="Estado" title='Ingresa estado del arrendatario' value={formData.estadoArrendatario} onChange={handleChange} />
              <input type="text" name="rfcArrendatario" placeholder="RFC" title='Ingresa el RFC del arrendatario' value={formData.rfcArrendatario} onChange={handleChange} />
              <input type="tel" name="telefonoArrendatario" placeholder="Teléfono" title='Ingresa el teléfono del arrendatario' value={formData.telefonoArrendatario} onChange={handleChange} />
              <input type="email" name="emailArrendatario" placeholder="Correo" title='Ingresa el correo del arrendatario' value={formData.emailArrendatario} onChange={handleChange} />
              <input type="text" name="nombreConyuge" placeholder="Nomre de Conyugue" title='Ingresa el nombre completo del conyugue' value={formData.nombreConyuge} onChange={handleChange} />
             </div>
          </section>

          {/* SECCIÓN 9: INFORMACIÓN LABORAL*/} 
          <section className='seccion'>
            <h2>INFORMACIÓN LABORAL</h2>
              <div className="grid-form">
                <input type="number" name="ingresosMensuales" placeholder="Ingreso mensual" title='brinde el ingreso mensuaL' value={formData.ingresosMensuales} onChange={handleChange} required />
                <input type="text" name="ocupacion" placeholder="Ocupación" title='Cual es su ocupación' value={formData.ocupacion} onChange={handleChange} required />
                <input type="text" name="empresa" placeholder="Empresa" title='nombre de la empresa' value={formData.empresa} onChange={handleChange} required />
                <input type="text" name="antiguedad" placeholder="Antiguedad" title='tiempo laborando' value={formData.antiguedad} onChange={handleChange} required />
              </div>
            <h2>DOMICILIO LABORAL</h2>
               <div className="grid-form">
                <input type="text" name="calleLaboral" placeholder="Calle" title='calle del lugar de trabajo' value={formData.calleLaboral} onChange={handleChange} required />
                  <input type="text" name="noExteriorLaboral" placeholder="No. Exterior" title='número exterior del lugar de trabajo' value={formData.noExteriorLaboral} onChange={handleChange} required />
                  <input type="text" name="edificioLaboral" placeholder="Edificio" title='Edificio en el que trabaja (si aplica)' value={formData.edificioLaboral} onChange={handleChange} required />
                  <input type="text" name="noInteriorLaboral" placeholder="No. Interior" title='número interior del lugar de trabajo' value={formData.noInteriorLaboral} onChange={handleChange} required />
                  <input type="text" name="cpLaboral" placeholder="CP" title='codigo postal del lugar de trabajo' value={formData.cpLaboral} onChange={handleChange} required />
                  <input type="text" name="coloniaLaboral" placeholder="Colonia" title='colonia  del lugar de trabajo' value={formData.coloniaLaboral} onChange={handleChange} required />
                  <input type="text" name="alcaldiaLaboral" placeholder="Alcaldía" title='Alcaldía del lugar de trabajo' value={formData.alcaldiaLaboral} onChange={handleChange} required />
                  <input type="text" name="estadoLaboral" placeholder="Estado" title='Estado del lugar de trabajo' value={formData.estadoLaboral} onChange={handleChange} required />
               </div>
          </section>
                  
          {/* SECCIÓN 10: OCUPACION DEL INMUEBLE*/}
          <section className='seccion'>
            <h2>PERSONAS QUE OCUPARÁN EL INMUEBLE</h2>
              <div className="grid-form">
                <input type="text" name="personasInmueble" placeholder="Nombre" title='Nombra la persona que habitará el inmueble' value={formData.personasInmueble} onChange={handleChange} required />
                <input type="text" name="personasParentesco" placeholder="Parentesco" title='Que parentesco tiene con el arrendador' value={formData.personasParentesco} onChange={handleChange} required />
              </div>
              <div className="grid-form">
               <input type="text" name="personas2Inmueble" placeholder="Nombre" title='Nombra la persona que habitará el inmueble' value={formData.personas2Inmueble} onChange={handleChange} required />
               <input type="text" name="personas2Parentesco" placeholder="Parentesco" title='Que parentesco tiene con el arrendador' value={formData.personas2Parentesco} onChange={handleChange} required />
              </div>
              <div className="grid-form">
                <input type="text" name="personas3Inmueble" placeholder="Nombre" title='Nombra la persona que habitará el inmueble' value={formData.personas3Inmueble} onChange={handleChange} required />
                <input type="text" name="personas3Parentesco" placeholder="Parentesco" title='Que parentesco tiene con el arrendador' value={formData.personas3Parentesco} onChange={handleChange} required />
              </div>
              <div className="grid-form">
               <input type="text" name="motivosCambio" placeholder="Motivo de cambio" title='Ejemplo: Por trabajo, ubicación de escuelas, salud, etc.' value={formData.motivosCambio} onChange={handleChange} required />
              </div>
          </section>

          {/* SECCIÓN 11: REFERENCIAS PERSONALES*/}
          <section className='seccion'>
            <h2>REFERENCIAS PERSONALES</h2>
              <h3>PERSONA 1</h3>
                <div className="grid-form">
                  <input type="text" name="ref1Nombre" placeholder="Nombre" title='Ingrese el nombre del referente' value={formData.ref1Nombre} onChange={handleChange} required />
                  <input type="tel" name="ref1Telefono" placeholder="Teléfono" title='Ingrese el número del referente' value={formData.ref1Telefono} onChange={handleChange} required />
                  <input type="email" name="ref1Mail" placeholder="Correo" title='Ingrese correo del referente' value={formData.ref1Mail} onChange={handleChange} required />
                  <input type="text" name="ref1Relacion" placeholder="Relación" title='Ingrese el tipo de relación que tiene con el referente' value={formData.ref1Relacion} onChange={handleChange} required />
                  <input type="text" name="ref1Domicilio" placeholder="Domicilio" title='Ingrese el domicilio del referente' value={formData.ref1Domicilio} onChange={handleChange} required />
                </div>
              <h3>PERSONA 2</h3>
                <div className="grid-form">
                  <input type="text" name="ref2Nombre" placeholder="Nombre" title='Ingrese el nombre del referente' value={formData.ref2Nombre} onChange={handleChange} required />
                  <input type="tel" name="ref2Telefono" placeholder="Teléfono" title='Ingrese el número del referente' value={formData.ref2Telefono} onChange={handleChange} required />
                  <input type="email" name="ref2Mail" placeholder="Correo" title='Ingrese correo del referente' value={formData.ref2Mail} onChange={handleChange} required />
                  <input type="text" name="ref2Relacion" placeholder="Relación" title='Ingrese el tipo de relación que tiene con el referente' value={formData.ref2Relacion} onChange={handleChange} required />
                  <input type="text" name="ref2Domicilio" placeholder="Domicilio" title='Ingrese el domicilio del referente' value={formData.ref2Domicilio} onChange={handleChange} required />
                </div>
              <h3>PERSONA 3</h3>
                <div className="grid-form">
                  <input type="text" name="ref3Nombre" placeholder="Nombre" title='Ingrese el nombre del referente' value={formData.ref3Nombre} onChange={handleChange} required />
                  <input type="tel" name="ref3Telefono" placeholder="Teléfono" title='Ingrese el número del referente' value={formData.ref3Telefono} onChange={handleChange} required />
                  <input type="email" name="ref3Mail" placeholder="Correo" title='Ingrese correo del referente' value={formData.ref3Mail} onChange={handleChange} required />
                  <input type="text" name="ref3Relacion" placeholder="Relación" title='Ingrese el tipo de relación que tiene con el referente' value={formData.ref3Relacion} onChange={handleChange} required />
                  <input type="text" name="ref3Domicilio" placeholder="Domicilio" title='Ingrese el domicilio del referente' value={formData.ref3Domicilio} onChange={handleChange} required />
                </div>
          </section>
                  
          {/* SECCIÓN 11: REFEREBCIAS DEL ARRENDADOR ANTERIOR*/} 
          <section className='seccion'>
            <h2>REFERENCIAS DEL ARRENDADOR ANTERIOR</h2>
              <div className="grid-form">
                <input type="text" name="arrendadorAnteriorNombre" placeholder="Nombre" title='Ingrese el nombre del arrendador anterior' value={formData.arrendadorAnteriorNombre} onChange={handleChange} required />
                <input type="tel" name="arrendadorAnteriorTelefono" placeholder="Teléfono" title='Ingrese el teléfono del arrendador anterior' value={formData.arrendadorAnteriorTelefono} onChange={handleChange} required />
                <input type="email" name="arrendadorAnteriorMail" placeholder="Correo" title='Ingrese el correo del arrendador anterior' value={formData.arrendadorAnteriorMail} onChange={handleChange} required />
                <input type="text" name="arrendadorAnteriorDomicilio" placeholder="Domicilio" title='Ingrese el domicilio  del arrendador anterior' value={formData.arrendadorAnteriorDomicilio} onChange={handleChange} required />
              </div>
          </section>
                  
          {/* SECCIÓN DE SELECCIÓN DE GARANTÍA */}
          <section className='seccion'>
            <h2>SELECCIÓN DE GARANTÍA</h2>
              <div className="radio-group">
                <label>
                 <input type="radio" name="tipoGarantia" value="OBLIGADO" checked={formData.tipoGarantia === 'OBLIGADO'} onChange={handleChange} />
                   SOLO OBLIGADO SOLIDARIO
                </label>
                <label>
                 <input type="radio" name="tipoGarantia" value="INMUEBLE" checked={formData.tipoGarantia === 'INMUEBLE'} onChange={handleChange} />
                   SOLO INMUEBLE EN GARANTÍA
                </label>
                <label>
                 <input type="radio" name="tipoGarantia" value="AMBAS" checked={formData.tipoGarantia === 'AMBAS'} onChange={handleChange} />
                    AMBAS GARANTÍAS
                </label>
                <label>
                  <input type="radio" name="tipoGarantia" value="NINGUNA" checked={formData.tipoGarantia === 'NINGUNA'} onChange={handleChange} />
                    SIN GARANTÍA
                </label>
              </div>
          </section>

          {formData.mostrarObligadoSolidario && (
           <>
            {/* SECCIÓN 12: OBLIGADO SOLIDARIO */}
            <section className='seccion'>
             <h2>OBLIGADO SOLIDARIO</h2>
               <div className="grid-form">
                <input type="text" name="obligadoNombre" placeholder="Nombre" title='Ingresa el nombre de obligado' value={formData.obligadoNombre} onChange={handleChange} required />
                <input type="text" name="rfcObligado" placeholder="RFC" title='Ingresa el RFC del obligado' value={formData.rfcObligado} onChange={handleChange} required />
                <input type="text" name="obligadoRepresentante" placeholder="Representante" title='Ingresa el nombre del representante (si aplica)' value={formData.obligadoRepresentante} onChange={handleChange} required />
                <input type="text" name="obligadoActa" placeholder="Acta" title='Ingresa el acta del representante (si aplica)' value={formData.obligadoActa} onChange={handleChange} required />
                <input type="date" name="obligadoFechaActa" placeholder="Fecha de acta" title='Ingresa la fecha del acta (si aplica)' value={formData.obligadoFechaActa} onChange={handleChange} required />
                <input type="text" name="obligadoPoder" placeholder="Poder" title='Ingresa el poder notarial (si aplica)' value={formData.obligadoPoder} onChange={handleChange} required />
                <input type="date" name="obligadoFechaPoder" placeholder="Fecha de poder" title='Ingresa la fecha del poder notarial (si aplica)' value={formData.obligadoFechaPoder} onChange={handleChange} required />
                <input type="text" name="obligadoNotario" placeholder="Notario" title='Ingresa nombre del notario (si aplica)' value={formData.obligadoNotario} onChange={handleChange} required />
                <input type="number" name="obligadoNumeroNotaria" placeholder="Número" title='Ingresa número de notaria (si aplica)' value={formData.obligadoNumeroNotaria} onChange={handleChange} required />
                <input type="text" name="obligadoCiudadNotaria" placeholder="Ciudad" title='Ingresa la ciudad de la notaria (si aplica)' value={formData.obligadoCiudadNotaria} onChange={handleChange} required />
               </div>
            </section>

            {/* SECCIÓN 13: DOMICILIO OBLIGADO SOLIDARIO */}
            <section className='seccion'>
              <h2>DOMICILIO OBLIGADO SOLIDARIO</h2>
                <div className="grid-form">
                  <input type="text" name="calleObligado" placeholder="Calle" title='Ingresa calle del obligado' value={formData.calleObligado} onChange={handleChange} required />
                  <input type="text" name="noExteriorObligado" placeholder="No. Exterior" title='Ingresa número exterior del obligado' value={formData.noExteriorObligado} onChange={handleChange} required />
                  <input type="text" name="edificioObligado" placeholder="Edificio" title='Ingresa el edificio del obligado' value={formData.edificioObligado} onChange={handleChange} required />
                  <input type="text" name="noInteriorObligado" placeholder="No. Interior" title='Ingresa el número interior del obligado' value={formData.noInteriorObligado} onChange={handleChange} required />
                  <input type="text" name="cpObligado" placeholder="CP" title='Ingresa el código postal del obligado' value={formData.cpObligado} onChange={handleChange} required />
                  <input type="text" name="coloniaObligado" placeholder="Colonia" title='Ingresa la colonia del obligado' value={formData.coloniaObligado} onChange={handleChange} required />
                  <input type="text" name="alcaldiaObligado" placeholder="Alcaldía" title='Ingresa la alcaldía del obligado' value={formData.alcaldiaObligado} onChange={handleChange} required />
                  <input type="text" name="estadoObligado" placeholder="Estado" title='Ingresa el estado del obligado' value={formData.estadoObligado} onChange={handleChange} required />
                  <input type="tel" name="telefonoObligado" placeholder="Teléfono" title='Ingresa el teléfono del obligado' value={formData.telefonoObligado} onChange={handleChange} required />
                  <input type="email" name="emailObligado" placeholder="Correo" title='Ingresa el correo del obligado' value={formData.emailObligado} onChange={handleChange} required />
                  <input type="text" name="nombreConyugeObligado" placeholder="Conyugue" title='Ingresa el Nombre del conyugue' value={formData.nombreConyugeObligado} onChange={handleChange} required />
                  <input type="text" name="regimenConyugalObligado" placeholder="Regimen Conyugal" title='Ingresa el régimen conyugal del obligado' value={formData.regimenConyugalObligado} onChange={handleChange} required />
                </div>
            </section>
           </>
         )}
            {/* SECCIÓN INMUEBLE EN GARANTÍA (CONDICIONAL) */}
          {formData.mostrarInmuebleGarantia && (
            <> 
             {/* SECCIÓN 14: INMUEBLE EN GARANTÍA */}
             <section className='seccion'>
               <h2>INMUEBLE EN GARANTÍA</h2>
                 <div className="grid-form">
                    <input type="text" name="calleGarantia" placeholder="Calle" title='Ingresa calle del inmueble en garantía' value={formData.calleGarantia} onChange={handleChange} required />
                    <input type="text" name="noExteriorGarantia" placeholder="No. Exterior" title='Ingresa número exterior del inmueble en garantía' value={formData.noExteriorGarantia} onChange={handleChange} required />
                    <input type="text" name="edificioGarantia" placeholder="Edificio" title='Ingresa el edificio del inmueble en garantía' value={formData.edificioGarantia} onChange={handleChange} />
                    <input type="text" name="noInteriorGarantia" placeholder="No. Interior" title='Ingresa el número interior del inmueble en garantía' value={formData.noInteriorGarantia} onChange={handleChange} />
                    <input type="text" name="cpGarantia" placeholder="CP" title='Ingresa el código postal del inmueble en garantía' value={formData.cpGarantia} onChange={handleChange} required />
                    <input type="text" name="coloniaGarantia" placeholder="Colonia" title='Ingresa la colonia del inmueble en garantía' value={formData.coloniaGarantia} onChange={handleChange} required />
                    <input type="text" name="alcaldiaGarantia" placeholder="Alcaldía" title='Ingresa la alcaldía del inmueble en garantía' value={formData.alcaldiaGarantia} onChange={handleChange} required />
                    <input type="text" name="estadoGarantia" placeholder="Estado" title='Ingresa el estado del inmueble en garantía' value={formData.estadoGarantia} onChange={handleChange} required />
                </div>
             </section>
                        
              {/* SECCIÓN 15: DATOS ESCRITURA */}
              <section className='seccion'>
                <h2>DATOS ESCRITURA</h2>
                  <div className="grid-form">
                    <input type="text" name="noEscritura" placeholder="No. Escritura" title='Ingresa el número de escxritura del inmueble en garantía' value={formData.noEscritura} onChange={handleChange} required />
                    <input type="date" name="fechaEscritura" placeholder="Fecha" title='Ingresa la fecha de escritura del inmueble en garantía' value={formData.fechaEscritura} onChange={handleChange} required />
                    <input type="text" name="nombreNotarioEscritura" placeholder="Notaro" title='Ingresa el nombre del notario del inmueble en garantía' value={formData.nombreNotarioEscritura} onChange={handleChange} required />
                    <input type="number" name="numeroNotariaEscritura" placeholder="Escritura" title='Ingresa el número de escritura del inmueble en garantía' value={formData.numeroNotariaEscritura} onChange={handleChange} required />
                    <input type="text" name="ciudadEscritura" placeholder="Ciudad" title='Ingrewa la ciudad del inmueble en garantía' value={formData.ciudadEscritura} onChange={handleChange} required />
                  </div>
              </section>
                    </>
          )}

          {/* SECCIÓN 16: Politica de provacidad y aceptación de términos*/}
            <section>
              <div className='privacyPolicy'>
                <h3>Los datos personales recabados por ASEGURADORA, S.A. DE C.V. con domicilio en Calle del Lucero, nº 13, cerca de las ruinas del Cristal, 
                Insomnia, Reino de Lucis, , C.P. 015-RGL, serán usados con la finalidad de proporcionar los servicios contratados con ésta; 
                para la investigación judicial, crediticia, económica y de identidad, así como para conocer su opinión sobre los servicios prestados 
                actualmente o potenciales servicios a ofrecer en el futuro. 
                Por lo anterior, la firma del presente autoriza a ASEGURADORA, S.A. DE C.V. a realizar la consulta en buró de crédito, 
                la validación de la credencial para votar y la consulta de antecedentes judiciales de las personas cuyos datos personales 
                obran en este documento.
                </h3>
              </div>  
              <div className="terminos-checkbox">
                <label>
                  <input type="checkbox" name="aceptoTerminos" checked={formData.aceptoTerminos} onChange={handleChange} required />
                    <h3>He leído y acepto los términos y condiciones</h3>
                </label>
              </div>
            </section>
          <button type="submit" className="btn-submit">Enviar Formulario</button>
        </form>
      </div>              
    </div>
  );
}  

export default ContratoCreacion;