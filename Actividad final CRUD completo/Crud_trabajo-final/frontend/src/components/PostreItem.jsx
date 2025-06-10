import React from 'react';

const PostreItem = ({ postre, obtenerPostres, setPostreEditado }) => {
  const eliminarPostre = async () => {
    await fetch(\`http://localhost:3001/api/postres/\${postre.id}\`, {
      method: 'DELETE',
    });
    obtenerPostres();
  };

  return (
    <div>
      <h3>{postre.nombre}</h3>
      <p>{postre.descripcion}</p>
      <p>${postre.precio}</p>
      <img src={postre.imagen} alt={postre.nombre} width="100" />
      <button onClick={() => setPostreEditado(postre)}>Editar</button>
      <button onClick={eliminarPostre}>Eliminar</button>
    </div>
  );
};

export default PostreItem;