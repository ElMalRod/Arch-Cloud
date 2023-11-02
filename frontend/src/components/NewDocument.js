import React from 'react';
import TextEditor from "./TextEditor";
import { FaFileAlt, FaSave, FaShareAlt, FaTrashAlt, FaArrowLeft } from 'react-icons/fa';
import Alert from '@material-ui/lab/Alert';

function NewDocument() {
  return (
    <div className="fixed top-0 inset-0 grid grid-cols-1 place-content-start justify-items-center bg-gray-200 bg-opacity-40 overflow-y-scroll">
     <div className="flex items-center h-[100px] pl-4 text-2xl text-gray-600">
          <div className="pr-2"><FaFileAlt /></div>
          <p> Nombre del documento</p>
          <div className="px-2 hover:text-[#4592AF]" >
            <FaSave />
          </div>
          <div className="px-2 hover:text-teal-500" ><FaShareAlt /> </div>
          <div className="px-2 hover:text-red-500" ><FaTrashAlt /> </div>
        </div>
        {/* Contenido para un nuevo documento
        {isAlertVisible && (
          <Alert severity="success" onClose={() => setAlertVisible(false)}>
            Contenido guardado exitosamente
          </Alert>
        )}*/}
        <div
          className="cursor-pointer hover:bg-gray-300 ease-in text-2xl rounded-full h-[50px] w-[50px] mx-8 flex items-center text-center justify-center justify-self-start "

        >
          <FaArrowLeft />
        </div>
      {/* Contenido para un nuevo documento */}
      <TextEditor fileId={null} content="" onContentChange={() => {}}  />
    </div>
  );
}

export default NewDocument;
