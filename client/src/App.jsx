import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import Navbar from "./components/Navbar";
import AddCat from "./pages/AddCat"; // <--- IMPORTA LA NUOVA PAGINA
import CatDetails from "./pages/CatDetails";
import './index.css'; 

function App() {
  return (
    <BrowserRouter>
      <Navbar /> 

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="/add-cat" element={<AddCat />} />
        <Route path="/cats/:id" element={<CatDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;