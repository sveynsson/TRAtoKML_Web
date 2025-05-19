// src/components/GKZoneSelector.jsx

import PropTypes from 'prop-types';

function GKZoneSelector({ selectedZone, onChange }) {
  return (
    <div className="gk-zone-selector">
      <label htmlFor="gk-zone">GK-Zone auswählen:</label>
      <select id="gk-zone" value={selectedZone} onChange={(e) => onChange(e.target.value)}>
        <option value="">--Wähle eine GK-Zone--</option>
        <option value="3">GK Zone 3</option>
        <option value="4">GK Zone 4</option>
        {/* Weitere Zonen können hier hinzugefügt werden */}
      </select>
      <small>Bitte wähle die GK-Zone, die deiner TRA-Datei entspricht.</small>
    </div>
  );
}

GKZoneSelector.propTypes = {
  selectedZone: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default GKZoneSelector;
