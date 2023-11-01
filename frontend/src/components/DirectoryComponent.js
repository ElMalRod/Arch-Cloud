import React from "react";
import { Link } from "react-router-dom";

const DirectoryComponent = ({ directory }) => {
  const { _id, name } = directory;

  console.log('URL generada:', `/directory/${_id}/${encodeURIComponent(name)}`);

  return (
    <div className="bg-gray-100 rounded-xl drop-shadow-sm border h-[100px] w-[220px] overflow-hidden grid grid-cols-1 text-lg p-4 place-content-center hover:bg-gray-300">
      <Link to={`/directory/${_id}/${encodeURIComponent(name)}`} className="h-full w-full cursor-pointer">
        <div className="bg-orange-300n grid grid-cols-1">
          <div className="overflow-hidden">
            <p className="text-black font-bold h-auto">{name}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DirectoryComponent;
