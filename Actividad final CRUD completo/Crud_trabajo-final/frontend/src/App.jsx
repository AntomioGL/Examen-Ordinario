import React, { useState, useEffect } from 'react';
import PostreForm from './components/PostreForm';
import PostreList from './components/PostreList';

const App = () => {
  const [postres, setPostres] = useState([]);
  const [postreEditado, setPostreEditado] = useState(null);

  const obtenerPostres = async () => {
    const res = await fetch('http://localhost:3001/api/postres');
    const data = await res.json();
    setPostres(data);
  };

  useEffect(() => {
    obtenerPostres();
  }, []);

  return (
    <div>
      <h1>Catálogo de Repostería</h1>
      <PostreForm
        obtenerPostres={obtenerPostres}
        postreEditado={postreEditado}
        setPostreEditado={setPostreEditado}
      />
      <PostreList
        postres={postres}
        obtenerPostres={obtenerPostres}
        setPostreEditado={setPostreEditado}
      />
    </div>
  );
};

export default App;