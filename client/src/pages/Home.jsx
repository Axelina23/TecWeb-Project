import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom'; // <--- IMPORTANTE
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import './Home.css';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function Home() {
  const position = [40.8518, 14.2681];
  const navigate = useNavigate(); // <--- Hook per navigare

  // Funzione che gestisce il click col ritardo per l'animazione
  const handleAddCatClick = () => {
    // 1. L'animazione CSS "active" parte automaticamente al click (gatto cade)
    
    // 2. Aspettiamo 300ms (tempo che il gatto cada) e poi cambiamo pagina
    setTimeout(() => {
        navigate('/add-cat');
    }, 300);
  };

  return (
    <div className="home-container">
      
      {/* HERO SECTION */}
      <div className="hero-section">
        <h1>STREETCATS</h1>
        <p>Hai avvistato un gatto randagio? Condividilo con tutta la community!</p>
        
        <div className="cat-button-wrapper">
            
            <svg className="cat-mascot" viewBox="0 0 100 100" width="60">
                <path d="M20 70 L10 40 L40 50 Z" fill="#3D2652" />
                <path d="M80 70 L90 40 L60 50 Z" fill="#3D2652" />
                <circle cx="50" cy="70" r="35" fill="#3D2652" />
                <circle cx="35" cy="65" r="5" fill="white" />
                <circle cx="65" cy="65" r="5" fill="white" />
                <circle cx="35" cy="65" r="2" fill="#99D562" />
                <circle cx="65" cy="65" r="2" fill="#99D562" />
                <path d="M45 75 L55 75 L50 80 Z" fill="pink" />
                <ellipse cx="30" cy="95" rx="10" ry="5" fill="white" />
                <ellipse cx="70" cy="95" rx="10" ry="5" fill="white" />
            </svg>

            {/* Al click chiamiamo la nostra funzione ritardata */}
            <button className="add-cat-btn" onClick={handleAddCatClick}>
                Aggiungi un gatto +
            </button>
        </div>

      </div>

      <h2 className="section-title">MAPPA DEGLI AVVISTAMENTI</h2>
      {/* ... resto della pagina uguale a prima ... */}
      <div className="map-wrapper">
        <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>Gatto avvistato qui!</Popup>
          </Marker>
        </MapContainer>
      </div>

      <h2 className="section-title">ULTIMI AVVISTAMENTI</h2>
      <div className="grid-section">
        {[1, 2, 3].map((id) => (
            <div key={id} className="cat-card">
                <div className="card-image">
                    <span className="cat-emoji">🐱</span>
                </div>
                <h3>Nome del Gatto</h3>
                <p>Avvistato a Napoli</p>
                <button className="learn-more-btn">Learn More &gt;</button>
            </div>
        ))}
      </div>
    </div>
  );
}

export default Home;