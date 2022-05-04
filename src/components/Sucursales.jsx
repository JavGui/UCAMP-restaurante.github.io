import React from 'react';

function Sucursales() {    
    function abrir_Popup(url) 
    {
        const configuracion_ventana = "menubar=no, scrollbars=no, left=400, top=420, toolbar=no, location=no, status=no, width=850, height=420";
        window.open(url, "Mapa Ubicación", configuracion_ventana);
    }
    const url1 = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1882.8586449662805!2d-99.12949464195208!3d19.294656696740702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ce01a08ab020fd%3A0x70fd8b2ed6f90295!2sGran%20Terraza%20Coapa!5e0!3m2!1ses!2smx!4v1650478578077!5m2!1ses!2smx";
    const url2 = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3764.5449468057323!2d-99.18190038512292!3d19.345542786933816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1fffb1ff033dd%3A0x25b2b4dd8162233f!2sOasis%20Coyoac%C3%A1n!5e0!3m2!1ses!2smx!4v1650478337791!5m2!1ses!2smx";
    const url3 = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.280024378333!2d-99.22153518512336!3d19.313651486951983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cdff965c918235%3A0x994d8c0a11052a5e!2sArtz%20Pedregal!5e0!3m2!1ses!2smx!4v1650477413221!5m2!1ses!2smx";

    return (
        <div className='sucursales'>
            <ul className="lista-sucursales">
                <li onClick={(()=> abrir_Popup(url1))}>Gran Terraza Acoxpa</li>
                <li onClick={(()=> abrir_Popup(url2))}>Oasis Coyoacán</li>
                <li onClick={(()=> abrir_Popup(url3))}>Artz Pedregal</li>
            </ul>
        </div>            
    );
}

export default Sucursales;
