import React from 'react'
import Navbar from "./components/Navbar/Navbar"
import "./App.css"
import Editorpage from './components/EditorPage/Editorpage.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Templatepage from './components/TemplatePage/Templatepage'
import Previewpage from './components/PreviewPage/Previewpage';
function App ()  {
  return (
    <Router>
      <Routes>
        <Route path="/editor" element={<Editorpage />}/>
        <Route path='/preview' element={<Previewpage/>}/>
         <Route path='/template' element={<Templatepage/>}/>
      </Routes>
    </Router>
  )
}

export default App
