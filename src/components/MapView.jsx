// src/components/MapView.jsx
import PropTypes from 'prop-types';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './MapView.css';

function MapView({ records, selectedRecords }) {
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
      <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ height: '400px' }}>
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
