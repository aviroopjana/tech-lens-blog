import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/Home"
import SignIn from "./pages/Signin"
import SignUp from "./pages/SignUp"
import AboutPage from "./pages/About"
import Dashboard from "./pages/Dashboard"
import Projects from "./pages/Projects"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/projects" element={<Projects/>} />
      </Routes>
    </BrowserRouter>
  )
}