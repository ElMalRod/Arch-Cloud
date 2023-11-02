import React, { useState, useEffect } from 'react';
import TextEditor from "./TextEditor";
function NewDocument() {

  return (
    <div>
    <h1>Nuevo Documento</h1>
      {/* Contenido para un nuevo documento */}
      <TextEditor fileId={null} content="" onClose={() => {}} />
    </div>
  );
}

export default NewDocument;
