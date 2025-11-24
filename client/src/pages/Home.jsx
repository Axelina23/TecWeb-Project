import { useState, useEffect } from 'react'; // <--- 1. Importa gli hook necessari
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
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
  const position = [40.8518, 14.2681]; // Centro di default (Napoli)
  const navigate = useNavigate();

  // 2. Stato per salvare i gatti scaricati dal DB
  const [cats, setCats] = useState([]);

  // 3. Scarichiamo i dati quando si carica la pagina
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/cats');
        if (response.ok) {
          const data = await response.json();
          setCats(data); // Salviamo i gatti nello stato
        } else {
          console.error("Errore nel recupero dei gatti");
        }
      } catch (error) {
        console.error("Errore di connessione:", error);
      }
    };

    fetchCats();
  }, []);

  const handleAddCatClick = () => {
    setTimeout(() => {
      navigate('/add-cat');
    }, 300);
  };

  return (
    <div className="home-container">

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
          <button className="add-cat-btn" onClick={handleAddCatClick}>
            Aggiungi un gatto +
          </button>
        </div>
      </div>

      <h2 className="section-title">MAPPA DEGLI AVVISTAMENTI</h2>

      <div className="map-wrapper">
        <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* 4. Mappiamo l'array 'cats' per creare un Marker per ogni gatto */}
          {cats.map((cat) => (
            <Marker
              key={cat._id}
              position={[cat.position.lat, cat.position.lng]}
            >
              <Popup>
                <div style={{ textAlign: 'center' }}>
                  {/* Mostriamo la foto se c'è */}
                  <img
                    src={cat.imageUrl}
                    alt={cat.title}
                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', marginBottom: '5px' }}
                  />
                  <br />
                  <strong>{cat.title}</strong>
                  <p style={{ margin: '5px 0' }}>{cat.description}</p>
                  {/* Badge per Collare/Ferito */}
                  <div style={{ fontSize: '12px', display: 'flex', gap: '5px', justifyContent: 'center' }}>
                    {cat.hasCollar && <span style={{ background: '#99D562', padding: '2px 5px', borderRadius: '4px' }}>🧣 Collare</span>}
                    {cat.isInjured && <span style={{ background: '#ff6b6b', color: 'white', padding: '2px 5px', borderRadius: '4px' }}>🩹 Ferito</span>}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

        </MapContainer>
      </div>

      {/* 5. Aggiorniamo anche la Griglia sotto per usare i dati reali invece di [1, 2, 3] */}
      <h2 className="section-title">ULTIMI AVVISTAMENTI</h2>
      <div className="grid-section">
        {cats.length === 0 ? <p style={{ textAlign: 'center', width: '100%' }}>Nessun gatto avvistato... sii il primo!</p> : null}

        {cats.map((cat) => (
          <div key={cat._id} className="cat-card">
            <div className="card-image" style={{ overflow: 'hidden' }}>
              {/* Se c'è l'immagine usiamo quella, altrimenti l'emoji */}
              {cat.imageUrl ? (
                <img src={cat.imageUrl} alt={cat.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span className="cat-emoji">🐱</span>
              )}
            </div>
            <h3>{cat.title}</h3>
            <p>{cat.description ? cat.description.substring(0, 30) + '...' : 'Nessuna descrizione'}</p>
            {/* Sostituisci il bottone esistente con questo */}
            <button
              className="learn-more-btn"
              onClick={() => navigate(`/cat/${cat._id}`)} // <--- Naviga usando l'ID del gatto
            >
              Vedi dettagli &gt;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;