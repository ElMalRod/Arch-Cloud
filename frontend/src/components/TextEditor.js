import React, { useState, useEffect } from "react";
import axios from "axios";

function TextEditor({ content, fileId, onClose }) {
  console.log("Contenido en TextEditor:", content);
  const [editedContent, setEditedContent] = useState(content);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setEditedContent(content);
  }, [content]);

  const handleSave = async () => {
    try {
      // Realiza la solicitud para guardar el contenido
      await axios.post(`http://localhost:4000/api/files/save/${fileId}`, { content: editedContent });

      console.log("Contenido guardado exitosamente:", editedContent);

      // Recarga la página después de guardar
      window.location.reload();
    } catch (error) {
      console.error("Error al guardar el contenido:", error.response.data);
    }
  };

  return (
    <div className="fixed top-0 inset-0 flex items-center justify-center bg-teal-500 bg-opacity-75 z-300">
      <h1 className="text-2xl font-semibold mb-4">Editor de Texto</h1>
      <textarea
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
        className="w-full h-40 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
        placeholder="Escribe aquí..."
      />
      <div className="mt-4">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-400 focus:outline-none focus:ring focus:border-blue-300 ${
            isSaving ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSaving ? "Guardando..." : "Guardar"}
        </button>
        <button
          onClick={onClose}
          className="ml-2 bg-gray-300 text-gray-600 px-6 py-2 rounded hover:bg-gray-400 focus:outline-none focus:ring focus:border-gray-300"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default TextEditor;
