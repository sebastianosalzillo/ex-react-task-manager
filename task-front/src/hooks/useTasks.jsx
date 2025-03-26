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

  
  const addTask = (newTask) => {
    
  }

  const removeTask = (id) => {
    
  }

  const updateTask = (updatedTask) => {
    
  }

  return {
    tasks,
    addTask,
    removeTask,
    updateTask
  }
}

export default useTasks
