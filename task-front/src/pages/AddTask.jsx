import { useState, useRef } from "react"
import { useGlobalContext } from "../context/GlobalContext"
import { useNavigate } from "react-router-dom"
import "../style/AddTask.css"

const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~"

function AddTask() {
  const [title, setTitle] = useState("")
  const [error, setError] = useState("")
  const descriptionRef = useRef()
  const statusRef = useRef()
  const navigate = useNavigate()
  const { addTask } = useGlobalContext()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (title.trim() === "") {
      setError("Il nome del task è obbligatorio.")
      return
    }

    if ([...title].some(char => symbols.includes(char))) {
      setError("Il nome non può contenere simboli speciali.")
      return
    }

    setError("")

    const task = {
      title,
      description: descriptionRef.current.value,
      status: statusRef.current.value
    }

    try {
      await addTask(task)
      alert("✅ Task creata con successo!")
      setTitle("")
      descriptionRef.current.value = ""
      statusRef.current.value = "To do"
      navigate("/")
    } catch (err) {
      alert("❌ Errore: " + err.message)
    }
  }

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <h2>➕ Aggiungi Task</h2>

      <div className="form-group">
        <label>Nome:</label>
        <input
          type="text"
          className="form-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {error && <p className="error-text">{error}</p>}

      <div className="form-group">
        <label>Descrizione:</label>
        <textarea className="form-textarea" ref={descriptionRef}></textarea>
      </div>

      <div className="form-group">
        <label>Stato:</label>
        <select className="form-select" defaultValue="To do" ref={statusRef}>
          <option>To do</option>
          <option>Doing</option>
          <option>Done</option>
        </select>
      </div>

      <button type="submit" className="btn">Aggiungi Task</button>
    </form>
  )
}

export default AddTask
