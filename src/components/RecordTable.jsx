// src/components/RecordTable.jsx
import PropTypes from 'prop-types';
import './RecordTable.css';

function RecordTable({ records, selectedRecords, setSelectedRecords }) {
  const handleCheckboxChange = (record) => {
    if (selectedRecords.includes(record)) {
      // Record abwählen
      const updatedSelection = selectedRecords.filter((r) => r !== record);
      setSelectedRecords(updatedSelection);
    } else {
      // Record auswählen
      setSelectedRecords([...selectedRecords, record]);
    }
  };

  return (
    <div className="record-table">
      <h2>TRA Elemente</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Station</th>
            <th>Rechtswert (Y)</th>
            <th>Hochwert (X)</th>
            <th>Richtung</th>
            <th>Radius</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRecords.includes(record)}
                  onChange={() => handleCheckboxChange(record)}
                />
              </td>
              <td>{record.station !== undefined ? record.station.toFixed(3) : 'N/A'}</td>
              <td>{record.rY.toFixed(3)}</td>
              <td>{record.rX.toFixed(3)}</td>
              <td>{record.direction.toFixed(6)}</td>
              <td>{record.radius.toFixed(3)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

RecordTable.propTypes = {
  records: PropTypes.array.isRequired,
  selectedRecords: PropTypes.array.isRequired,
  setSelectedRecords: PropTypes.func.isRequired,
};

export default RecordTable;
