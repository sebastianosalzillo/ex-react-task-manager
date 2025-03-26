import React from "react"

function TaskRow({ task }) {
  const { title, status, createdAt } = task

  const statusColor = {
    "To do": "#f8d7da",   // rosso chiaro
    "Doing": "#fff3cd",   // giallo chiaro
    "Done": "#d4edda"     // verde chiaro
  }

  return (
    <tr>
      <td>{title}</td>
      <td style={{ backgroundColor: statusColor[status] || "#f0f0f0" }}>
        {status}
      </td>
      <td>{new Date(createdAt).toLocaleDateString()}</td>
    </tr>
  )
}


export default React.memo(TaskRow)
