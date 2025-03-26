import { NavLink } from "react-router-dom"

function Navbar() {
  return (
    <nav style={{ padding: "1rem", background: "#eee" }}>
      <NavLink to="/" >Lista Task</NavLink>
      <NavLink to="/add">Aggiungi Task</NavLink>
    </nav>
  )
}

export default Navbar