import React from 'react';
import PostreItem from './PostreItem';

const PostreList = ({ postres, obtenerPostres, setPostreEditado }) => {
  return (
    <div>
      {postres.map((postre) => (
        <PostreItem
          key={postre.id}
          postre={postre}
          obtenerPostres={obtenerPostres}
          setPostreEditado={setPostreEditado}
        />
      ))}
    </div>
  );
};

export default PostreList;