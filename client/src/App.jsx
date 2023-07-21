import './App.css'
import { Routes, Route, useLocation, } from "react-router-dom"
import Home from "./Views/Home/Home"
import About from "./Views/About/About"
import Inicio from './Views/LandingPage/LandingPage'
import Form from './Views/Form/Form'
import Detail from './Views/CountryDeatail/CountryDetail.jsx'

//! crear repopoo antes de iniciar

function App() {


  return (
   
      <div>
        <Routes>
          <Route exact path="/" element={<Inicio />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/create' element={<Form />}></Route>
          <Route path='/detail/:id' element={<Detail />}></Route>
        </Routes>    
      </div>
    
  )
}

export default App
