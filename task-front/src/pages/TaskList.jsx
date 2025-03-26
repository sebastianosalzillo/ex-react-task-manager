import { useGlobalContext } from "../context/GlobalContext"
import TaskRow from "../components/TaskRow"

function TaskList() {
  const { tasks } = useGlobalContext()

  return (
    <div>
      <h2>📋 Lista Task</h2>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Stato</th>
            <th>Data di Creazione</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <TaskRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TaskList
