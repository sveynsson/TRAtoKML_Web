// src/utils/projections.js
import proj4 from 'proj4';

// Anpassung der Vorzeichen der Rotationsparameter und des Maßstabsfaktors
proj4.defs('EPSG:5683',
  '+proj=tmerc +lat_0=0 +lon_0=9 +k=1 +x_0=3500000 +y_0=0 +ellps=bessel ' +
  '+towgs84=584.9636,107.7175,413.8067,1.1155214628,0.2824339890,-3.1384490633,-7.992235 +units=m +no_defs'
);

// Zuordnung der GK-Zonen zu unseren Projektionen
export const GK_PROJECTIONS = {
  '3': 'EPSG:5683',
  // Weitere Zonen können hier hinzugefügt werden
};

// WGS84 ist standardmäßig definiert
export const WGS84 = 'WGS84';
