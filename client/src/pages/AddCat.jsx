import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Icone Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import './AddCat.css'; 

// Fix Icona
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function AddCat() {
    const navigate = useNavigate();
    
    // Dati Form
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState('');
    
    // Coordinate iniziali (Napoli)
    const [position, setPosition] = useState({ lat: 40.8518, lng: 14.2681 });

    // --- COMPONENTE PER GESTIRE I CLICK SULLA MAPPA ---
    function LocationMarker() {
        useMapEvents({
            click(e) {
                setPosition(e.latlng); // Aggiorna lo stato con le coordinate cliccate
            },
        });

        // Mostra il marker dove hai cliccato
        return position === null ? null : (
            <Marker position={position}></Marker>
        );
    }
    // --------------------------------------------------

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            const objectUrl = URL.createObjectURL(selectedFile);
            setPreview(objectUrl);
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            alert("Per favore carica una foto del gatto! 📸");
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', file);
        // Inviamo le coordinate SCELTE dall'utente
        formData.append('lat', position.lat);
        formData.append('lng', position.lng);

        try {
            const response = await fetch('http://localhost:3000/api/cats', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert("Gatto caricato con successo! 🐱🎉");
                navigate('/');
            } else {
                console.error("Errore durante l'upload");
                alert("C'è stato un problema nel salvare il gatto.");
            }
        } catch (error) {
            console.error("Errore di rete:", error);
            alert("Errore di connessione col server.");
        }
    };

    return (
        <div className="add-cat-page">
            <div className="add-cat-box">
                
                <h1 className="add-cat-title">Nuovo Avvistamento 📸</h1>
                
                <div className="add-cat-content">
                    
                    {/* COLONNA SINISTRA: FORM */}
                    <div className="add-cat-form-column">
                        <form onSubmit={handleSubmit} id="cat-form" className="add-cat-form">
                            
                            <div className="form-group">
                                <label className="form-label">Nome del gatto</label>
                                <input 
                                    type="text" 
                                    placeholder="Es: Il Rosso del Bar" 
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required 
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Descrizione</label>
                                <textarea 
                                    placeholder="Raccontaci dove l'hai visto..." 
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows="3"
                                    className="form-textarea"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Carica Foto</label>
                                <label className="file-upload-label">
                                    <span className="upload-icon">📤</span>
                                    {file ? <strong>{file.name}</strong> : "Scegli foto"}
                                    <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} required />
                                </label>
                            </div>

                            {preview && (
                                <div className="image-preview-box">
                                    <img src={preview} alt="Anteprima" className="preview-img" />
                                </div>
                            )}
                        </form>
                    </div>

                    {/* COLONNA DESTRA: MAPPA */}
                    <div className="add-cat-map-column">
                        <div className="column-title">Dove l'hai visto? (Clicca sulla mappa)</div>
                        <div className="map-picker-wrapper">
                            <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
                                <TileLayer
                                    attribution='&copy; OpenStreetMap contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {/* Questo componente gestisce il click */}
                                <LocationMarker />
                            </MapContainer>
                        </div>
                        
                        <div style={{marginTop: '10px', fontSize: '12px', color: '#666'}}>
                            Lat: {position.lat.toFixed(4)}, Lng: {position.lng.toFixed(4)}
                        </div>
                    </div>

                </div>

                {/* BOTTONI (Fuori dalle colonne, in basso) */}
                <div className="form-actions" style={{width: '100%', marginTop: '30px'}}>
                    <button type="button" onClick={() => navigate('/')} className="btn btn-cancel">
                        Annulla
                    </button>
                    {/* Il bottone submit è collegato al form tramite l'ID */}
                    <button type="submit" form="cat-form" className="btn btn-submit">
                        Pubblica Avvistamento
                    </button>
                </div>

            </div>
        </div>
    );
}

export default AddCat;