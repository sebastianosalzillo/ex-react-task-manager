import React from "react"
import { Link } from "react-router-dom"
function TaskRow({ task }) {
  const { title, status, createdAt, id } = task

  const statusColor = {
    "To do": "#f8d7da",   // rosso chiaro
    "Doing": "#fff3cd",   // giallo chiaro
    "Done": "#d4edda"     // verde chiaro
  }

  return (
    <tr>
      
      <td><Link to={`/task/${id}`}>{title}</Link></td>
      <td style={{ backgroundColor: statusColor[status] || "#f0f0f0" }}>
        {status}
      </td>
      <td>{new Date(createdAt).toLocaleDateString()}</td>
    </tr>
  )
}


export default React.memo(TaskRow)
