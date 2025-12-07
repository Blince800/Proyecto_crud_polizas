// formulario-arrendamiento/src/components/ContratoEdicion.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Necesario para obtener el ID y navegar

// URL base de tu API de Django
const API_BASE_URL = 'http://localhost:8000/api/'; 


// La estructura de este estado DEBE coincidir con la respuesta del ContratoDetalleSerializer.
const initialFormData = {
    // ------------------------------------------------
    // 1. CONTRATO (Entidad principal)
    // ------------------------------------------------
    contrato: {
        id_contrato: null, 
        fecha_inicio: '',
        fecha_termino: '',
        renta_mensual: 0,
        mas_iva: false,
        iva_incluido: false,
        mantenimiento_incluido: false,
        // ... otros campos del modelo Contratos
    },
    // ------------------------------------------------
    // 2. ARRENDADOR (Entidad anidada Persona)
    // ------------------------------------------------
    arrendador: { 
        id_persona: null,
        nombre: '',
        rfc: '',
        telefono: '',
        email: '',
        // ... otros campos de Persona
        id_domicilio: { // Domicilio anidado (Foreign Key)
            id_domicilio: null,
            calle: '',
            no_exterior: '',
            cp: '',
            colonia: '',
            alcaldia_municipio: '',
            estado: '',
        }
    },
    // ------------------------------------------------
    // 3. INMUEBLE (Entidad anidada Inmuebles)
    // ------------------------------------------------
    inmueble: { 
        id_inmueble: null,
        giro_negocio: '',
        uso_habitacion: false,
        uso_oficina: false,
        // ... otros campos de Inmuebles
        id_domicilio: { 
            id_domicilio: null,
            calle: '',
            no_exterior: '',
            cp: '',
            colonia: '',
            alcaldia_municipio: '',
            estado: '',
        }
    },
    // Nota: Aquí se deben incluir otras entidades relacionadas que manejes
    // (ej. arrendatario, obligado solidario, etc.)
};


