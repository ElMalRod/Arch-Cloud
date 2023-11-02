import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './views/Login';
import ViewAdministrador from './views/ViewAdministrador';
import ViewEmpleado from './views/ViewEmpleado';
import TextEditorPage from './components/TextEditorPage';
import DirectorySelect from './views/DirectorySelect';
import NewDocument from './components/NewDocument';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<ViewAdministrador />} />
        <Route path="/empleado" element={<ViewEmpleado />} />
        <Route path="/editor/:fileId/:userId/:filename" element={<TextEditorPage />} />
        <Route path="/directory/:directoryId/:directoryName" element={<DirectorySelect />} />
        <Route path="/editor/:directoryId/nuevo-documento" element={<NewDocument />} />
      </Routes>
    </Router>
  );
}

export default App;
