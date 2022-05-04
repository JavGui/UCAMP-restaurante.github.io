import React from 'react';
import { Link } from 'react-router-dom';

import ucamp from './ucamp.png';

function Header()
{
    return (
        <header className='block1'>
            <div className='imagen'>
                <img src= {ucamp } alt="Logo"/>
            </div>
            <ul className="nav-bar">
                <li className='nav-item'><Link  to='/'>Home</Link></li>
                <li className='nav-item'><Link  to='/reservaciones'>Reservaciones</Link></li>
                <li className='nav-item'><Link  to='/Sucursales'>Sucursales</Link></li>
            </ul>
        </header>
    );
}

export default Header;
