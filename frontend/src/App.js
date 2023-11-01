import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './views/Login';
import ViewAdministrador from './views/ViewAdministrador';
import ViewEmpleado from './views/ViewEmpleado';
import TextEditorPage from './components/TextEditorPage';
import DirectorySelect from './views/DirectorySelect';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<ViewAdministrador />} />
        <Route path="/empleado" element={<ViewEmpleado />} />
        <Route path="/editor/:fileId/:userId/:filename" element={<TextEditorPage />} />
        <Route path="/directory/:directoryId/:directoryName" element={<DirectorySelect />} />
      </Routes>
    </Router>
  );
}

export default App;
