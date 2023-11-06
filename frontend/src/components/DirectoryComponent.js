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

const DirectoryComponent = ({ directory, setDirectories, isMoveListOpen, setIsMoveListOpen, }) => {
  const { _id, name } = directory;

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

  const handleCopy = async (event) => {
    try {
      // Realizar la solicitud POST al servidor para copiar el directorio
      const response = await axios.post(`http://localhost:4000/api/directories/copy/${_id}`);

      // Verificar si la solicitud fue exitosa
        window
          .alert(`Directorio ${name} copiado exitosamente`);
          window.location.reload();

    } catch (error) {
      console.error('Error al copiar el directorio:', error.response);
    }
    handleClose();
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
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} className="text-gray-700">
                      <MenuItem onClick={handleCopy} className="flex gap-2"><FaRegCopy />Copiar</MenuItem>
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
