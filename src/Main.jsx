import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from "./Home";
import Reservaciones from "./Reservaciones";
import Sucursales from "./Sucursales";

const Main = () => {
    return (
        <main>
            <Routes>
                <Route exact path="/" element={ <Home /> } />
                <Route path="/Reservaciones" element={ <Reservaciones/> } />
                <Route path="/Sucursales"  element={ <Sucursales/> } />
            </Routes>
        </main>
    );
};

export default Main 