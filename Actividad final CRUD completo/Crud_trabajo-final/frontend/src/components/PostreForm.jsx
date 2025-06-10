import React, { useState, useEffect } from 'react';

const PostreForm = ({ obtenerPostres, postreEditado, setPostreEditado }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState('');

  useEffect(() => {
    if (postreEditado) {
      setNombre(postreEditado.nombre);
      setDescripcion(postreEditado.descripcion);
      setPrecio(postreEditado.precio);
      setImagen(postreEditado.imagen);
    }
  }, [postreEditado]);

  const manejarSubmit = async (e) => {
    e.preventDefault();
    const nuevoPostre = { nombre, descripcion, precio, imagen };

    if (postreEditado) {
      await fetch(\`http://localhost:3001/api/postres/\${postreEditado.id}\`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoPostre),
      });
      setPostreEditado(null);
    } else {
      await fetch('http://localhost:3001/api/postres', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoPostre),
      });
    }

    setNombre('');
    setDescripcion('');
    setPrecio('');
    setImagen('');
    obtenerPostres();
  };

  return (
    <form onSubmit={manejarSubmit}>
      <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      <input type="text" placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
      <input type="number" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
      <input type="text" placeholder="URL de la imagen" value={imagen} onChange={(e) => setImagen(e.target.value)} required />
      <button type="submit">{postreEditado ? 'Actualizar' : 'Agregar'}</button>
    </form>
  );
};

export default PostreForm;