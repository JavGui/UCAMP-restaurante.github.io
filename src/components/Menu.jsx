import React from "react";
import pdfLunch from './LunchMenu.pdf'
import pdfMainMenu from './MainMenu.pdf'
import pdfDrinks from './DrinksMenu.pdf'



export default function Menu () {
    return(
            <div className='menus'>
                <ul className="menus1">
                    <a href = {pdfLunch} target="blank"><li className="caja2"><h3>Desayuno</h3></li></a>
                    <a href = {pdfMainMenu} target="blank"><li className="caja2"><h3>Comida y Cena</h3></li></a>
                    <a href = {pdfDrinks} target="blank"><li className="caja2"><h3>Bebidas</h3></li></a>
                </ul>
            </div>
    )
}
