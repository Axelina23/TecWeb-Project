import { Link } from "react-router-dom";
// Importiamo l'immagine dal percorso corretto (risaliamo di un livello con ../)
import logo from "../assets/logo.png"; 
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      
      {/* Blocco LOGO + Testo */}
      <div className="navbar-brand">
        <img src={logo} alt="StreetCats Logo" className="navbar-logo" />
        <span className="navbar-title">StreetCats</span>
      </div>

      {/* Link di Navigazione */}
      <div className="navbar-links">
        <Link to="/" className="nav-link">Mappa</Link>
        <Link to="/login" className="nav-button">Accedi</Link>
      </div>

    </nav>
  );
}

export default Navbar;