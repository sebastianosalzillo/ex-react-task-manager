import { useState, useRef } from "react"
import Modal from "./Modal"

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
        <form ref={editFormRef} onSubmit={handleSubmit}>
          <label>Nome:</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" />

          <label>Descrizione:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

          <label>Stato:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>To do</option>
            <option>Doing</option>
            <option>Done</option>
          </select>
        </form>
      }
    />
  )
}

export default EditTaskModal
