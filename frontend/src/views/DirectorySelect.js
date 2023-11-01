import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FileList from '../components/FileList';
import TopNavbar from '../components/TopNavbar';
import DirectoryList from '../components/DirectoryList';

const DirectorySelect = () => {
  const { directoryId, directoryName } = useParams();
  console.log('ID:', directoryId);
  console.log('Nombre:', decodeURIComponent(directoryName));

  return (
    <div className="h-screen w-screen flex flex-row-reverse overflow-x-hidden">
      <div className='w-[85%] bg-blue-400 '>
        {/*<p>ID: {directoryId}</p>*/}
        <p>Directorio: {decodeURIComponent(directoryName)}</p>
        <TopNavbar />
        <FileList />
        <DirectoryList />
      </div>
      <div className='w-[15%] bg-white'>
        <Navbar />
      </div>
    </div>
  );
};

export default DirectorySelect;
