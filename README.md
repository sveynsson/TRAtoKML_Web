# TRA to KML Converter - Web App

Eine moderne React-Webanwendung zur Konvertierung von TRA-Dateien (Trassenformat) in KML-Format für Google Earth.

##  Live Demo

[https://sveynsson.github.io/TRAtoKML_Web/](https://sveynsson.github.io/TRAtoKML_Web/)

##  Features

- **Einzeldatei-Konverter**: Konvertiere einzelne TRA-Dateien
- **Batch-Konverter**: Verarbeite mehrere TRA-Dateien gleichzeitig
- **13 Koordinatensysteme**:
  - DHDN / Gauß-Krüger (Zone 2-5) - EPSG:31466-31469
  - RD/83 / Gauß-Krüger (Zone 2-5) - EPSG:5668-5669, 3398-3399
  - Pulkovo 1942(83) / Gauß-Krüger (Zone 4-5) - EPSG:2398, 5650
  - ETRS89 / UTM (Zone 32-33) - EPSG:25832-25833, 3044-3045, 5652-5653
- **Dynamische Farbgenerierung**: Automatische Farbzuweisung mit RGB-Distanz-Algorithmus
- **Interaktive Kartenansicht**: Visualisierung mit Leaflet
- **KML-Export**: Optimiert für Google Earth mit farbcodierten Tracks

##  Technologie-Stack

- **React 18.2.0**: Modern UI framework
- **Vite 5.0.8**: Lightning-fast build tool
- **Tailwind CSS 3.4.0**: Utility-first CSS
- **Leaflet 1.9.4**: Interactive maps
- **proj4 2.9.2**: Coordinate transformations
- **GitHub Actions**: Automated CI/CD

##  Lokale Entwicklung

\\\ash
# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Build erstellen
npm run build

# Preview der Production Build
npm run preview
\\\

##  Deployment

Das Projekt wird automatisch via GitHub Actions zu GitHub Pages deployed:

1. Push zu \main\ Branch triggert automatisches Deployment
2. GitHub Actions baut die App
3. Deploy zu GitHub Pages
4. Live unter: https://sveynsson.github.io/TRAtoKML_Web/

##  Lizenz

MIT License
