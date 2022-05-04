import React from 'react';

import ucamp from './ucamp.png';

import './index.css'

const Home = () =>{
    return (
        <div className="principal">
            <div className='imagen'>
                <img src= {ucamp } alt="Logo"/>
            </div>
        </div>
    );
}

export default Home