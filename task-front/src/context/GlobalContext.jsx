import { createContext, useContext } from "react"
import useTasks from "../hooks/useTasks"

const GlobalContext = createContext()

export function GlobalProvider({ children }) {
  const taskContext = useTasks() 

  return (
    <GlobalContext.Provider value={taskContext}>
      {children}
    </GlobalContext.Provider>
  )
}

export function useGlobalContext() {
  return useContext(GlobalContext)
}
