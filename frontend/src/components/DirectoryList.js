import React, { useEffect, useState } from "react";
import axios from "axios";
import DirectoryComponent from "./DirectoryComponent";

const DirectoryList = ({ parentDirectoryId, match }) => {
  const [directories, setDirectories] = useState([]);


  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const apiEndpoint = parentDirectoryId
      ? `http://localhost:4000/api/directories/${parentDirectoryId}/subdirectories`
      : `http://localhost:4000/api/directories/${userId}`;

    axios
      .get(apiEndpoint)
      .then((response) => {
        setDirectories(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener directorios del usuario:", error);
      });
  }, [parentDirectoryId]);


  return (
    <div className="w-full h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 place-content-start justify-items-center gap-2 pt-2">
      {directories
        .filter((directory) => directory._id !== localStorage.getItem("directoryId"))
        .map((directory) => (
          <div
            key={directory._id}

          >
            <DirectoryComponent directory={directory} />
          </div>
        ))}
    </div>
  );
};

export default DirectoryList;
