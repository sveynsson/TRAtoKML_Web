// src/App.jsx
import { useState } from 'react';
import FileUploader from './components/FileUploader';
import GKZoneSelector from './components/GKZoneSelector';
import RecordTable from './components/RecordTable';
import MapView from './components/MapView';
import ExportButton from './components/ExportButton';
import { parseTRAFile } from './utils/parseTRAFile';
import { GK_PROJECTIONS, WGS84 } from './utils/projections';
import proj4 from 'proj4';
import './styles.css';

function App() {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null);
  const [gkZone, setGkZone] = useState('');
  const [fileName, setFileName] = useState(''); // Neuer State für den Dateinamen
  const [selectedRecords, setSelectedRecords] = useState([]); // Neuer State für ausgewählte Records


  const handleFileLoad = (file) => {
    if (!gkZone) {
      setError('Bitte wähle eine GK-Zone aus.');
      return;
    }
    
    setFileName(file.name.replace(/\.[^/.]+$/, '')); // Dateiname ohne Erweiterung speichern

    const reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = e.target.result;
      try {
        const parsedRecords = parseTRAFile(arrayBuffer);

        // Transformation der Koordinaten
        const transformedRecords = parsedRecords.map((record) => {
          // Reihenfolge der Koordinaten: [rY, rX]
          const [lon, lat] = proj4(
            GK_PROJECTIONS[gkZone],
            WGS84,
            [record.rY, record.rX]
          );
          return { ...record, lon, lat };
        });

        // Filtern ungültiger Koordinaten
        const validRecords = transformedRecords.filter(
          (record) =>
            record.lon !== 0 &&
            record.lat !== 0 &&
            !isNaN(record.lon) &&
            !isNaN(record.lat) &&
            record.station !== undefined &&
            record.rY !== undefined &&
            record.rX !== undefined &&
            record.direction !== undefined &&
            record.radius !== undefined
        );

        setRecords(validRecords);
        setSelectedRecords(validRecords);
        console.log('Valid Records:', validRecords);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Fehler beim Parsen der TRA-Datei.');
      }
    };
    reader.onerror = () => {
      setError('Fehler beim Lesen der Datei.');
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="App">
      <h1>TRAtoKML</h1>
      <GKZoneSelector selectedZone={gkZone} onChange={setGkZone} />
      <FileUploader onFileLoad={handleFileLoad} />
      {error && <p className="error">{error}</p>}
      {records.length > 0 && (
        <>
          <RecordTable
            records={records}
            selectedRecords={selectedRecords}
            setSelectedRecords={setSelectedRecords}
          />
          <ExportButton
            records={selectedRecords}
            allRecords={records}
            fileName={fileName}
          />
          <MapView records={records} selectedRecords={selectedRecords} />
        </>
      )}
    </div>
  );
}

export default App; 
