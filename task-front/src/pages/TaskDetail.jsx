import { useParams } from "react-router-dom"
import { useGlobalContext } from "../context/GlobalContext"
import { useEffect, useState } from "react"

function TaskDetail() {
  const { id } = useParams()
  const { tasks } = useGlobalContext()
  const [task, setTask] = useState(null)

  useEffect(() => {
    if (tasks.length > 0 && id) {
      const found = tasks.find(t => String(t.id) === String(id))
      setTask(found || null)
    }
  }, [tasks, id])

  if (tasks.length === 0) {
    return <p>⏳ Caricamento task...</p>
  }

  if (!task) {
    return <p>❌ Task non trovata (ID: {id})</p>
  }

  return (
    <div>
      <h2>📌 {task.title}</h2>
      <p><strong>Descrizione:</strong> {task.description}</p>
      <p><strong>Stato:</strong> {task.status}</p>
      <p><strong>Creato il:</strong> {new Date(task.createdAt).toLocaleDateString()}</p>
      <button onClick={() => console.log("🗑️ Elimino task con ID", task.id)}>Elimina Task</button>
    </div>
  )
}

export default TaskDetail