const ContratoEdicion = () => {
    // Obtiene el ID de la URL (ej: /contratos/editar/123)
    const { id: contratoId } = useParams(); 
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    
    // ----------------------------------------------------
    // LÓGICA DE LECTURA DE DATOS (GET ÚNICO)
    // ----------------------------------------------------
    // La declaración de 'id' ya la tienes: const { id } = useParams();

useEffect(() => {
    // 1. Definir la función de fetching
    const fetchContrato = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}contratos/${id}/`);
            let data = response.data;
            
            // Si Django devuelve las fechas como '2025-11-23T...', hay que formatearlas
            if (data.contrato.fecha_inicio) {
                data.contrato.fecha_inicio = data.contrato.fecha_inicio.split('T')[0];
            }
            if (data.contrato.fecha_termino) {
                data.contrato.fecha_termino = data.contrato.fecha_termino.split('T')[0];
            }

            // 2. Establecer el estado con los datos obtenidos
            setFormData(data);
            setLoading(false);

        } catch (error) {
            console.error("Error al obtener el contrato:", error);
            setError("No se pudo cargar el contrato. Verifique el ID.");
            setLoading(false);
        }
    };

    if (id) {
        fetchContrato();
    } else {
        setError("ID de contrato no proporcionado.");
        setLoading(false);
    }
}, [id]); // Dependencia del ID

    // ----------------------------------------------------
    // MANEJADOR DE CAMBIOS (PARA ESTADO ANIDADO)
    // ----------------------------------------------------
    const handleChange = (section, isNested = false) => (e) => {
        const { name, value, type, checked } = e.target;
        
        setFormData(prev => {
            // Caso 1: Edición de un campo del Domicilio (anidado)
            if (isNested) {
                return {
                    ...prev,
                    [section]: {
                        ...prev[section],
                        id_domicilio: { // Accede al objeto Domicilio
                            ...prev[section].id_domicilio,
                            [name]: value
                        }
                    }
                };
            }
            
            // Caso 2: Edición de un campo directo (Contrato, Persona, Inmueble)
            return {
                ...prev,
                [section]: {
                    ...prev[section],
                    [name]: type === 'checkbox' ? checked : value
                }
            };
        });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        // La dataParaDjango es esencialmente todo el formData
        // Es la misma estructura que en Creación, pero con los IDs de PKs.
        const dataParaDjango = formData; 
        
        // Usamos PATCH para actualizar solo los campos que Django detecte como cambiados.
        // La URL debe incluir el ID.
        const response = await axios.patch(
            `${API_BASE_URL}contratos/${id}/`, 
            dataParaDjango
            // AGREGAR headers de autenticación aquí cuando sea el momento
        );

        console.log("Actualización exitosa:", response.data);
        alert('Contrato actualizado con éxito!');
        // Si tienes declarado navigate:
        // navigate('/listado'); 

    } catch (error) {
        console.error("Error al actualizar el contrato:", error.response ? error.response.data : error.message);
        const errorMessage = error.response 
            ? JSON.stringify(error.response.data, null, 2) 
            : error.message;
        alert(`Error de validación en Django:\n${errorMessage}`);
    } finally {
        setLoading(false);
    }
};

    const handleDelete = async () => {
    // Confirmación de seguridad
    if (!window.confirm('¿Estás seguro de que deseas eliminar este contrato y toda su información relacionada? Esta acción es IRREVERSIBLE.')) {
        return;
    }
    
    setLoading(true);
    
    try {
        // La petición DELETE solo necesita la URL de detalle (con el ID)
        await axios.delete(`${API_BASE_URL}contratos/${id}/`);

        alert('Contrato eliminado con éxito.');
        navigate('/listado'); // Redirige al listado después de eliminar

    } catch (error) {
        console.error("Error al eliminar el contrato:", error.response ? error.response.data : error.message);
        alert(`Error al eliminar el contrato: ${error.message}`);
    } finally {
        setLoading(false);
    }
};
    // ----------------------------------------------------
    // LÓGICA DE ACTUALIZACIÓN (PATCH SECUENCIAL)
    // ----------------------------------------------------
    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { arrendador, inmueble, contrato } = formData;
        
        try {
            // A. Actualizar Arrendador (Persona + Domicilio anidado)
            await axios.patch(
                `${API_BASE_URL}personas/${arrendador.id_persona}/`, 
                arrendador // Envía el objeto completo y estructurado
            );
            
            // B. Actualizar Inmueble (Inmueble + Domicilio anidado)
            await axios.patch(
                `${API_BASE_URL}inmuebles/${inmueble.id_inmueble}/`,
                inmueble // Envía el objeto completo y estructurado
            );

            // C. Actualizar Contrato Principal
            await axios.patch(
                `${API_BASE_URL}contratos/${contrato.id_contrato}/`,
                contrato
            );

            alert('✅ Contrato actualizado con éxito. ¡Flujo de edición optimizado!');
            // Redirige al usuario a la lista de contratos
            navigate('/listado-contratos'); 
            
        } catch (error) {
            setError('Error al guardar la actualización. Revisa la consola.');
            console.error('Fallo en la actualización secuencial:', error.response ? error.response.data : error);
        } finally {
            setLoading(false);
        }
    };


    if (loading) return <div className="loading">Cargando datos del contrato ID: {contratoId}...</div>;
    if (error) return <div className="error-message">{error}</div>;

    // ----------------------------------------------------
    // RENDERIZADO DEL FORMULARIO
    // ----------------------------------------------------
    return (
        <div className="container">
            <h2>Editar Contrato ID: {contratoId}</h2>
            <form onSubmit={handleUpdate} className="formulario">
                
                {/* ------------------ SECCIÓN ARRENDADOR ------------------ */}
                <section className="seccion">
                    <h3>DATOS DEL ARRENDADOR</h3>
                    <input 
                        type="text" name="nombre" placeholder="Nombre" 
                        value={formData.arrendador.nombre || ''} 
                        onChange={handleChange('arrendador')}
                        required
                    />
                    <input 
                        type="email" name="email" placeholder="Email" 
                        value={formData.arrendador.email || ''} 
                        onChange={handleChange('arrendador')}
                        required
                    />
                    
                    {/* Campos de DOMICILIO (anidados) */}
                    <h4>Domicilio Arrendador</h4>
                    <input 
                        type="text" name="calle" placeholder="Calle" 
                        value={formData.arrendador.id_domicilio.calle || ''} 
                        onChange={handleChange('arrendador', true)} // ¡'true' para anidado!
                        required
                    />
                    <input 
                        type="text" name="cp" placeholder="C.P." 
                        value={formData.arrendador.id_domicilio.cp || ''} 
                        onChange={handleChange('arrendador', true)}
                        required
                    />
                    {/* ... (Añadir todos los campos restantes de Domicilio) ... */}
                </section>
                
                {/* ------------------ SECCIÓN INMUEBLE ------------------ */}
                <section className="seccion">
                    <h3>DATOS DEL INMUEBLE</h3>
                    <label>
                        <input 
                            type="checkbox" name="uso_habitacion" 
                            checked={formData.inmueble.uso_habitacion} 
                            onChange={handleChange('inmueble')}
                        />
                        Uso Habitación
                    </label>
                    {/* ... (Añadir otros campos de Inmueble, incluyendo usos) ... */}
                    
                    {/* Campos de DOMICILIO del Inmueble (anidados) */}
                    <h4>Domicilio Inmueble</h4>
                    <input 
                        type="text" name="calle" placeholder="Calle Inmueble" 
                        value={formData.inmueble.id_domicilio.calle || ''} 
                        onChange={handleChange('inmueble', true)} // ¡'true' para anidado!
                        required
                    />
                    {/* ... (Añadir todos los campos restantes de Domicilio Inmueble) ... */}
                </section>

                {/* ------------------ SECCIÓN CONTRATO ------------------ */}
                <section className="seccion">
                    <h3>CONDICIONES DEL ARRENDAMIENTO</h3>
                    <input 
                        type="number" name="renta_mensual" placeholder="Renta Mensual" 
                        value={formData.contrato.renta_mensual || 0} 
                        onChange={handleChange('contrato')}
                        required
                    />
                    <label>Fecha Inicio
                        <input 
                            type="date" name="fecha_inicio" 
                            value={formData.contrato.fecha_inicio || ''} 
                            onChange={handleChange('contrato')}
                            required
                        />
                    </label>
                    {/* ... (Añadir todos los campos restantes del Contrato) ... */}
                </section>
                
                {/* ------------------ BOTÓN DE ENVÍO ------------------ */}
                <button type="submit" className="btn-submit" disabled={loading}>
                    {loading ? 'Guardando Cambios...' : 'Guardar Cambios'}
                </button>
                <button type="button" // 👈 MUY IMPORTANTE: Es 'button', no 'submit', para no disparar handleSubmit
                    className="btn-delete" 
                    onClick={handleDelete} 
                    disabled={loading}>
                    Eliminar Contrato
                </button>
            </form>
        </div>
    );
};

export default ContratoEdicion;