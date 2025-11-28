{/* Datos faltantes en formulario
  🔍 DATOS QUE FALTAN EN EL FORMULARIO
SÍ HAY DATOS CRÍTICOS QUE FALTAN EN EL FORMULARIO:

1. INFORMACIÓN DEL OBLIGADO SOLIDARIO (INCOMPLETA)
❌ Faltan campos específicos para el obligado solidario:

Tipo de persona (Física/Moral)

RFC del obligado solidario

Información laboral del obligado

Referencias del obligado

2. DATOS DE ESCRITURA (INCOMPLETOS)
❌ Faltan en formulario pero están en BD:

Número de notaría para escritura

Ciudad de la escritura

Fecha específica de escritura

3. INFORMACIÓN ADICIONAL REQUERIDA
❌ Porcentaje de pago de póliza (solo dice "AMBOS UN %:" pero no captura el valor)

❌ Motivo específico de cambio para ocupantes

❌ Regimen conyugal específico (solo pide "nombre completo del cónyuge")
  
  */}

import React, { useState } from 'react';
// Importa los estilos si están definidos para el formulario aquí o usa los globales
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 

const API_BASE_URL = 'http://localhost:8000/api/';

// Renombre la función de App a ContratoCreacion
function ContratoCreacion() {
  const [formData, setFormData] = useState({

    //Datos Arrendador
    nombreArrendador: '', //check
    tipoArrendador: 'FISICA', //fata acomodar esto a nivel de interfaz
    calleArrendador: '', //check
    noExteriorArrendador: '', //check
    edificioArrendador: '', //check
    noInteriorArrendador: '', //check
    cpArrendador: '', //check 
    coloniaArrendador: '', //check
    alcaldiaArrendador: '', //check
    estadoArrendador: '', //check
    rfcArrendador: '', //check
    telefonoArrendador: '', //check
    emailArrendador: '', //check
    
    //Cuenta Bancaria
    banco: '', //check
    beneficiario: '', //check
    cuentaBancaria: '', //check
    clabe: '', //check
    
    //Tipo de Cobertura
    tipoCobertura: '', //check
    montoPoliza: 0, //check
    
    //Domicilio Inmueble
    calleInmueble: '', //check
    noExteriorInmueble: '', //check
    edificioInmueble: '', //check
    noInteriorInmueble: '', //check
    cpInmueble: '', //check
    coloniaInmueble: '', //check
    alcaldiaInmueble: '', //check
    estadoInmueble: '', //check
    
    //Uso del Inmueble
    usoHabitacion: false, //check
    usoOficina: false, //check
    usoComercial: false, //check
    usoBodega: false, //check
    giroNegocio: '', //check
    
    //Condiciones del Arrendamiento
    rentaMensual: 0,
    iva: '', // Hay que ver que cambio es mejor o si se mantiene asi
    masIva: false,
    ivaIncluido: false,
    mantenimientoIncluido: false, //check
    mantenimientoAdicional: false,
    montoAdicional: '',
    plazoMeses: 12, // Input del usuario para el cálculo
    fechaInicio: new Date().toISOString().split('T')[0], // YYYY-MM-DD,
    fechaTermino: '', //check
    depositoGarantia: '',
    lugaresEstacionamiento: '',
    mascotas: '',
    inventario: '',
    servicios: '',
    pagoPolizaArrendador: false,
    pagoPolizaArrendatario: false,
    porcentajePoliza: '',
    
    //Solicitud Arrendatario
    nombreArrendatario: '',  //check
    tipoArrendatario: 'FISICA', // CRÍTICO: Debe ser 'FISICA' o 'MORAL' fata agregar a nive de interfaz
    representanteLegal: '',
    actaConstitutiva: '',
    fechaActa: '',
    poderLegal: '',
    fechaPoder: '',
    nombreNotario: '',
    numeroNotaria: '',
    ciudadNotaria: '',
    
    //Domicilio Arrendatario
    calleArrendatario: '', //check
    noExteriorArrendatario: '', //check
    edificioArrendatario: '', //check
    noInteriorArrendatario: '', //check
    cpArrendatario: '', //check
    coloniaArrendatario: '', //check
    alcaldiaArrendatario: '', //check
    estadoArrendatario: '', //check
    rfcArrendatario: '', //check
    telefonoArrendatario: '', //check 
    emailArrendatario: '', //check
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
  })

  const navigate = useNavigate();

  const calcularFechaTermino = (inicio, meses) => {
      if (!inicio || !meses || meses <= 0) return '';
      
      // Crear objeto Date a partir de la cadena 'YYYY-MM-DD'
      const [year, month, day] = inicio.split('-').map(Number);
      // Usamos mes - 1 porque JS usa 0-11 para los meses
      const fecha = new Date(year, month - 1, day); 
      
      // Sumamos los meses. setMonth() maneja el desbordamiento de año.
      fecha.setMonth(fecha.getMonth() + meses);

      // Formatear la fecha resultante a 'YYYY-MM-DD'
      const yyyy = fecha.getFullYear();
      const mm = String(fecha.getMonth() + 1).padStart(2, '0');
      const dd = String(fecha.getDate()).padStart(2, '0'); 

      return `${yyyy}-${mm}-${dd}`;
  }; 
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // 1. Crear la nueva data base (valor actualizado)
    let newFormData = {
        ...formData,
        [name]: type === 'checkbox' ? checked : value
    };
// 2. Ejecutar el cálculo si cambiamos la fecha de inicio o el plazo
    if (name === 'fechaInicio' || name === 'plazoMeses') {
        
        // Obtenemos los valores más recientes para el cálculo
        const inicio = name === 'fechaInicio' ? value : formData.fechaInicio;
        // Convertimos el plazo a número entero, por si acaso
        const plazo = name === 'plazoMeses' ? parseInt(value) : parseInt(formData.plazoMeses);
        
        // Calcular y actualizar fechaTermino en el nuevo estado
        newFormData.fechaTermino = calcularFechaTermino(inicio, plazo);
    }

    // 3. Actualizar el estado
    setFormData(newFormData);
};


