import React from "react";
import { Link } from "react-router-dom";
import { FaFolder } from 'react-icons/fa';

const DirectoryComponent = ({ directory }) => {
  const { _id, name } = directory;

  console.log('URL generada:', `/directory/${_id}/${encodeURIComponent(name)}`);

  return (
    <div className="bg-gray-100 rounded-xl drop-shadow-sm h-[50px] w-[220px] overflow-hidden grid grid-cols-1 text-lg place-content-center hover:bg-gray-300">
      <Link to={`/directory/${_id}/${encodeURIComponent(name)}`} className="h-[50px] w-full text-center cursor-pointer">
        <div className="flex items-center h-full pl-4 text-gray-600">
              <FaFolder/>
            <p className="font-bold pl-2">
              {name}
            </p>
        </div>
      </Link>
    </div>
  );
};

export default DirectoryComponent;
