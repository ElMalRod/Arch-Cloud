// DirectoryTrashComponent.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFolder } from 'react-icons/fa';
import axios from "axios";

const DirectoryTrashComponent = ({ trashedDirectory, directoryInfo }) => {
  const { name } = directoryInfo;
  const [trashedBy, setTrashedBy] = useState("");
  const [trashedAt, setTrashedAt] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/users/${trashedDirectory.trashed_by}`);
        setTrashedBy(response.data.name);

        const trashedDate = new Date(trashedDirectory.createdAt);
        // Verifica si la fecha es válida antes de formatearla
        if (!isNaN(trashedDate.getTime())) {
          setTrashedAt(trashedDate.toLocaleString());
        }
      } catch (error) {
        console.error("Error al obtener información del usuario:", error);
      }
    };

    fetchUserInfo();
  }, [trashedDirectory.trashed_by, trashedDirectory.createdAt]);

  return (
    <div className="bg-gray-100 rounded-xl drop-shadow-sm h-[50px] w-[250px] grid grid-cols-1 text-lg place-content-center hover:bg-gray-300">
      <Link to={`/directory/${directoryInfo._id}/${encodeURIComponent(name)}`} className="h-[50px] w-full text-center cursor-pointer overflow-hidden">
        <div className="flex items-center h-full pl-4 text-gray-600">
          <FaFolder />
          <p className="font-bold pl-2">{name}</p>
        </div>
      </Link>
      <div className="flex justify-self-end pt-4 pr-2">
      <p className="text-gray-500 text-sm ">{`Eliminado por: ${trashedBy}`}</p>
      </div>
    </div>
  );
};

export default DirectoryTrashComponent;
