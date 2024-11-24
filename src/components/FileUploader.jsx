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
      <input type="file" accept=".tra" onChange={handleFileChange} />
    </div>
  );
}
FileUploader.propTypes = {
  onFileLoad: PropTypes.func.isRequired,
};

export default FileUploader;
