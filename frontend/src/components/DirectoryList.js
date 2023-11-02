import React, { useEffect, useState } from "react";
import axios from "axios";
import DirectoryComponent from "./DirectoryComponent";
import { useParams } from "react-router-dom";

const DirectoryList = () => {
  const { directoryId } = useParams();
  const [directories, setDirectories] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const directoryroot = localStorage.getItem("directoryId");

    // Si no hay directoryId, realiza una solicitud para obtener los directorios del directorio raíz
    const apiEndpoint = directoryId
      ? `http://localhost:4000/api/directories/subdirectories/${userId}/${directoryId}`
      : `http://localhost:4000/api/directories/subdirectories/${userId}/${directoryroot}`;

    axios
      .get(apiEndpoint)
      .then((response) => {
        setDirectories(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener directorios:", error);
      });
  }, [directoryId]);

  return (
    <div className="w-full h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 place-content-start justify-items-center gap-2 pt-2 pl-4">
      {directories
        .filter((directory) => directory._id !== localStorage.getItem("directoryId"))
        .map((directory) => (
          <div key={directory._id}>
            <DirectoryComponent directory={directory} />
          </div>
        ))}
    </div>
  );
};

export default DirectoryList;
