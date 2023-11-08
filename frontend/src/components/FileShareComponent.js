import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShare } from "react-icons/fa";
import ImgTXT from "../assets/txtimg.png";
import ImgHTML from "../assets/htmlimg.png";
import TextEditor from "./TextEditor";
import axios from "axios";

const getFileImage = (extension) => {
  switch (extension) {
    case ".txt":
      return ImgTXT;
    case ".html":
      return ImgHTML;
    default:
      return null;
  }
};

const FileShareComponent = ({ file }) => {
  const { _id,user_id, filename, extension, content, createdAt } = file.file;
  const { sharedBy } = file;
  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(file.file.content); // Sin ".file" aquí

  const handleCloseEditor = () => {
    setIsEditorVisible(false);
  };

  const handleUpdateContent = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/files/files/${_id}/${filename}`
      );

      setUpdatedContent(response.data.content);
    } catch (error) {
      console.error("Error al obtener el archivo actualizado:", error);
    }
  };

  useEffect(() => {
    setUpdatedContent(content);
  }, [content]);

  return (
    <div className="bg-gray-100 rounded-xl drop-shadow-sm border h-[200px] w-[220px] grid grid-cols-1 text-lg place-content-start justify-items-center hover:bg-gray-300">
      <div className="text-red-400 flex justify-self-end pt-4 pr-2">

      </div>

      <Link to={`/editor/${_id}/${user_id}/${filename}`} className="h-full w-full cursor-pointer text-sm px-4">
        <div className="bg-orange-300n grid grid-cols-1">
          <div className="overflow-hidden flex ">
            <div>
              <p className="text-gray-700 font-bold h-auto">{filename}</p>
              <p className="text-gray-500 ">{createdAt}</p>

              <p className="text-gray-500">Compartido por: {sharedBy}</p>
            </div>
          </div>
          <div className="bg-blue-100n grid place-content-center">
            <img
              src={getFileImage(extension)}
              alt="Imagen de fondo"
              width={70}
              height={70}
            />
          </div>
          <div>
            {isEditorVisible && (
              <div className="bg-blue-400m">
                <TextEditor
                  fileId={_id}
                  content={updatedContent}
                  onClose={() => {
                    handleCloseEditor();
                    handleUpdateContent();
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FileShareComponent;
