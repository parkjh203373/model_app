import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Main_contents from "./components/Main_contents"
import TipsForm from "./components/TipsForm"
import IrisForm from "./components/IrisForm"

function App() {

  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Main_contents />} />
        <Route path="/tips" element={<TipsForm />} />
        <Route path="/iris" element={<IrisForm />} />
      </Routes>
    </>
  )
}

export default App
