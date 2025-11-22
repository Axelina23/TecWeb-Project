import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

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

  // Stili "al volo" per fare presto (poi possiamo spostarli nel CSS)
  const styles = {
    container: { padding: "20px", maxWidth: "1200px", margin: "0 auto" },
    heroSection: { textAlign: "center", marginBottom: "30px" },
    mapWrapper: { 
      height: "400px", 
      borderRadius: "15px", 
      overflow: "hidden", 
      border: "2px solid #333",
      marginBottom: "40px",
      position: "relative" // Importante per lo z-index
    },
    gridSection: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" },
    card: { 
      border: "1px solid #ddd", 
      borderRadius: "10px", 
      padding: "15px", 
      textAlign: "center",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
    }
  };

  return (
    <div style={styles.container}>
      
      {/* HERO SECTION (Come nel disegno in alto a sinistra) */}
      <div style={styles.heroSection}>
        <h1>STREETCATS</h1>
        <p>Hai avvistato un gatto randagio? Condividilo con tutta la community!</p>
        <button style={{
            backgroundColor: "#333", color: "white", padding: "10px 20px", 
            border: "none", borderRadius: "5px", cursor: "pointer", marginTop: "10px"
        }}>
            Aggiungi un gatto +
        </button>
      </div>

      {/* MAPPA (Contenuta nel box, non full screen) */}
      <h2 style={{textAlign: "center"}}>MAPPA DEGLI AVVISTAMENTI</h2>
      <div style={styles.mapWrapper}>
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

      {/* GRID DI GATTI (Features) */}
      <h2>ULTIMI AVVISTAMENTI</h2>
      <div style={styles.gridSection}>
        {/* Creiamo 3 card finte come nel disegno */}
        {[1, 2, 3].map((id) => (
            <div key={id} style={styles.card}>
                <div style={{height: "150px", background: "#eee", borderRadius: "5px", marginBottom: "10px"}}>
                    {/* Qui andrà l'immagine */}
                    <span style={{fontSize: "40px", lineHeight: "150px"}}>🐱</span>
                </div>
                <h3>Nome del Gatto</h3>
                <p>Avvistato a Napoli</p>
                <button style={{background: "transparent", border: "1px solid #333", padding: "5px 10px", borderRadius: "5px"}}>
                    Learn More &gt;
                </button>
            </div>
        ))}
      </div>

    </div>
  );
}

export default Home;