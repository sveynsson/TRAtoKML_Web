// src/components/MapView.jsx
import PropTypes from 'prop-types';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import './MapView.css';

function MapView({ records, selectedRecords }) {
  const mapRef = useRef(null); // Referenz für die MapContainer-Komponente

  // Sobald sich die Records ändern, zentriere die Karte auf die neue Trasse
  useEffect(() => {
    if (!mapRef.current || records.length === 0) return;

    const bounds = records.map((record) => [record.lat, record.lon]);
    const map = mapRef.current;

    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [20, 20] }); // Zentriere die Karte
    }
  }, [records]); // Effekt wird ausgeführt, wenn sich die records ändern

  if (records.length === 0) {
    return null;
  }

  const position = [records[0].lat, records[0].lon];

  // Koordinaten für die gesamte Trasse (Rot)
  const allCoordinates = records.map((record) => [record.lat, record.lon]);

  // Koordinaten für den ausgewählten Abschnitt (Grün)
  const selectedCoordinates = selectedRecords.map((record) => [record.lat, record.lon]);

  return (
    <div className="map-view">
      <h2>Trasse</h2>
      <MapContainer 
        center={position} 
        zoom={13} 
        scrollWheelZoom={true} 
        style={{ height: '400px' }} 
        ref={mapRef} // Referenz für MapContainer zuweisen
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Gesamte Trasse in Rot */}
        <Polyline positions={allCoordinates} color="red" />
        {/* Ausgewählter Abschnitt in Grün */}
        <Polyline positions={selectedCoordinates} color="green" />
      </MapContainer>
    </div>
  );
}

MapView.propTypes = {
  records: PropTypes.array.isRequired,
  selectedRecords: PropTypes.array.isRequired,
};

export default MapView;
