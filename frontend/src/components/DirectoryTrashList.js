// DirectoryTrashList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import DirectoryTrashComponent from "./DirectoryTrashComponent";

const DirectoryTrashList = () => {
  const [trashedDirectories, setTrashedDirectories] = useState([]);

  useEffect(() => {
    const fetchTrashedDirectories = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(`http://localhost:4000/api/trash/trashed-directories`);
        setTrashedDirectories(response.data);
      } catch (error) {
        console.error("Error al obtener directorios eliminados:", error);
      }
    };

    fetchTrashedDirectories();
  }, []);

  return (
    <div className="w-full h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 place-content-start justify-items-center gap-2 pt-2 pl-4">
      {trashedDirectories.map(({ trashedDirectory, directoryInfo }) => (
        <div key={trashedDirectory._id}>
          <DirectoryTrashComponent
            trashedDirectory={trashedDirectory}
            directoryInfo={directoryInfo}
          />
        </div>
      ))}
    </div>
  );
};

export default DirectoryTrashList;
