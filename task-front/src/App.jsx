import { BrowserRouter, Routes, Route } from "react-router-dom"
import TaskList from "./pages/TaskList"
import AddTask from "./pages/AddTask"
import Navbar from "./components/Navbar"
import TaskDetail from "./pages/TaskDetail"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/add" element={<AddTask />} />
        <Route path="/task/:id" element={<TaskDetail />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
