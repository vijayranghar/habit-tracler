import "./style.css";

export default function Modal({ children, isVisible, onClose }) {
  if (isVisible) {
    return (
      <div className="overlay">
        <div className="modal-wrapper">
          <header>
            <button onClick={onClose} className="button-close">
              +
            </button>
          </header>
          {children}
        </div>
      </div>
    );
  }
  return <></>;
}
