// Shown when the request fails. The Retry button asks the parent to search again.
function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error" role="alert">
      <p className="status" data-state="error">{message}</p>
      <button type="button" className="retry" onClick={onRetry}>
        Retry
      </button>
    </div>
  );
}

export default ErrorMessage;
