import { useState, useMemo } from "react"
import { useGlobalContext } from "../context/GlobalContext"
import TaskRow from "../components/TaskRow"
import "../style/TaskList.css" // <-- aggiungi questo file per lo stile

function TaskList() {
  const { tasks } = useGlobalContext()
  const [sortBy, setSortBy] = useState("createdAt")
  const [sortOrder, setSortOrder] = useState(1) // 1 = crescente, -1 = decrescente

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(prev => -prev)
    } else {
      setSortBy(column)
      setSortOrder(1)
    }
  }

  const sortedTasks = useMemo(() => {
    const statusOrder = { "To do": 1, "Doing": 2, "Done": 3 }

    return [...tasks].sort((a, b) => {
      let result = 0
      if (sortBy === "title") {
        result = a.title.localeCompare(b.title)
      } else if (sortBy === "status") {
        result = statusOrder[a.status] - statusOrder[b.status]
      } else if (sortBy === "createdAt") {
        result = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      }
      return result * sortOrder
    })
  }, [tasks, sortBy, sortOrder])

  const getArrow = (column) => {
    if (sortBy !== column) return ""
    return sortOrder === 1 ? "↑" : "↓"
  }

  return (
    <div className="task-list">
      <h2>📋 Lista Task</h2>

      <table className="task-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("title")}>
              Nome {getArrow("title")}
            </th>
            <th onClick={() => handleSort("status")}>
              Stato {getArrow("status")}
            </th>
            <th onClick={() => handleSort("createdAt")}>
              Data di Creazione {getArrow("createdAt")}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map(task => (
            <TaskRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TaskList

