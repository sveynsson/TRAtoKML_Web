// src/components/ExportButton.jsx
import PropTypes from 'prop-types';
import { saveAs } from 'file-saver';

function ExportButton({ records, allRecords, fileName }) {
  const exportToKML = () => {
    if (!isContiguous(records, allRecords)) {
      alert('Die ausgewählten Elemente müssen einen zusammenhängenden Bereich bilden.');
      return;
    }

    const coordinates = records
      .map((record) => `${record.lon},${record.lat},0`)
      .join(' ');

    const kmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <Placemark>
      <name>TRA-Trasse</name>
      <LineString>
        <coordinates>
          ${coordinates}
        </coordinates>
      </LineString>
    </Placemark>
  </Document>
</kml>`;

    const blob = new Blob([kmlContent], { type: 'application/vnd.google-earth.kml+xml' });
    saveAs(blob, `${fileName}.kml`);
  };

  const isContiguous = (records, allRecords) => {
    if (records.length === 0) return false;

    // Erstelle eine Liste der Indizes der ausgewählten Records basierend auf allRecords
    const indices = records.map((record) => allRecords.indexOf(record));

    // Überprüfe, ob alle Records in allRecords enthalten sind
    if (indices.includes(-1)) {
      // Ein Record wurde nicht in allRecords gefunden
      return false;
    }

    // Sortiere die Indizes
    indices.sort((a, b) => a - b);

    // Überprüfe, ob die Indizes aufeinanderfolgen
    for (let i = 1; i < indices.length; i++) {
      if (indices[i] - indices[i - 1] !== 1) {
        return false;
      }
    }

    return true;
  };

  return (
    <div className="export-button">
      <button onClick={exportToKML}>Export als KML</button>
    </div>
  );
}

ExportButton.propTypes = {
  records: PropTypes.arrayOf(
    PropTypes.shape({
      lon: PropTypes.number.isRequired,
      lat: PropTypes.number.isRequired,
      station: PropTypes.number.isRequired,
    })
  ).isRequired,
  allRecords: PropTypes.arrayOf(
    PropTypes.shape({
      lon: PropTypes.number.isRequired,
      lat: PropTypes.number.isRequired,
      station: PropTypes.number.isRequired,
    })
  ).isRequired,
  fileName: PropTypes.string.isRequired,
};

export default ExportButton;
