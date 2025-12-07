import React from 'react';
import { useNavigate } from 'react-router-dom'; // 💡 Importar para la navegación

function ContratoListado() {
    // Inicializar el hook de navegación
    const navigate = useNavigate();

    // 1. Datos Dummy (Estos serán reemplazados por una petición GET a tu API)
    const contratosDummy = [
        { id: 1, arrendador: 'Juan Pérez S.', inmueble: 'Calle 5 No. 101', renta: 15000 },
        { id: 2, arrendador: 'Inversiones XYZ S.A.', inmueble: 'Av. Reforma 405', renta: 25000 },
        { id: 3, arrendador: 'Ana María G.', inmueble: 'Pino Suárez 12', renta: 8000 },
    ];

    // 2. Función para manejar la edición
    const handleEdit = (id) => {
        // Redirige a la ruta /editar/ID_DEL_CONTRATO
        navigate(`/editar/${id}`);
    };

    // 3. Función para manejar la eliminación (aquí iría la petición DELETE)
    const handleDelete = (id) => {
        if (window.confirm(`¿Estás seguro de eliminar el contrato ID ${id}?`)) {
            console.log(`Eliminando contrato ID: ${id}. Aquí iría la llamada a axios.delete()...`);
            // Lógica de eliminación (axios.delete)
            // Luego se actualizaría el listado
        }
    };

    return (
        <div className="listado-container">
            <h1>📋 Lista de Contratos Activos</h1>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Arrendador</th>
                        <th>Inmueble</th>
                        <th>Renta Mensual</th>
                        <th>Acciones</th> 
                    </tr>
                </thead>
                <tbody>
                    {contratosDummy.map((contrato) => (
                        <tr key={contrato.id}>
                            <td>{contrato.id}</td>
                            <td>{contrato.arrendador}</td>
                            <td>{contrato.inmueble}</td>
                            <td>${contrato.renta.toLocaleString('es-MX')}</td>
                            
                            {/* 🌟 COLUMNA DE ACCIONES 🌟 */}
                            <td>
                                <button 
                                    onClick={() => handleEdit(contrato.id)} 
                                    className="btn-accion edit"
                                >
                                    Editar
                                </button>
                                <button 
                                    onClick={() => handleDelete(contrato.id)} 
                                    className="btn-accion delete"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ContratoListado;