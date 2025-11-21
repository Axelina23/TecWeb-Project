import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Fondamentale per vedere la mappa!
import './App.css';

// Icona standard di Leaflet (fix per un bug noto di React-Leaflet)
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function App() {
  // Coordinate di Napoli (o dove preferisci)
  const center = [40.8518, 14.2681];

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
        {/* Questo è il "disegno" della mappa (OpenStreetMap) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Un marker di prova */}
        <Marker position={center}>
          <Popup>
            Miao! 🐱 <br /> Sono un gatto di Napoli.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default App;