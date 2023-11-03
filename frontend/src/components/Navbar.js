import React, { useState, useEffect } from "react";
import CreateFile from "./CreateFile";
import CreateDirectory from "./CreateDirectory";
import Modal from "../views/Modal";
import logo from "../assets/2.png";
import { FaFileAlt, FaTrash, FaFolder, FaUserFriends } from 'react-icons/fa';


function Navbar() {
  // Usa el estado para controlar la visibilidad del modal de Crear Archivo
  const [isCreateFileModalOpen, setIsCreateFileModalOpen] = useState(false);
  const [directoryId, setDirectoryId] = useState(null);

  const openCreateFileModal = () => {
    setIsCreateFileModalOpen(true);
  };

  const closeCreateFileModal = () => {
    setIsCreateFileModalOpen(false);
  };

  //modal directory---------------------------------------------
  const [isCreateDirectoryModalOpen, setIsCreateDirectoryModalOpen] = useState(false);
  const openCreateDirectoryModal = () => {
    setIsCreateDirectoryModalOpen(true);
  };

  const closeCreateDirectoryModal = () => {
    setIsCreateDirectoryModalOpen(false);
  };

  //modal share folder---------------------------------------------
  const [isCreateShareModalOpen, setIsCreateShareModalOpen] = useState(false);
  const openCreateShareModal = () => {
    setIsCreateShareModalOpen(true);
  };

  const closeCreateShareModal = () => {
    setIsCreateShareModalOpen(false);
  };

  //modal papelera---------------------------------------------
  const [isCreatePaperbinModalOpen, setIsCreatePaperbinModalOpen] = useState(false);
  const openCreatePaperbinModal = () => {
    setIsCreatePaperbinModalOpen(true);
  };

  const closeCreatePaperbinModal = () => {
    setIsCreatePaperbinModalOpen(false);
  };

  // Editor de texto---------------------------------------------
  const openNewDocumentTab = () => {
    const urlParts = window.location.pathname.split('/');
    const newDirectoryId = urlParts.length >= 3 ? urlParts[2] : localStorage.getItem('directoryId');
    setDirectoryId(newDirectoryId);

    const newDocumentUrl = `/editor/${newDirectoryId}/nuevo-documento`;
    const newWindow = window.open(newDocumentUrl, "_blank");

    // Esperar a que la nueva ventana se cargue completamente
    const checkWindowLoaded = () => {
      if (newWindow && newWindow.document && newWindow.document.readyState === 'complete') {
        // Puedes intentar acceder al contenido aquí
        newWindow.postMessage({ type: 'getDocumentContent' }, window.origin);
      } else {
        // Si la ventana no está cargada, espera un poco y verifica nuevamente
        setTimeout(checkWindowLoaded, 100);
      }
    };

    // Iniciar la verificación de carga de la ventana
    checkWindowLoaded();
  };
  // Verifica si el directoryId no está en la URL y está almacenado en el localStorage
  useEffect(() => {
    const urlParts = window.location.pathname.split('/');
    const newDirectoryId = urlParts.length >= 3 ? urlParts[2] : localStorage.getItem('directoryId');
    setDirectoryId(newDirectoryId);
  }, []);

  return (
    <div className="bg-[#F6F5F5] w-[100%] grid grid-cols-1 place-content-start justify-items-center gap-2 p-2 text-lg text-gray-600">

      {/*CREATE DOCUMENT */}
      <div className="bg-blue-100n grid place-content-center p-4 ">
        <img src={logo} alt="Imagen de fondo" width={80} height={80} />
      </div>
      <div
        className="h-[25px] w-full cursor-pointer hover:bg-gray-300 rounded-xl mx-2 flex items-center p-4 "
        onClick={openCreateFileModal}
      >
        <FaFileAlt className="text-gray-600 "/>
        <p  className="pl-2"> Crear Archivo</p>
      </div>
      {/* Renderiza el componente CreateFile dentro del modal */}
      <Modal isOpen={isCreateFileModalOpen} onClose={closeCreateFileModal}>
        <CreateFile />
      </Modal>

      {/*CREATE DIRECTORY */}
      <div
        className="h-[25px] w-full cursor-pointer hover:bg-gray-300 rounded-xl mx-2 flex items-center p-4"
        onClick={openCreateDirectoryModal}
      >
        <FaFolder className="text-gray-600 "/>
        <p className="pl-2"> Crear Directorio</p>
      </div>
      <Modal isOpen={isCreateDirectoryModalOpen} onClose={closeCreateDirectoryModal}>
        <CreateDirectory />
      </Modal>

      {/*CREATE SHARE FILES*/}
      <div
        className="h-[25px] w-full cursor-pointer hover:bg-gray-300 rounded-xl mx-2 flex items-center p-4"
        onClick={openCreateDirectoryModal}
      >
        <FaUserFriends className="text-gray-600 "/>
        <p className="pl-2"> Compartidos</p>
      </div>
      <Modal isOpen={isCreateDirectoryModalOpen} onClose={closeCreateDirectoryModal}>
        <CreateDirectory />
      </Modal>

      {/*CREATE PAPER BIN */}
      <div
        className="h-[25px] w-full cursor-pointer hover:bg-gray-300 rounded-xl mx-2 flex items-center p-4"
        onClick={openCreateDirectoryModal}
      >
        <FaTrash className="text-gray-600 "/>
        <p className="pl-2"> Papelera</p>
      </div>
      <Modal isOpen={isCreateDirectoryModalOpen} onClose={closeCreateDirectoryModal}>
        <CreateDirectory />
      </Modal>

      {/*CREATE DOCUMENT */}
      <div
        className="h-[25px] w-full cursor-pointer hover:bg-gray-300 rounded-xl mx-2 flex items-center p-4"
        onClick={openNewDocumentTab}
      >
        <FaFileAlt className="text-gray-600" />
        <p className="pl-2"> Nuevo Documento</p>
      </div>

    </div>
  );
}

export default Navbar;
