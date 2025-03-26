import { useState, useRef } from "react"
import { useGlobalContext } from "../context/GlobalContext"

const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~"

function AddTask() {
  const [title, setTitle] = useState("")
  const [error, setError] = useState("")
  const descriptionRef = useRef()
  const statusRef = useRef()

  const { addTask } = useGlobalContext()

  const handleSubmit = (e) => {
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

    console.log("📝 Task da creare:", task)

    
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>➕ Aggiungi Task</h2>

      <div>
        <label>Nome:</label><br />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <label>Descrizione:</label><br />
        <textarea ref={descriptionRef}></textarea>
      </div>

      <div>
        <label>Stato:</label><br />
        <select defaultValue="To do" ref={statusRef}>
          <option>To do</option>
          <option>Doing</option>
          <option>Done</option>
        </select>
      </div>

      <button type="submit">Aggiungi Task</button>
    </form>
  )
}

export default AddTask
