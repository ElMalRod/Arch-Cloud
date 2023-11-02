import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaFileAlt, FaSave, FaShareAlt, FaTrashAlt, FaArrowLeft } from 'react-icons/fa';
import Alert from '@material-ui/lab/Alert';

function TextEditor({ content, fileId, onClose }) {
  console.log("Contenido en TextEditor:", content);
  const [editedContent, setEditedContent] = useState(content);
  const [isSaving, setIsSaving] = useState(false);
  const [isAlertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    setEditedContent(content);
  }, [content]);

  const handleSave = async () => {
    try {
      // Realiza la solicitud para guardar el contenido
      await axios.post(`http://localhost:4000/api/files/save/${fileId}`, { content: editedContent });
      console.log("Contenido guardado exitosamente:", editedContent);
      // Recarga la página después de guardar
      setAlertVisible(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error al guardar el contenido:", error.response.data);
    }
  };

  const handleGoBack = () => {

    window.history.back();
  };

  return (
    <div className="fixed top-0 inset-0 grid grid-cols-1 place-content-start justify-items-center bg-gray-200 bg-opacity-40 overflow-x-scroll">
      <div className="flex items-center h-[100px] pl-4 text-2xl text-gray-600">
        <div><FaFileAlt /></div>
        <p> Nombre del documento</p>
        <div onClick={handleSave}
          disabled={isSaving}
          className={`px-2 hover:text-[#4592AF] ${
            isSaving ? "opacity-50 cursor-not-allowed" : ""
          }`}> <FaSave /> </div>
        <div className="px-2 hover:text-[#4592AF]" ><FaShareAlt /> </div>
        <div className="px-2 hover:text-[#4592AF]" ><FaTrashAlt /> </div>
      </div>
      {isAlertVisible && (
        <Alert severity="success" onClose={() => setAlertVisible(false)}>
          Contenido guardado exitosamente
        </Alert>
      )}
      <div
        className="cursor-pointer hover:bg-gray-300 ease-in text-2xl rounded-full h-[50px] w-[50px] mx-8 flex items-center text-center justify-center justify-self-start"
        onClick={handleGoBack}
      >
        <FaArrowLeft />
      </div>
      <div className="m-8 w-[60%]">
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="w-full h-[1000px] px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500 "
          placeholder="Escribe aquí..."
        />
      </div>
    </div>
  );
}

export default TextEditor;
