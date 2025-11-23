import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import Navbar from "./components/Navbar";
import AddCat from "./pages/AddCat"; // <--- IMPORTA LA NUOVA PAGINA

import './index.css'; 

function App() {
  return (
    <BrowserRouter>
      <Navbar /> 

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        
        {/* NUOVA ROTTA PER AGGIUNGERE GATTI */}
        <Route path="/add-cat" element={<AddCat />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;