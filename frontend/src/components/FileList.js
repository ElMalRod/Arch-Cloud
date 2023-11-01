import React, { useEffect, useState } from "react";
import axios from "axios";
import FileComponent from "./FileComponent";

const FileList = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Obtener el ID de usuario del almacenamiento local
    const userId = localStorage.getItem("userId");
    const directoryId = localStorage.getItem("directoryId");

    // Realizar la solicitud para obtener archivos del directorio raíz
    axios
      .get(`http://localhost:4000/api/files/directory/${directoryId}`)
      .then((response) => {
        setFiles(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener archivos del directorio raíz:", error);
      });
  }, []);


  return (
    <div className="w-full bg-green-100">
     <div className="w-full h-full  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 place-content-start justify-items-center gap-2 pt-2 ">

      {/* Mapear sobre la lista de archivos y renderizar un componente File para cada uno */}
      {files.map((file) => (
        <FileComponent key={file._id} file={file} />
      ))}
    </div>
    </div>
  );
};

export default FileList;
