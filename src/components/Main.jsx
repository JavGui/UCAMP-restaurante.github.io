import React from "react";
import {
    Routes,
    Route
} from "react-router-dom";
import Historia from "./Historia"
import Menu from "./Menu"
import Reservaciones from "./Reservaciones"
import Sucursales from "./Sucursales"
import Home from "./Home"

export default function Main () {
    return(
        <main className="main">
                <Routes>
                    <Route exact path="/" element={<Home/>}/>
                    <Route path="/historia" element={<Historia/>}/>
                    <Route path="/menu" element={<Menu/>}/>
                    <Route path="/reservaciones" element={<Reservaciones/>}/>
                    <Route exact path="/sucursales" element={<Sucursales/>}/>
                </Routes>
        </main>
    )
}
