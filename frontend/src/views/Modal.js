import React from 'react';


function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-500 bg-opacity-40 z-100 ">
      <div className="bg-white p-8 rounded shadow-lg ">
        {children}
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-400 focus:outline-none focus:ring focus:border-blue-300"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default Modal;
