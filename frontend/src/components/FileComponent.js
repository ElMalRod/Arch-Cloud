import React, { useState, useEffect } from "react";
import TextEditor from "./TextEditor";
import axios from "axios";
import { Link } from "react-router-dom";
import ImgTXT from "../assets/txtimg.png";
import ImgHTML from "../assets/htmlimg.png";


const FileComponent = ({ file }) => {
  const { _id, filename, extension, path, content, createdAt } = file;
  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(content);
  const userId = localStorage.getItem("userId");

  const handleOpenEditor = () => {
    setIsEditorVisible(true);
  };

  const handleCloseEditor = () => {
    setIsEditorVisible(false);
  };

  const handleUpdateContent = async () => {
    try {
      // Realiza la solicitud para obtener el archivo actualizado
      const response = await axios.get(`http://localhost:4000/api/files/files/${_id}/${filename}`);

      setUpdatedContent(response.data.content);
    } catch (error) {
      console.error("Error al obtener el archivo actualizado:", error);
    }
  };

  useEffect(() => {
    setUpdatedContent(content);
  }, [content]);


  return (
    <div className="bg-gray-100 rounded-xl drop-shadow-sm border h-[200px] w-[220px] overflow-hidden grid grid-cols-1 text-lg p-4 place-content-center hover:bg-gray-300">
      <Link to={`/editor/${_id}/${userId}/${filename}`} className="h-full w-full cursos-pointer">
        <div className="bg-orange-300n grid grid-cols-1">
          <div className="overflow-hidden">
            <p className="text-black font-bold h-auto">{filename}</p>
            <p className="text-gray-500 ">{createdAt}</p>
          </div>
          <div className="bg-blue-100n grid place-content-center">
            <img src={ImgTXT} alt="Imagen de fondo" width={70} height={70} />
          </div>
          <div>
            {/* Renderiza el TextEditor solo si isEditorVisible es true */}
            {isEditorVisible && (
              <div className="bg-blue-400m">
                {/* Pasa el fileId y el contenido actualizado al componente TextEditor */}
                <TextEditor fileId={_id} content={updatedContent} onClose={() => { handleCloseEditor(); handleUpdateContent(); }} />
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FileComponent;
