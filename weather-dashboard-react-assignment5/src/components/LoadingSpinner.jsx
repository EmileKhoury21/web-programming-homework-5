// Shown while the weather request is in progress
function LoadingSpinner({ city }) {
  return (
    <div className="loading" role="status">
      <span className="spinner" aria-hidden="true"></span>
      <p className="status" data-state="loading">Loading {city}...</p>
    </div>
  );
}

export default LoadingSpinner;
