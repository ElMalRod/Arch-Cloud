import React, { } from 'react';

import Navbar from '../components/Navbar';
import FileList from '../components/FileList';
import TopNavbar from '../components/TopNavbar';
import DirectoryList from '../components/DirectoryList';
function ViewEmpleado() {


  return (
    <div className="h-screen w-screen flex flex-row-reverse overflow-x-hidden">
      <div className='w-[85%] bg-blue-400 '>
        <TopNavbar />
        <FileList />
        <DirectoryList />
      </div>
      <div className='w-[15%] bg-white'>
        <Navbar />
      </div>

    </div>
  );
}

export default ViewEmpleado;
