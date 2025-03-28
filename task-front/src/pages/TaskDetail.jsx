import { useParams, useNavigate } from "react-router-dom"
import { useGlobalContext } from "../context/GlobalContext"
import { useEffect, useState } from "react"
import Modal from "../components/Modal"
import EditTaskModal from "../components/EditTaskModal"
import "../style/TaskDetail.css" 

function TaskDetail() {
  const { id } = useParams()
  const { tasks, removeTask, updateTask } = useGlobalContext()
  const navigate = useNavigate()
  const [task, setTask] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showEdit, setShowEdit] = useState(false)

  const handleUpdate = async (updatedTask) => {
    try {
      await updateTask(updatedTask)
      alert("✅ Task modificata con successo!")
      setShowEdit(false)
      navigate("/")
    } catch (err) {
      alert("❌ Errore: " + err.message)
    }
  }

  useEffect(() => {
    if (tasks.length > 0 && id) {
      const found = tasks.find(t => String(t.id) === String(id))
      setTask(found || null)
    }
  }, [tasks, id])

  if (tasks.length === 0) return <p className="loading">⏳ Caricamento task...</p>
  if (!task) return <p className="error">❌ Task non trovata (ID: {id})</p>

  const handleDelete = async () => {
    try {
      await removeTask(task.id)
      alert("✅ Task eliminata con successo!")
      navigate("/")
    } catch (err) {
      alert("❌ Errore durante l'eliminazione: " + err.message)
    }
  }

  return (
    <div className="task-detail-container">
      <h2 className="task-title">{task.title}</h2>
      <p><strong>Descrizione:</strong> {task.description}</p>
      <p><strong>Stato:</strong> {task.status}</p>
      <p><strong>Data:</strong> {new Date(task.createdAt).toLocaleDateString()}</p>

      <div className="button-group">
        <button className="btn delete" onClick={() => setShowModal(true)}>🗑️ Elimina Task</button>
        <button className="btn edit" onClick={() => setShowEdit(true)}>✏️ Modifica Task</button>
      </div>

      <Modal
        title="Conferma eliminazione"
        content="Sei sicuro di voler eliminare questa task?"
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        confirmText="Elimina"
      />

      <EditTaskModal
        show={showEdit}
        onClose={() => setShowEdit(false)}
        task={task}
        onSave={handleUpdate}
      />
    </div>
  )
}

export default TaskDetail
