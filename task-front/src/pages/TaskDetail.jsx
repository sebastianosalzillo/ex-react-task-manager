import { useParams, useNavigate } from "react-router-dom"
import { useGlobalContext } from "../context/GlobalContext"
import { useEffect, useState } from "react"

function TaskDetail() {
  const { id } = useParams()
  const { tasks, removeTask } = useGlobalContext()
  const navigate = useNavigate()
  const [task, setTask] = useState(null)

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
      navigate("/") // 🔁 Torna alla home
    } catch (err) {
      alert("❌ Errore durante l'eliminazione: " + err.message)
    }
  }

  return (
    <div>
      <h2>📌 {task.title}</h2>
      <p><strong>Descrizione:</strong> {task.description}</p>
      <p><strong>Stato:</strong> {task.status}</p>
      <p><strong>Data di creazione:</strong> {new Date(task.createdAt).toLocaleDateString()}</p>

      <button onClick={handleDelete}>🗑️ Elimina Task</button>
    </div>
  )
}

export default TaskDetail