const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar términos
    if (!formData.aceptoTerminos) {
        alert('Debe leer y aceptar los términos y condiciones.');
        return;
    }

    // =========================================================
    // 1. CONSTRUCCIÓN DE DATA ANIDADA (dataParaDjango)
    // =========================================================
    const dataParaDjango = {
        
        // ----------------------------------------------------
        // A. ARRENDADOR (Anida Persona y Domicilio)
        // ----------------------------------------------------
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
        
        // ----------------------------------------------------
        // B. ARRENDATARIO (Anida Persona y Domicilio)
        // ----------------------------------------------------
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
        
        // ----------------------------------------------------
        // C. INMUEBLE (Anida Domicilio y Usos)
        // ----------------------------------------------------
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
            
            usos: {
                uso_habitacion: formData.usoHabitacion,
                uso_oficina: formData.usoOficina,
                uso_comercial: formData.usoComercial,
                uso_bodega: formData.usoBodega,
                giro_negocio: formData.giroNegocio,
            },
        },

        // ----------------------------------------------------
        // D. CUENTA BANCARIA Y COBERTURA (Anidadas)
        // ----------------------------------------------------
        cuenta_bancaria: { 
            banco: formData.banco,
            beneficiario: formData.beneficiario,
            cuenta_bancaria: formData.cuentaBancaria,
            clabe: formData.clabe,
        },

        cobertura: { 
            tipo_cobertura: formData.tipoCobertura,
            monto_poliza: parseFloat(formData.montoPoliza) || 0,
        },
        
        // ----------------------------------------------------
        // E. CONDICIONES DEL CONTRATO (Campos Directos)
        // ----------------------------------------------------
        renta_mensual: parseFloat(formData.rentaMensual) || 0,
        mas_iva: formData.masIva,
        iva_incluido: formData.ivaIncluido,
        mantenimiento_incluido: formData.mantenimientoIncluido,
        plazo_meses: parseInt(formData.plazoMeses) || 12,
        fecha_inicio: formData.fechaInicio,
        fecha_termino: formData.fechaTermino, // El valor calculado
    };

    // ... (Fin de dataParaDjango) ..
    
    // =========================================================
    // 2. ENVÍO DE LA PETICIÓN POST
    // =========================================================
    //comentado hasta ngresar protocolo de autenticación
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
    
    // ----------------------------------------------------
    // 5. RENDERIZADO (El JSX)
    // ----------------------------------------------------
    return (
        <div className="formulario-container">
            {/* El formulario debe llamar a handleSubmit */}
            <form onSubmit={handleSubmit}> 
                {/* Asegúrate de que los inputs tienen los atributos name="{nombreDelCampo}"
                    y llaman a onChange={handleChange} */}
                
                {
                  <div className="app">
                    <form onSubmit={handleSubmit} className="formulario">
                      <h1>Formulario de Arrendamiento (Creación)</h1>

                      {/* SECCIÓN 1: DOMICILIO ARRENDADOR */}
                      <section className="seccion">
                        <h2>DATOS DEL ARRENDADOR</h2>
                        <div className="grid-form">
                          <input type="text" name="nombreArrendador" placeholder="Nombre del arrendador" value={formData.nombreArrendador} onChange={handleChange} required />
                          <input type="text" name="calleArrendador" placeholder="Calle" value={formData.calleArrendador} onChange={handleChange} required />
                          <input type="text" name="noExteriorArrendador" placeholder="No. Ext." value={formData.noExteriorArrendador} onChange={handleChange} required />
                          <input type="text" name="edificioArrendador" placeholder="Edificio/Torre" value={formData.edificioArrendador} onChange={handleChange} />
                          <input type="text" name="noInteriorArrendador" placeholder="No. Int." value={formData.noInteriorArrendador} onChange={handleChange} />
                          <input type="text" name="cpArrendador" placeholder="C.P." value={formData.cpArrendador} onChange={handleChange} required />
                          <input type="text" name="coloniaArrendador" placeholder="Colonia" value={formData.coloniaArrendador} onChange={handleChange} required />
                          <input type="text" name="alcaldiaArrendador" placeholder="Alcaldía/Municipio" value={formData.alcaldiaArrendador} onChange={handleChange} required />
                          <input type="text" name="estadoArrendador" placeholder="Estado" value={formData.estadoArrendador} onChange={handleChange} required />
                          <input type="text" name="rfcArrendador" placeholder="RFC" value={formData.rfcArrendador} onChange={handleChange} required />
                          <input type="tel" name="telefonoArrendador" placeholder="Teléfono" value={formData.telefonoArrendador} onChange={handleChange} required />
                          <input type="email" name="emailArrendador" placeholder="E-mail" value={formData.emailArrendador} onChange={handleChange} required />
                        </div>
                      </section>

                      {/* SECCIÓN 2: CUENTA BANCARIA */}
                      <section className="seccion">
                        <h2>CUENTA BANCARIA PARA EL PAGO DE LA RENTA</h2>
                        <div className="grid-form">
                          <input type="text" name="banco" placeholder="Nombre del banco" value={formData.banco} onChange={handleChange} required />
                          <input type="text" name="beneficiario" placeholder="Beneficiario" value={formData.beneficiario} onChange={handleChange} required />
                          <input type="text" name="cuentaBancaria" placeholder="Cuenta" value={formData.cuentaBancaria} onChange={handleChange} required />
                          <input type="text" name="clabe" placeholder="Clabe interbancaria" value={formData.clabe} onChange={handleChange} required />
                        </div>
                      </section>

                      {/* SECCIÓN 3: TIPO DE COBERTURA */}
                      <section className="seccion">
                        <h2>TIPO DE COBERTURA</h2>
                        <div className="radio-group">
                          <label>
                            <input type="radio" name="tipoCobertura" value="BASICA" checked={formData.tipoCobertura === 'BASICA'} onChange={handleChange} required />
                            BÁSICA
                          </label>
                          <label>
                            <input type="radio" name="tipoCobertura" value="MEDIA" checked={formData.tipoCobertura === 'MEDIA'} onChange={handleChange} />
                            MEDIA
                          </label>
                          <label>
                            <input type="radio" name="tipoCobertura" value="MAXIMA" checked={formData.tipoCobertura === 'MAXIMA'} onChange={handleChange} />
                            MÁXIMA
                          </label>
                        </div>
                        <div className="grid-form">
                          <input type="number" name="montoPoliza" placeholder="Monto" value={formData.montoPoliza} onChange={handleChange} required />
                        </div>
                      </section>

                      {/* SECCIÓN 4: DATOS DEL INMUEBLE */}
                      <section className="seccion">
                        <h2>DATOS DEL INMUEBLE EN RENTA</h2>
                        <h3>DOMICILIO COMPLETO DEL INMUEBLE EN RENTA</h3>
                        <div className="grid-form">
                          <input type="text" name="calleInmueble" placeholder="Calle" value={formData.calleInmueble} onChange={handleChange} required />
                          <input type="text" name="noExteriorInmueble" placeholder="No. Ext." value={formData.noExteriorInmueble} onChange={handleChange} required />
                          <input type="text" name="edificioInmueble" placeholder="Edificio/Torre" value={formData.edificioInmueble} onChange={handleChange} />
                          <input type="text" name="noInteriorInmueble" placeholder="No. Int." value={formData.noInteriorInmueble} onChange={handleChange} />
                          <input type="text" name="cpInmueble" placeholder="C.P." value={formData.cpInmueble} onChange={handleChange} required />
                          <input type="text" name="coloniaInmueble" placeholder="Colonia" value={formData.coloniaInmueble} onChange={handleChange} required />
                          <input type="text" name="alcaldiaInmueble" placeholder="Alcaldía/Municipio" value={formData.alcaldiaInmueble} onChange={handleChange} required />
                          <input type="text" name="estadoInmueble" placeholder="Estado" value={formData.estadoInmueble} onChange={handleChange} required />
                        </div>
                      </section>

                      {/* SECCIÓN 5: USO DEL INMUEBLE */}
                      <section className="seccion">
                        <h2>USO DEL INMUEBLE QUE SE LE DARÁ AL INMUEBLE ARRENDADO</h2>
                        <div className="checkbox-group">
                          <label>
                            <input type="checkbox" name="usoHabitacion" checked={formData.usoHabitacion} onChange={handleChange} />
                            HABITACIÓN
                          </label>
                          <label>
                            <input type="checkbox" name="usoOficina" checked={formData.usoOficina} onChange={handleChange} />
                            OFICINA
                          </label>
                          <label>
                            <input type="checkbox" name="usoComercial" checked={formData.usoComercial} onChange={handleChange} />
                            COMERCIAL
                          </label>
                          <label>
                            <input type="checkbox" name="usoBodega" checked={formData.usoBodega} onChange={handleChange} />
                            BODEGA
                          </label>
                        </div>
                        <div className="checkbox-group">
                          <input type="text" name="giroNegocio" placeholder="ESPECIFIQUE EL GIRO DE SU NEGOCIO EN CASO DE USO DISTINTO AL HABITACIONAL:" value={formData.giroNegocio} onChange={handleChange}/>
                        </div>
                      </section>

                      {/* SECCIÓN 6: CONDICIONES DEL ARRENDAMIENTO */}
                      <section className="seccion">
                        <h2>CONDICIONES DEL ARRENDAMIENTO</h2>
                        <div className="grid-form">
                          <input type="number" name="rentaMensual" placeholder="Renta Mensual" value={formData.rentaMensual} onChange={handleChange} required/>
                        </div>
                        <h3>IVA</h3>
                        <div className="radio-group">
                          <label>
                            <input type="radio" name="iva" value="MÁS IVA" checked={formData.iva === 'MÁS IVA'} onChange={handleChange} required />
                            MÁS IVA
                          </label>
                          <label>
                            <input type="radio" name="iva" value="IVA INCLUIDO" checked={formData.iva === 'IVA INCLUIDO'} onChange={handleChange} />
                            IVA INCLUIDO
                          </label>
                        </div>

                        <h3>CUOTA DE MANTENIMIENTO</h3>
                        <div className="checkbox-group">
                          <label>
                            <input type="checkbox" name="mantenimientoIncluido" checked={formData.mantenimientoIncluido} onChange={handleChange} />
                            INCLUIDA
                          </label>
                          <label>
                            <input type="checkbox" name="mantenimientoAdicional" checked={formData.mantenimientoAdicional} onChange={handleChange} />
                            ADICIONAL
                          </label>
                        </div>
                        {formData.mantenimientoAdicional && (
                          <input type="number" name="montoAdicional" placeholder="Monto adicional" value={formData.montoAdicional} onChange={handleChange} />
                        )}

                        <h3>VIGENCIA DEL CONTRATO</h3>
                        <div className="grid-form">
                          <input type="date" name="fechaInicio" placeholder="Fecha de inicio" value={formData.fechaInicio} onChange={handleChange} required />
                          <input type="date" name="fechaTermino" placeholder="Fecha de termino" value={formData.fechaTermino} onChange={handleChange} required />
                        </div>

                        <div className="grid-form">
                          <input type="number" name="depositoGarantia" placeholder="Deposito en garantía" value={formData.depositoGarantia} onChange={handleChange} required />
                          <input type="number" name="lugaresEstacionamiento" placeholder="Lugares de estacionamiento" value={formData.lugaresEstacionamiento} onChange={handleChange} required />
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
                            <input type="radio" name="inventario" value="SI" checked={formData.inventario === 'SI'} onChange={handleChange} required />
                            SI
                          </label>
                          <label>
                            <input type="radio" name="inventario" value="NO" checked={formData.inventario === 'NO'} onChange={handleChange} />
                            NO
                          </label>
                        </div>

                        <div className="grid-form">
                          <input type="text" name="servicios" placeholder="SERVICIOS CON LOS QUE CUENTA EL INMUEBLE" value={formData.servicios} onChange={handleChange}/>
                        </div>
                        

                        <h3>PAGO DE LA POLIZA JURIDICA</h3>
                        <div className="checkbox-group">
                          <label>
                            <input type="checkbox" name="pagoPolizaArrendador" checked={formData.pagoPolizaArrendador} onChange={handleChange} />
                            ARRENDADOR
                          </label>
                          <label>
                            <input type="checkbox" name="pagoPolizaArrendatario" checked={formData.pagoPolizaArrendatario} onChange={handleChange} />
                            ARRENDATARIO
                          </label>
                        </div>
                        <div className="grid-form">
                          <input type="text" name="porcentajePoliza" placeholder="AMBOS UN %:" value={formData.porcentajePoliza} onChange={handleChange} />
                        </div>
                        
                      </section>

                      {/* SECCIÓN 7: SOLICITUD ARRENDAMIENTO */}
                        <section className='seccion'>
                          <h2>SOLICITUD ARRENDATARIO</h2>
                          <div className='grid-form'>
                            <input type="text" name="nombreArrendatario" placeholder="Nombre de arrendatario" value={formData.nombreArrendatario} onChange={handleChange} required />
                            <input type="text" name="representanteLegal" placeholder="Representante legal" value={formData.representanteLegal} onChange={handleChange} required />
                            <input type="text" name="actaConstitutiva" placeholder="Acta constitutiva" value={formData.actaConstitutiva} onChange={handleChange} required />
                            <input type="date" name="fechaActa" placeholder="Fecha de acta" value={formData.fechaActa} onChange={handleChange} required />
                            <input type="text" name="poderLegal" placeholder="Poder legal" value={formData.poderLegal} onChange={handleChange} required />
                            <input type="date" name="fechaPoder" placeholder="Feche de poder " value={formData.fechaPoder} onChange={handleChange} required />
                            <input type="text" name="nombreNotario" placeholder="Nombre de notario" value={formData.nombreNotario} onChange={handleChange} required />
                            <input type="text" name="numeroNotaria" placeholder="Número de notaria" value={formData.numeroNotaria} onChange={handleChange} required />
                            <input type="text" name="ciudadNotaria" placeholder="Ciudad" value={formData.ciudadNotaria} onChange={handleChange} required />
                          </div>
                        </section>

                      {/* SECCIÓN 8: DOMICILIO ARRENDATARIO*/} 
                        <section className='seccion'>
                          <h2>DOMICILIO ARRENTATARIO (SI EL USO DEL INMUEBLE ES DISTINTO AL HABITACIONAL)</h2>
                          <div className="grid-form">
                            <input type="text" name="calleArrendatario" placeholder="Calle" value={formData.calleArrendatario} onChange={handleChange} required />
                            <input type="text" name="noExteriorArrendatario" placeholder="No. Exterior" value={formData.noExteriorArrendatario} onChange={handleChange} required />
                            <input type="text" name="edificioArrendatario" placeholder="Edificio" value={formData.edificioArrendatario} onChange={handleChange} required />
                            <input type="text" name="noInteriorArrendatario" placeholder="No. Interior" value={formData.noInteriorArrendatario} onChange={handleChange} required />
                            <input type="text" name="cpArrendatario" placeholder="C.P." value={formData.cpArrendatario} onChange={handleChange} required />
                            <input type="text" name="coloniaArrendatario" placeholder="Colonia" value={formData.coloniaArrendatario} onChange={handleChange} required />
                            <input type="text" name="alcaldiaArrendatario" placeholder="Alcaldía" value={formData.alcaldiaArrendatario} onChange={handleChange} required />
                            <input type="text" name="estadoArrendatario" placeholder="Estado" value={formData.estadoArrendatario} onChange={handleChange} required />
                            <input type="text" name="rfcArrendatario" placeholder="RFC" value={formData.rfcArrendatario} onChange={handleChange} required />
                            <input type="tel" name="telefonoArrendatario" placeholder="Teléfono" value={formData.telefonoArrendatario} onChange={handleChange} required />
                            <input type="email" name="emailArrendatario" placeholder="Correo" value={formData.emailArrendatario} onChange={handleChange} required />
                            <input type="text" name="nombreConyuge" placeholder="Nomre compl. de Conyugue" value={formData.nombreConyuge} onChange={handleChange} required />
                          </div>
                        </section>

                        {/* SECCIÓN 9: INFORMACIÓN LABORAL*/} 
                        <section className='seccion'>
                          <h2>INFORMACIÓN LABORAL</h2>
                          <div className="grid-form">
                            <input type="text" name="ingresosMensuales" placeholder="Ingreso mensual" value={formData.ingresosMensuales} onChange={handleChange} required />
                            <input type="text" name="ocupacion" placeholder="Ocupación" value={formData.ocupacion} onChange={handleChange} required />
                            <input type="text" name="empresa" placeholder="Empresa" value={formData.empresa} onChange={handleChange} required />
                            <input type="text" name="antiguedad" placeholder="Antiguedad" value={formData.antiguedad} onChange={handleChange} required />
                          </div>
                          <h2>DOMICILIO LABORAL</h2>
                          <div className="grid-form">
                            <input type="text" name="calleLaboral" placeholder="Calle" value={formData.calleLaboral} onChange={handleChange} required />
                            <input type="text" name="noExteriorLaboral" placeholder="No. Exterior" value={formData.noExteriorLaboral} onChange={handleChange} required />
                            <input type="text" name="edificioLaboral" placeholder="Edificio" value={formData.edificioLaboral} onChange={handleChange} required />
                            <input type="text" name="noInteriorLaboral" placeholder="No. Interior" value={formData.noInteriorLaboral} onChange={handleChange} required />
                            <input type="text" name="cpLaboral" placeholder="CP" value={formData.cpLaboral} onChange={handleChange} required />
                            <input type="text" name="coloniaLaboral" placeholder="Colonia" value={formData.coloniaLaboral} onChange={handleChange} required />
                            <input type="text" name="alcaldiaLaboral" placeholder="Alcaldía" value={formData.alcaldiaLaboral} onChange={handleChange} required />
                            <input type="text" name="estadoLaboral" placeholder="Estado" value={formData.estadoLaboral} onChange={handleChange} required />
                          </div>
                        </section>
                        
                        {/* SECCIÓN 10: OCUPACION DEL INMUEBLE*/}
                        <section className='seccion'>
                          <h2>PERSONAS QUE OCUPARÁN EL INMUEBLE</h2>
                          <div className="grid-form">
                            <input type="text" name="personasInmueble" placeholder="Nombre" value={formData.personasInmueble} onChange={handleChange} required />
                            <input type="text" name="personasParentesco" placeholder="Parentesco" value={formData.personasParentesco} onChange={handleChange} required />
                          </div>
                          <div className="grid-form">
                            <input type="text" name="personas2Inmueble" placeholder="Nombre" value={formData.personas2Inmueble} onChange={handleChange} required />
                            <input type="text" name="personas2Parentesco" placeholder="Parentesco" value={formData.personas2Parentesco} onChange={handleChange} required />
                          </div>
                          <div className="grid-form">
                            <input type="text" name="personas3Inmueble" placeholder="Nombre" value={formData.personas3Inmueble} onChange={handleChange} required />
                            <input type="text" name="personas3Parentesco" placeholder="Parentesco" value={formData.personas3Parentesco} onChange={handleChange} required />
                          </div>
                          <div className="grid-form">
                            <input type="text" name="motivosCambio" placeholder="Motivo de cambio" value={formData.motivosCambio} onChange={handleChange} required />
                          </div>
                        </section>

                        {/* SECCIÓN 11: REFERENCIAS PERSONALES*/}
                        <section className='seccion'>
                          <h2>REFERENCIAS PERSONALES</h2>
                            <h3>PERSONA 1</h3>
                          <div className="grid-form">
                            <input type="text" name="ref1Nombre" placeholder="Nombre" value={formData.ref1Nombre} onChange={handleChange} required />
                            <input type="tel" name="ref1Telefono" placeholder="Teléfono" value={formData.ref1Telefono} onChange={handleChange} required />
                            <input type="email" name="ref1Mail" placeholder="Correo" value={formData.ref1Mail} onChange={handleChange} required />
                            <input type="text" name="ref1Relacion" placeholder="Relación" value={formData.ref1Relacion} onChange={handleChange} required />
                            <input type="text" name="ref1Domicilio" placeholder="Domicilio" value={formData.ref1Domicilio} onChange={handleChange} required />
                          </div>
                          <h3>PERSONA 2</h3>
                          <div className="grid-form">
                            <input type="text" name="ref2Nombre" placeholder="Nombre" value={formData.ref2Nombre} onChange={handleChange} required />
                            <input type="tel" name="ref2Telefono" placeholder="Teléfono" value={formData.ref2Telefono} onChange={handleChange} required />
                            <input type="email" name="ref2Mail" placeholder="Correo" value={formData.ref2Mail} onChange={handleChange} required />
                            <input type="text" name="ref2Relacion" placeholder="Relación" value={formData.ref2Relacion} onChange={handleChange} required />
                            <input type="text" name="ref2Domicilio" placeholder="Domicilio" value={formData.ref2Domicilio} onChange={handleChange} required />
                          </div>
                          <h3>PERSONA 3</h3>
                          <div className="grid-form">
                            <input type="text" name="ref3Nombre" placeholder="Nombre" value={formData.ref3Nombre} onChange={handleChange} required />
                            <input type="tel" name="ref3Telefono" placeholder="Teléfono" value={formData.ref3Telefono} onChange={handleChange} required />
                            <input type="email" name="ref3Mail" placeholder="Correo" value={formData.ref3Mail} onChange={handleChange} required />
                            <input type="text" name="ref3Relacion" placeholder="Relación" value={formData.ref3Relacion} onChange={handleChange} required />
                            <input type="text" name="ref3Domicilio" placeholder="Domicilio" value={formData.ref3Domicilio} onChange={handleChange} required />
                          </div>
                        </section>
                        
                        {/* SECCIÓN 11: REFEREBCIAS DEL ARRENDADOR ANTERIOR*/} 
                        <section className='seccion'>
                          <h2>REFERENCIAS DEL ARRENDADOR ANTERIOR</h2>
                          <div className="grid-form">
                            <input type="text" name="arrendadorAnteriorNombre" placeholder="Nombre" value={formData.arrendadorAnteriorNombre} onChange={handleChange} required />
                            <input type="tel" name="arrendadorAnteriorTelefono" placeholder="Teléfono" value={formData.arrendadorAnteriorTelefono} onChange={handleChange} required />
                            <input type="email" name="arrendadorAnteriorMail" placeholder="Correo" value={formData.arrendadorAnteriorMail} onChange={handleChange} required />
                            <input type="text" name="arrendadorAnteriorDomicilio" placeholder="Domicilio" value={formData.arrendadorAnteriorDomicilio} onChange={handleChange} required />
                          </div>
                        </section>
                        
                        {/* SECCIÓN 12: OBLIGADO SOLIDARIO*/} 
                        <section className='seccion'>
                          <h2>OBLIGADO SOLIDARIO</h2>
                          <div className="grid-form">
                            <input type="text" name="obligadoNombre" placeholder="Nombre" value={formData.obligadoNombre} onChange={handleChange} required />
                          <input type="text" name="obligadoRepresentante" placeholder="Representante" value={formData.obligadoRepresentante} onChange={handleChange} required />
                          <input type="text" name="obligadoActa" placeholder="Acta" value={formData.obligadoActa} onChange={handleChange} required />
                          <input type="date" name="obligadoFechaActa" placeholder="Fecha de acta" value={formData.obligadoFechaActa} onChange={handleChange} required />
                          <input type="text" name="obligadoPoder" placeholder="Poder" value={formData.obligadoPoder} onChange={handleChange} required />
                          <input type="date" name="obligadoFechaPoder" placeholder="Fecha de poder" value={formData.obligadoFechaPoder} onChange={handleChange} required />
                          <input type="text" name="obligadoNotario" placeholder="Notario" value={formData.obligadoNotario} onChange={handleChange} required />
                          <input type="text" name="obligadoNumeroNotaria" placeholder="Número" value={formData.obligadoNumeroNotaria} onChange={handleChange} required />
                          <input type="text" name="obligadoCiudadNotaria" placeholder="Ciudad" value={formData.obligadoCiudadNotaria} onChange={handleChange} required />
                          </div>
                        </section>
                        
                        {/* SECCIÓN 13: OBLIGADO SOLIDARIO*/} 
                        <section className='seccion'>
                          <h2>DOMICILIO OBLIGADO SOLIDARIO</h2>
                          <div className="grid-form">
                            <input type="text" name="calleObligado" placeholder="Calle" value={formData.calleObligado} onChange={handleChange} required />
                            <input type="text" name="noExteriorObligado" placeholder="No. Exterior" value={formData.noExteriorObligado} onChange={handleChange} required />
                            <input type="text" name="edificioObligado" placeholder="Edificio" value={formData.edificioObligado} onChange={handleChange} required />
                            <input type="text" name="noInteriorObligado" placeholder="No. Interior" value={formData.noInteriorObligado} onChange={handleChange} required />
                            <input type="text" name="cpObligado" placeholder="CP" value={formData.cpObligado} onChange={handleChange} required />
                            <input type="text" name="coloniaObligado" placeholder="Colonia" value={formData.coloniaObligado} onChange={handleChange} required />
                            <input type="text" name="alcaldiaObligado" placeholder="Alcaldía" value={formData.alcaldiaObligado} onChange={handleChange} required />
                            <input type="text" name="estadoObligado" placeholder="Estado" value={formData.estadoObligado} onChange={handleChange} required />
                            <input type="text" name="rfcObligado" placeholder="RFC" value={formData.rfcObligado} onChange={handleChange} required />
                            <input type="tel" name="telefonoObligado" placeholder="Teléfono" value={formData.telefonoObligado} onChange={handleChange} required />
                            <input type="email" name="emailObligado" placeholder="Correo" value={formData.emailObligado} onChange={handleChange} required />
                            <input type="text" name="nombreConyugeObligado" placeholder="Conyugue" value={formData.nombreConyugeObligado} onChange={handleChange} required />
                            <input type="text" name="regimenConyugal" placeholder="Regimen Conyugal" value={formData.regimenConyugal} onChange={handleChange} required />
                          </div>
                        </section>

                        {/* SECCIÓN 13: INMUEBLE EN GARANTÍA*/}
                        <section className='seccion'>
                          <h2>INMUEBLE EN GARANTÍA</h2>
                          <div className="grid-form">
                            <input type="text" name="calleGarantia" placeholder="Calle" value={formData.calleGarantia} onChange={handleChange} required />
                            <input type="text" name="noExteriorGarantia" placeholder="No. Exterior" value={formData.noExteriorGarantia} onChange={handleChange} required />
                            <input type="text" name="edificioGarantia" placeholder="Edificio" value={formData.edificioGarantia} onChange={handleChange} required />
                            <input type="text" name="noInteriorGarantia" placeholder="No. Interior" value={formData.noInteriorGarantia} onChange={handleChange} required />
                            <input type="text" name="cpGarantia" placeholder="CP" value={formData.cpGarantia} onChange={handleChange} required />
                            <input type="text" name="coloniaGarantia" placeholder="Colonia" value={formData.coloniaGarantia} onChange={handleChange} required />
                            <input type="text" name="alcaldiaGarantia" placeholder="Alcaldía" value={formData.alcaldiaGarantia} onChange={handleChange} required />
                            <input type="text" name="estadoGarantia" placeholder="Estado" value={formData.estadoGarantia} onChange={handleChange} required />
                          </div>
                        </section>

                        {/* SECCIÓN 13: DATOS ESCRITURA*/}
                        <section className='seccion'>
                          <h2>DATOS ESCRITURA</h2>
                          <div className="grid-form">
                            <input type="text" name="noEscritura" placeholder="No. Escritura" value={formData.noEscritura} onChange={handleChange} required />
                            <input type="date" name="fechaEscritura" placeholder="Fecha" value={formData.fechaEscritura} onChange={handleChange} required />
                            <input type="text" name="nombreNotarioEscritura" placeholder="Notaro" value={formData.nombreNotarioEscritura} onChange={handleChange} required />
                            <input type="text" name="numeroNotariaEscritura" placeholder="Escritura" value={formData.numeroNotariaEscritura} onChange={handleChange} required />
                            <input type="text" name="ciudadEscritura" placeholder="Ciudad" value={formData.ciudadEscritura} onChange={handleChange} required />
                          </div>
                        </section>
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
                              <input
                                type="checkbox"
                                name="aceptoTerminos"
                                checked={formData.aceptoTerminos}
                                onChange={handleChange}
                                required
                                />
                                <h3>He leído y acepto los términos y condiciones</h3>
                            </label>
                          </div>
                        </section>
                      <button type="submit" className="btn-submit">Enviar Formulario</button>
                    </form>
                  </div>              
                }
            </form>
        </div>
    );
}  
    

export default ContratoCreacion;