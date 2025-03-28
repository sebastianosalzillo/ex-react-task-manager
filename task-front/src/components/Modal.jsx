import ReactDOM from "react-dom"
import "../style/Modal.css"

function Modal({ title, content, show, onClose, onConfirm, confirmText = "Conferma" }) {
  if (!show) return null

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <p>{content}</p>
        <div className="modal-buttons">
          <button onClick={onClose}>Annulla</button>
          <button onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root") // assicurati che esista nel tuo index.html!
  )
}

export default Modal
