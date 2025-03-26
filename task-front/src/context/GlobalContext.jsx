import { createContext, useContext, useEffect, useState } from "react"

const GlobalContext = createContext()

export function GlobalProvider({ children }) {
  const [tasks, setTasks] = useState([])

  const apiUrl = import.meta.env.VITE_API_URL
  
  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        console.log("📦 Task ricevuti:", data)
        setTasks(data)
      } catch (error) {
        console.error("Errore nel recupero dei task:", error)
      }
    }

    fetchTasks()
  }, [])

  return (
    <GlobalContext.Provider value={{ tasks, setTasks }}>
      {children}
    </GlobalContext.Provider>
  )
}

export function useGlobalContext() {
  return useContext(GlobalContext)
}
