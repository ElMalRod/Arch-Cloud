import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TextEditor from "./TextEditor";
import axios from "axios";
import { FaFileAlt, FaSave, FaShareAlt, FaTrashAlt, FaArrowLeft } from 'react-icons/fa';
import Alert from '@material-ui/lab/Alert';

function TextEditorPage() {
  const { userId, filename, fileId } = useParams();
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isAlertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/files/files/${userId}/${filename}`);
        setContent(response.data.content);
      } catch (error) {
        console.error("Error al obtener el contenido del archivo:", error);
      }
    };

    fetchData();
  }, [userId, filename]);

  const handleSave = async (editedContent) => {
    try {
      if (!fileId) {
        console.error("fileId no está definido");
        return;
      }

      await axios.post(`http://localhost:4000/api/files/save/${fileId}`, { content: editedContent });
      console.log("Contenido guardado exitosamente:", editedContent);

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
    <div>
      <div className="fixed top-0 inset-0 grid grid-cols-1 place-content-start justify-items-center bg-gray-200 bg-opacity-40 overflow-y-scroll">
        <div className="flex items-center h-[100px] pl-4 text-2xl text-gray-600">
          <div className="pr-2"><FaFileAlt /></div>
          <p> Nombre del documento</p>
          <div
            onClick={() => handleSave(content)}
            disabled={isSaving}
            className={`px-2 hover:text-[#4592AF] ${
              isSaving ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <FaSave />
          </div>
          <div className="px-2 hover:text-teal-500" ><FaShareAlt /> </div>
          <div className="px-2 hover:text-red-500" ><FaTrashAlt /> </div>
        </div>
        {isAlertVisible && (
          <Alert severity="success" onClose={() => setAlertVisible(false)}>
            Contenido guardado exitosamente
          </Alert>
        )}
        <div
          className="cursor-pointer hover:bg-gray-300 ease-in text-2xl rounded-full h-[50px] w-[50px] mx-8 flex items-center text-center justify-center justify-self-start "
          onClick={handleGoBack}
        >
          <FaArrowLeft />
        </div>
        <TextEditor fileId={fileId} content={content} onContentChange={setContent} />
      </div>
    </div>
  );
}

export default TextEditorPage;
