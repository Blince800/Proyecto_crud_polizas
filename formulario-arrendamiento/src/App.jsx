import React, { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({

    //Domicilio Arrendador
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
    
    //Tipo de Cobertura
    tipoCobertura: '',
    montoPoliza: '',
    
    //Cuenta Bancaria
    banco: '',
    beneficiario: '',
    cuentaBancaria: '',
    clabe: '',
    
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
    masIva: false,
    ivaIncluido: false,
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
    ciudadEscritura: ''
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí puedes manejar el envío del formulario
    console.log('Datos del formulario:', formData)
    alert('Formulario enviado correctamente')
  }

  return (
    <div className="app">
      <form onSubmit={handleSubmit} className="formulario">
        <h1>Formulario de Arrendamiento</h1>

        {/* SECCIÓN 1: DOMICILIO ARRENDADOR */}
        <section className="seccion">
          <h2>DOMICILIO COMPLETO DEL ARRENDADOR (PARA RECIBIR NOTIFICACIONES)</h2>
          <div className="grid-form">
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

        {/* SECCIÓN 2: TIPO DE COBERTURA */}
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
            <input type="text" name="montoPoliza" placeholder="Monto" value={formData.montoPoliza} onChange={handleChange} required />
          </div>
        </section>

        {/* SECCIÓN 3: CUENTA BANCARIA */}
        <section className="seccion">
          <h2>CUENTA BANCARIA PARA EL PAGO DE LA RENTA</h2>
          <div className="grid-form">
            <input type="text" name="banco" placeholder="Nombre del banco" value={formData.banco} onChange={handleChange} required />
            <input type="text" name="beneficiario" placeholder="Beneficiario" value={formData.beneficiario} onChange={handleChange} required />
            <input type="text" name="cuentaBancaria" placeholder="Cuenta" value={formData.cuentaBancaria} onChange={handleChange} required />
            <input type="text" name="clabe" placeholder="Clabe interbancaria" value={formData.clabe} onChange={handleChange} required />
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
          <div className="checkbox-group">
            <label>
              <input type="checkbox" name="masIva" checked={formData.masIva} onChange={handleChange} />
              MÁS IVA
            </label>
            <label>
              <input type="checkbox" name="ivaIncluido" checked={formData.ivaIncluido} onChange={handleChange} />
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
            <h2>REFEREBCIAS DEL ARRENDADOR ANTERIOR</h2>
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
                obran en este documento.</h3>
              </div>
          </section>
        <button type="submit" className="btn-submit">Enviar Formulario</button>
      </form>
    </div>
  )
}

export default App