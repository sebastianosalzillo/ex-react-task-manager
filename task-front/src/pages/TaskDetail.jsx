import { useParams, useNavigate } from "react-router-dom"
import { useGlobalContext } from "../context/GlobalContext"
import { useEffect, useState } from "react"
import Modal from "../components/Modal"
import EditTaskModal from "../components/EditTaskModal"

function TaskDetail() {
  const { id } = useParams()
  const { tasks, removeTask } = useGlobalContext()
  const navigate = useNavigate()
  const [task, setTask] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const { updateTask } = useGlobalContext()
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

  if (tasks.length === 0) return <p>⏳ Caricamento task...</p>
  if (!task) return <p>❌ Task non trovata (ID: {id})</p>

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
    <div>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>{task.status}</p>
      <p>{new Date(task.createdAt).toLocaleDateString()}</p>

      <button onClick={() => setShowModal(true)}>🗑️ Elimina Task</button>

      <Modal
        title="Conferma eliminazione"
        content="Sei sicuro di voler eliminare questa task?"
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        confirmText="Elimina"
      />
      <button onClick={() => setShowEdit(true)}>✏️ Modifica Task</button>

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
