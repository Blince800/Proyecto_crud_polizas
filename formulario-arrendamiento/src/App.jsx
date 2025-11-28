// formulario-arrendamiento/src/App.jsx (Nuevo Contenido: Router Principal)

import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// Importamos los 3 componentes (Asegúrate de que ContratoEdicion.jsx exista)
import ContratoEdicion from './components/ContratoEdicion'; 
import ContratoCreacion from './components/ContratoCreacion'; // ¡El formulario que acabas de mover!
import ContratoListado from './components/ContratoListado'; // (Si no lo has creado, pon el dummy que te di antes)

function App() {
  return (
    <div className="main-layout">
        <header className="navbar">
            <nav>
                <Link to="/listado">📋 Listado de Contratos</Link>
                {' | '} 
                <Link to="/crear">➕ Crear Nuevo Contrato</Link>
                {' | '} 
                <Link to="/editar/123">✏️ Editar Contrato Demo (ID 123)</Link>
            </nav>
        </header>

        <main className="content">
            <Routes>
                {/* 1. Ruta para Listar (página principal) */}
                <Route path="/" element={<ContratoListado />} />
                <Route path="/listado" element={<ContratoListado />} />
                
                {/* 2. Ruta para Crear Contrato (Tu formulario POST) */}
                <Route path="/crear" element={<ContratoCreacion />} />

                {/* 3. Ruta para Editar Contrato (Tu componente PATCH optimizado) */}
                <Route path="/editar/:id" element={<ContratoEdicion />} />
                
                <Route path="*" element={<h1>404: Página no encontrada</h1>} />
            </Routes>
        </main>
    </div>
  );
}

export default App;