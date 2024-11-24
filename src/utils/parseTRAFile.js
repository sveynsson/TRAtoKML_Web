// src/utils/parseTRAFile.js
export function parseTRAFile(arrayBuffer) {
  const dataView = new DataView(arrayBuffer);
  let offset = 0;

  const readDouble = () => {
    const value = dataView.getFloat64(offset, true); // Little-Endian
    offset += 8;
    return value;
  };

  const readShort = () => {
    const value = dataView.getInt16(offset, true); // Little-Endian
    offset += 2;
    return value;
  };

  const readInt = () => {
    const value = dataView.getInt32(offset, true); // Little-Endian
    offset += 4;
    return value;
  };

  // Ersten Datensatz (Header) einlesen
  const headerRecord = {
    rR1: readDouble(),  // Radius 1 (Start)
    rR2: readDouble(),  // Radius 2 (End)
    rY: readDouble(),   // East Coordinate (Start)
    rX: readDouble(),   // North Coordinate (Start)
    rT: readDouble(),   // Bearing (Start)
    rS: readDouble(),   // Station (Start)
    nKz: readShort(),   // Element Type
    rL: readDouble(),   // Length (Start)
    rU1: readDouble(),  // Superelevation (Start)
    rU2: readDouble(),  // Superelevation (End)
    iC: readInt(),      // Distance to Route
  };

  // Anzahl der Datensätze ermitteln
  const iNumData = headerRecord.nKz + 1;

  const records = [];

  // Restliche Datensätze einlesen
  for (let i = 0; i < iNumData; i++) {
    const recordData = {
      rR1: readDouble(),
      rR2: readDouble(),
      rY: readDouble(),
      rX: readDouble(),
      rT: readDouble(),
      rS: readDouble(),
      nKz: readShort(),
      rL: readDouble(),
      rU1: readDouble(),
      rU2: readDouble(),
      iC: readInt(),
    };

    const record = {
      station: recordData.rS,
      rY: recordData.rY,
      rX: recordData.rX,
      direction: recordData.rT,
      radius: recordData.rR1,
    };

    records.push(record);
  }

  return records;
}
