import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import './CatDetails.css'; // Creeremo questo CSS tra poco

// Fix Icona Leaflet
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function CatDetails() {
    const { id } = useParams(); // Prende l'ID dall'URL
    const navigate = useNavigate();
    const [cat, setCat] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCat = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/cats/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setCat(data);
                } else {
                    console.error("Gatto non trovato");
                }
            } catch (error) {
                console.error("Errore di connessione:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCat();
    }, [id]);

    if (loading) return <div className="loading">Caricamento in corso... 🐱</div>;
    if (!cat) return <div className="error">Gatto non trovato! 😿</div>;

    return (
        <div className="details-container">
            
            {/* HEADER: Titolo e Badge */}
            <div className="details-header">
                <h1>{cat.title}</h1>
                <div className="badges">
                    {cat.hasCollar && <span className="badge collar">🧣 Ha il collare</span>}
                    {cat.isInjured && <span className="badge injured">🩹 Ferito</span>}
                </div>
            </div>

            <div className="details-content">
                
                {/* COLONNA SINISTRA: Foto e Info */}
                <div className="info-column">
                    <div className="main-image-wrapper">
                        <img 
                            src={cat.imageUrl} 
                            alt={cat.title} 
                            className="main-image"
                            onError={(e) => e.target.src = "https://placekitten.com/600/400"} // Fallback
                        />
                    </div>
                    
                    <div className="description-box">
                        <h3>La storia</h3>
                        <p>{cat.description || "Nessuna descrizione fornita."}</p>
                        <p className="date">Avvistato il: {new Date(cat.createdAt).toLocaleDateString()}</p>
                    </div>

                    {/* SEZIONE COMMENTI (Placeholder per ora) */}
                    <div className="comments-section">
                        <h3>Commenti ({cat.comments ? cat.comments.length : 0})</h3>
                        {cat.comments && cat.comments.length > 0 ? (
                            cat.comments.map((c, i) => (
                                <div key={i} className="comment">
                                    <strong>{c.author}</strong>: {c.text}
                                </div>
                            ))
                        ) : (
                            <p>Nessun commento ancora. Sii il primo!</p>
                        )}
                        {/* Qui andrà il form per commentare quando avremo l'auth */}
                        <div className="auth-notice">Accedi per commentare</div>
                    </div>
                </div>

                {/* COLONNA DESTRA: Mappa */}
                <div className="map-column">
                    <h3>Posizione Avvistamento</h3>
                    <div className="details-map-wrapper">
                        <MapContainer 
                            center={[cat.position.lat, cat.position.lng]} 
                            zoom={15} 
                            style={{ height: '100%', width: '100%' }}
                        >
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <Marker position={[cat.position.lat, cat.position.lng]}>
                                <Popup>Avvistato qui!</Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                    <div className="coords">
                        {cat.address || `${cat.position.lat.toFixed(4)}, ${cat.position.lng.toFixed(4)}`}
                    </div>
                    
                    <button className="back-btn" onClick={() => navigate('/')}>
                        Torna alla Mappa
                    </button>
                </div>

            </div>
        </div>
    );
}

export default CatDetails;