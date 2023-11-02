// TextEditorPage.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TextEditor from "./TextEditor";
import axios from "axios";

function TextEditorPage() {
  const { userId, filename,fileId } = useParams();
  const [content, setContent] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Utiliza el userId y filename de los parámetros de la URL
        const response = await axios.get(`http://localhost:4000/api/files/files/${userId}/${filename}`);
        setContent(response.data.content);
      } catch (error) {
        console.error("Error al obtener el contenido del archivo:", error);
      }
    };

    fetchData();
  }, [userId, filename]);


  return (
    <div>
      <TextEditor fileId={fileId} content={content} />

    </div>
  );
}

export default TextEditorPage;
