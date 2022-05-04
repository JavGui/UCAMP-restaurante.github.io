import React from 'react'
import './Style.css'
import { Link } from 'react-router-dom'
import LogoI from './Picabira.png'

export default function Header () {
    return(
        <header className='header'>
            <div className='header-left'>
                <div><img className="LogoPicabira" src={LogoI} alt=""></img></div>
                <div>
                    <nav className='navMenu'>
                        <Link to='/historia' className='navEnlace'><h3>Historia</h3></Link>
                        <Link to='/menu' className='navEnlace' ><h3>Menú</h3></Link>
                        <Link to='/reservaciones' className='navEnlace'><h3>Reservaciones</h3></Link>
                        <Link to='/sucursales' className='navEnlace'><h3>Sucursales</h3></Link>
                    </nav>
                </div>
            </div>
            <div className='header-rigth'>
                <Link to='/' className='navEnlace'><h3>Inicio</h3></Link>
            </div>
        </header>
    )
}
