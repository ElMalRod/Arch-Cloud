import React, { useState, useEffect } from "react";
import TextEditor from "./TextEditor";
import axios from "axios";
import { Link } from "react-router-dom";
import ImgTXT from "../assets/txtimg.png";
import ImgHTML from "../assets/htmlimg.png";
import { FaEllipsisV, FaRegCopy, FaArrowsAlt, FaTrash, FaShare } from 'react-icons/fa';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';



const FileComponent = ({ file }) => {
  const { _id, filename, extension, path, content, createdAt } = file;
  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(content);
  const userId = localStorage.getItem("userId");

  const handleOpenEditor = () => {
    setIsEditorVisible(true);
  };

  const handleCloseEditor = () => {
    setIsEditorVisible(false);
  };

  const handleUpdateContent = async () => {
    try {
      // Realiza la solicitud para obtener el archivo actualizado
      const response = await axios.get(`http://localhost:4000/api/files/files/${_id}/${filename}`);

      setUpdatedContent(response.data.content);
    } catch (error) {
      console.error("Error al obtener el archivo actualizado:", error);
    }
  };

  useEffect(() => {
    setUpdatedContent(content);
  }, [content]);

  //menu
  const [open, setOpen] = React.useState(false);
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

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className="bg-gray-100 rounded-xl drop-shadow-sm border h-[200px] w-[220px]  grid grid-cols-1 text-lg place-content-start justify-items-center hover:bg-gray-300">

      <div className="text-red-400 flex justify-self-end pt-4 pr-2">

        <div>
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
                      <MenuItem onClick={handleClose} className="flex gap-2"><FaRegCopy />Copiar</MenuItem>
                      <MenuItem onClick={handleClose} className="flex gap-2"><FaArrowsAlt />Mover</MenuItem>
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
      <Link to={`/editor/${_id}/${userId}/${filename}`} className="h-full w-full cursos-pointer text-sm px-4">
        <div className="bg-orange-300n grid grid-cols-1">
          <div className="overflow-hidden flex ">
            <div>
              <p className="text-gray-700 font-bold h-auto">{filename}</p>
              <p className="text-gray-500 ">{createdAt}</p>
            </div>
          </div>
          <div className="bg-blue-100n grid place-content-center">
            <img src={ImgTXT} alt="Imagen de fondo" width={70} height={70} />
          </div>
          <div>
            {/* Renderiza el TextEditor solo si isEditorVisible es true */}
            {isEditorVisible && (
              <div className="bg-blue-400m">
                {/* Pasa el fileId y el contenido actualizado al componente TextEditor */}
                <TextEditor fileId={_id} content={updatedContent} onClose={() => { handleCloseEditor(); handleUpdateContent(); }} />
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FileComponent;
