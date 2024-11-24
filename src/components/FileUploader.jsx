// src/components/FileUploader.jsx
import PropTypes from 'prop-types';

function FileUploader({ onFileLoad }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileLoad(file);
    }
  };

  return (
    <div className="file-uploader">
      <label htmlFor="file-upload" className="custom-file-upload">
        Datei auswählen
      </label>
      <input id="file-upload" type="file" accept=".tra" onChange={handleFileChange} />
    </div>
  );
}

FileUploader.propTypes = {
  onFileLoad: PropTypes.func.isRequired,
};

export default FileUploader;
