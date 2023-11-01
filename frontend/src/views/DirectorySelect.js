import React from 'react';
import { useParams } from 'react-router-dom';


const DirectorySelect = () => {
  const { directoryId, directoryName } = useParams();
  console.log('ID:', directoryId);
  console.log('Nombre:', decodeURIComponent(directoryName));

  return (
    <div>
      <h2>Directorio Seleccionado</h2>
      <p>ID: {directoryId}</p>
      <p>Nombre: {decodeURIComponent(directoryName)}</p>
    </div>
  );
};

export default DirectorySelect;
