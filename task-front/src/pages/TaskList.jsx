import { useGlobalContext } from "../context/GlobalContext"

function TaskList() {
  const { tasks } = useGlobalContext()

  return (
    <div>
      <h2>📋 Lista Task</h2>
      {tasks.length === 0 ? (
        <p>Nessun task disponibile</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TaskList
