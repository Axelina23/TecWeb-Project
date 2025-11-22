import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import './Home.css';

// Fix icone Leaflet
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function Home() {
  const position = [40.8518, 14.2681];

  return (
    <div className="home-container">
      
      {/* HERO SECTION */}
      <div className="hero-section">
        <h1>STREETCATS</h1>
        <p>Hai avvistato un gatto randagio? Condividilo con tutta la community!</p>
        
        {/* --- NUOVO BLOCCO BOTTONE CON GATTINO --- */}
        <div className="cat-button-wrapper">
            
            {/* L'immagine del gatto (Disegno SVG fatto a codice) */}
            <svg className="cat-mascot" viewBox="0 0 100 100" width="60">
                {/* Orecchie */}
                <path d="M20 70 L10 40 L40 50 Z" fill="#333" />
                <path d="M80 70 L90 40 L60 50 Z" fill="#333" />
                {/* Testa */}
                <circle cx="50" cy="70" r="35" fill="#333" />
                {/* Occhi */}
                <circle cx="35" cy="65" r="5" fill="white" />
                <circle cx="65" cy="65" r="5" fill="white" />
                <circle cx="35" cy="65" r="2" fill="black" />
                <circle cx="65" cy="65" r="2" fill="black" />
                {/* Naso */}
                <path d="M45 75 L55 75 L50 80 Z" fill="pink" />
                {/* Zampette che spuntano */}
                <ellipse cx="30" cy="95" rx="10" ry="5" fill="white" />
                <ellipse cx="70" cy="95" rx="10" ry="5" fill="white" />
            </svg>

            <button className="add-cat-btn">
                Aggiungi un gatto +
            </button>
        </div>
        {/* ---------------------------------------- */}

      </div>

      <h2 className="section-title">MAPPA DEGLI AVVISTAMENTI</h2>
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