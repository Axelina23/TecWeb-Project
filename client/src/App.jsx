import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";

// Importiamo il CSS globale se serve
import './index.css'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Quando l'utente va su "/", mostra la Home (Mappa + Card) */}
        <Route path="/" element={<Home />} />
        
        {/* Quando va su "/login" o "/register", mostra la pagina di Auth */}
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;