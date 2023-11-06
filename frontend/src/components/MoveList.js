import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../views/Modal';

const MoveList = ({ isOpen, onClose }) => {
  const [directories, setDirectories] = useState([]);
  const [selectedDirectory, setSelectedDirectory] = useState(null); // Track selected directory
  const userId = localStorage.getItem('userId');
  const directoryId = localStorage.getItem('directoryId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/directories/subdirectories/${userId}/${directoryId}`);
        setDirectories(response.data);
      } catch (error) {
        console.error('Error fetching directories:', error);
      }
    };

    fetchData();
  }, [userId, directoryId]);

  // Handle checkbox change
  const handleCheckboxChange = (event, directory) => {
    if (event.target.checked) {
      setSelectedDirectory(directory);
    } else {
      setSelectedDirectory(null);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => onClose(false)} className="flex w-[400px] ">
      <div className="w-[400px]  text-gray-500">
        <h1 className='pb-4 text-xl font-semibold'>Mover Archivo</h1>
        <ul className='grid gap-2 w-full text-lg font-medium'>
          {directories.map(directory => (
            <li
              key={directory._id}
              className={`w-full p-2 rounded-lg hover:bg-gray-300 flex items-center cursor-pointer ${selectedDirectory === directory ? 'bg-gray-300' : 'bg-white'
                }`}
            >
              <input
                id={`checkbox-${directory._id}`}
                type="checkbox"
                checked={selectedDirectory === directory}
                onChange={(event) => handleCheckboxChange(event, directory)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor={`checkbox-${directory._id}`} className="pl-2">
                {directory.name}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <button className='mt-4 bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-400 focus:outline-none focus:ring focus:border-teal-300 mr-2'>Mover</button>
    </Modal>
  );
};

export default MoveList;
