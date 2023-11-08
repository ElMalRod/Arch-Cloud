import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFolder, FaEllipsisV, FaRegCopy, FaArrowsAlt, FaTrash, FaShare } from 'react-icons/fa';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import axios from "axios";
import { useParams } from 'react-router-dom';

const DirectoryComponent = ({ directory, setDirectories, isMoveListOpen, setIsMoveListOpen, }) => {
  const { _id, name } = directory;
  const { directoryId } = useParams();
  const [parentDirectoryId, setParentDirectoryId] = useState(null);
  console.log('URL generada:', `/directory/${_id}/${encodeURIComponent(name)}`);

  //menu
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  useEffect(() => {
    // Si el directoryId no está presente en la URL, intenta obtenerlo del localStorage
    if (!directoryId) {
      const storedDirectoryId = localStorage.getItem('directoryId');
      if (storedDirectoryId) {
        setParentDirectoryId(storedDirectoryId);
      }
    } else {
      setParentDirectoryId(directoryId);
    }
  }, [directoryId, setParentDirectoryId]);


  const handleCopy = async (directorySelect) => {
    const userId = localStorage.getItem('userId');
    try {
      // Hacer una solicitud para copiar el subdirectorio
      const response = await axios.post(
        `http://localhost:4000/api/directories/copySubdirectory/${userId}/${directorySelect}`,
        {
          parentDirectory_id: directoryId || parentDirectoryId
        }
      );
      const copiedSubdirectory = response.data;
        window.alert(`Subdirectorio ${copiedSubdirectory.name} copiado exitosamente`);
        window.location.reload();
      console.log('Subdirectorio copiado:', copiedSubdirectory);
    } catch (error) {
      console.error('Error al copiar el subdirectorio:', error);
      // Manejar el error según sea necesario
    }


  };
  //mover
  const handleOpenMoveList = () => {
    setIsMoveListOpen(true);
  };
  return (
    <div className="bg-gray-100 rounded-xl drop-shadow-sm h-[50px] w-[250px]  grid grid-cols-1 text-lg place-content-center hover:bg-gray-300">
      <div className="flex justify-center items-center">
        <Link to={`/directory/${_id}/${encodeURIComponent(name)}`} className="h-[50px] w-full text-center cursor-pointer overflow-hidden">
          <div className="flex items-center h-full pl-4 text-gray-600">
            <FaFolder />
            <p className="font-bold pl-2">
              {name}
            </p>
          </div>
        </Link>
        <div className="">
          <Button
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <FaEllipsisV />
          </Button>
          <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                <ClickAwayListener onClickAway={(event) => handleClose(event)}>
                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} className="text-gray-700">
                      <MenuItem onClick={() => handleCopy(_id)} className="flex gap-2">
                        <FaRegCopy />Copiar
                      </MenuItem>
                      <MenuItem onClick={handleOpenMoveList} className="flex gap-2"><FaArrowsAlt />Mover</MenuItem>
                      <MenuItem onClick={handleClose} className="flex gap-2"><FaShare />Compartir</MenuItem>
                      <MenuItem onClick={handleClose} className="flex gap-2"><FaTrash />Eliminar</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>

    </div>
  );
};

export default DirectoryComponent;
