import { useEffect, useState } from "react"

function useTasks() {
  const [tasks, setTasks] = useState([])


  useEffect(() => {


    async function fetchTasks() {
      try {
        const res = await fetch(import.meta.env.VITE_API_URL)
        const data = await res.json()
        console.log(" Task iniziali:", data)
        setTasks(data)
      } catch (error) {
        console.error(" Errore nel fetch:", error)
      }
    }

    fetchTasks()
  }, [])


  const addTask = async (taskData) => {
    try {
      const res = await fetch(import.meta.env.VITE_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData)
      })

      const result = await res.json()

      if (!result.success) {
        throw new Error(result.message || "Errore generico durante la creazione")
      }

      setTasks(prev => [...prev, result.task])
    } catch (error) {
      throw new Error(error.message)
    }
  }


  const removeTask = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
        method: "DELETE",
      })

      const result = await res.json()

      if (!result.success) {
        throw new Error(result.message || "Errore durante l'eliminazione del task")
      }


      setTasks(prev => prev.filter(task => task.id !== id))
    } catch (error) {
      throw new Error(error.message)
    }
  }

  const updateTask = async (updatedTask) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/${updatedTask.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask)
      })

      const result = await res.json()

      if (!result.success) {
        throw new Error(result.message || "Errore durante l'aggiornamento")
      }



      setTasks(prev =>
        prev.map(t => t.id === updatedTask.id ? result.task : t)
      )
    } catch (error) {
      throw new Error(error.message)
    }
  }

  
  return {
    tasks,
    addTask,
    removeTask,
    updateTask
  }
}

export default useTasks
