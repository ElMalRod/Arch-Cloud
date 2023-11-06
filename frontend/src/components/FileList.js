import React, { useEffect, useState } from "react";
import axios from "axios";
import FileComponent from "./FileComponent";
import { useParams } from "react-router-dom";
import MoveList from "./MoveList";

const FileList = () => {
  const { directoryId } = useParams();
  const [files, setFiles] = useState([]);
  const [isMoveListOpen, setIsMoveListOpen] = useState(false);
  const [directories, setDirectories] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const directoryroot = localStorage.getItem("directoryId");

    const apiEndpoint = directoryId
      ? `http://localhost:4000/api/files/directory/${directoryId}`
      : `http://localhost:4000/api/files/directory/${directoryroot}`;

    axios
      .get(apiEndpoint)
      .then((response) => {
        setFiles(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener archivos del directorio:", error);
      });
  }, [directoryId]);

  return (
    <div className="w-full">
      <div className="w-full h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 place-content-start justify-items-center gap-2 pt-2 ">
        {files.map((file) => (
          <FileComponent
            key={file._id}
            file={file}
            isMoveListOpen={isMoveListOpen}
            setIsMoveListOpen={setIsMoveListOpen}
            directories={directories}
          />
        ))}
      </div>
      {/* componente MoveList*/}
      <MoveList
        isOpen={isMoveListOpen}
        onClose={setIsMoveListOpen}
        userId={userId}
        directoryId={directoryId}
      />
    </div>
  );
};

export default FileList;
