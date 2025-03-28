import { useState, useRef } from "react"
import Modal from "./Modal"
import "../style/EditTaskModal.css" 

function EditTaskModal({ show, onClose, task, onSave }) {
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [status, setStatus] = useState(task.status)
  const editFormRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    const updated = {
      ...task,
      title,
      description,
      status
    }
    onSave(updated)
  }

  return (
    <Modal
      title="Modifica Task"
      show={show}
      onClose={onClose}
      onConfirm={() => editFormRef.current.requestSubmit()}
      confirmText="Salva"
      content={
        <form className="edit-task-form" ref={editFormRef} onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="edit-title">Nome:</label>
            <input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-description">Descrizione:</label>
            <textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-textarea"
            />
          </div> 

          <div className="form-group">
            <label htmlFor="edit-status">Stato:</label>
            <select
              id="edit-status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="form-select"
            >
              <option>To do</option>
              <option>Doing</option>
              <option>Done</option>
            </select>
          </div>
        </form>
      }
    />
  )
}

export default EditTaskModal
