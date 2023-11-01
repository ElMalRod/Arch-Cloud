import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function CreateDirectory() {
  const [formData, setFormData] = useState({
    name: '',
    user_id: '',
    parentDirectory_id: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userId = localStorage.getItem('userId');
      const parentDirectoryId = localStorage.getItem('directoryId');

      if (!parentDirectoryId) {
        throw new Error("Directorio padre no encontrado");
      }

      const formDataForRequest = {
        name: formData.name,
        user_id: userId,
        parentDirectory_id: parentDirectoryId,
      };

      const response = await axios.post('http://localhost:4000/api/directories', formDataForRequest);

      console.log('Directorio creado exitosamente:', response.data);

      // Muestra el mensaje de éxito con SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: 'Directorio creado',
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error al crear el directorio:', error.message);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Crear Directorio</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm">Nombre del Directorio</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre del directorio"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-400 focus:outline-none focus:ring focus:border-blue-300"
        >
          Crear Directorio
        </button>
      </form>
    </div>
  );
}

export default CreateDirectory;
