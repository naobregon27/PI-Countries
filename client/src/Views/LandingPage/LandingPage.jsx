import "./landingPage.css"
import React from 'react'
import { Link } from 'react-router-dom'
//import './inicio.css';


function Inicio() {
    return (
        <div className='contenedor'>


            <div>
                <h2 className='h22' name="PLanding1" key="PLanding1"> Developed by Nahuel Obregon </h2>

                <h2 className='h22' name="PLanding2" key="PLanding2">I hope you enjoy it!</h2>
            </div>

            <div className='titulo'>
                <h1 className="tit"> Individual Project </h1>
                <h1 className="tit"> Henry Countries </h1>
            </div>

            <hr />


            <Link to="/home"><buttom className= "Boton">Start</buttom></Link>


        </div>
    )
}

export default Inicio