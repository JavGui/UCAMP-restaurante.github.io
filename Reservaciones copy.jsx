import db from 'C:/BOOTCAMP REACT/restaurante/src/firebase';
import React, { useState, Fragment } from 'react';
import { collection, getDocs, addDoc} from "firebase/firestore/lite";

const Reservaciones = () => 
{
    const [fecha, setFecha] = useState("");
    const [fechaValida, setFechaValida] = useState("");
    const [horaValida, setHoraValida] = useState("");
    const [nombre, setNombre] = useState("");
    const [apPaterno, setApPaterno] = useState("");
    const [apMaterno, setApMaterno] = useState("");
    const [telefono, setTelefono] = useState("");
    const [correo, setCorreo] = useState("");
    const [correcta, setCorrecta] = useState(false);
    const [invalida, setInvalida] = useState(false);
    const [datos, setDatos] = useState(false);
    const [error, setError] = useState(false);
    const [estado, setEstado] = useState();
    
    // ********** VALIDA FORMULARIO **********

    async function ValidaFormulario() 
    {
        console.log("Entré a ValidaFormulario");

        console.log("Campos de entrada: ", fecha, nombre, apPaterno, apMaterno, telefono, correo);

        if (fecha === "" || nombre ==="" || apPaterno ==="" || apMaterno ==="" || telefono ==="" || correo ==="" )
        {
            console.log("Datos Vacíos");
            setCorrecta(false);
            setDatos(true);
            console.log("Salgo de validaFormulario");
            return;
        }           
       
        let dia = fecha.substr(8, 2);
        let mes = fecha.substr(5, 2);
        let año = fecha.substr(0, 4);

        let diaValido = (`${dia}/${mes}/${año}`);
        let horaValida = fecha.substr(11, 5);

        setFechaValida(diaValido);
        setHoraValida(horaValida);

        console.log("fechaConvertida: ", diaValido);
        console.log("horaConvertida: ", horaValida);

        // ********** INICIA LEER FIREBASE **********
        console.log("Entro a leer firebase");
        const coleccion = collection(db, 'reservaciones');
        const documentosSnapshot = await getDocs(coleccion);
        const contenido = documentosSnapshot.docs.map((doc) => doc.data());
        setEstado(contenido);
        console.log(estado);
        console.log("Salgo de firebase");
        // ********** TERMINA LEER FIREBASE **********

        if( !estado || estado.length === null || estado.length === 0)
        { 
            console.log("Sin datos en FireBase");
            console.log(fechaValida, horaValida, nombre, apPaterno, apMaterno, telefono, correo);
            if (fechaValida !== "" && horaValida !== "" && nombre !=="" && apPaterno !=="" && apMaterno !=="" && telefono !=="" && correo !=="" ){
                console.log("Se manda a GrabaReservacion desde sin datos")
                let resultado = GrabaReservacion(fechaValida, horaValida, nombre, apPaterno, apMaterno, telefono, correo);
                if( resultado ){ setError(false); setCorrecta(false); setInvalida(false)}
                else{ setError(true); }
                console.log("Regreso de GrabaReservacion")
            }
            console.log("Salgo de ValidaFormulario desde sin datos");                 
            setCorrecta(true);
            setInvalida(false);
            setDatos(false);
        } 
        else
        {    
            console.log("Sin hay datos en FireBase");
            console.log(estado.length);
            console.log("Datos: ", fechaValida, horaValida);            
            // eslint-disable-next-line array-callback-return
            estado.map((doc) => 
            {            
                console.log("Entro al map de estado");
                console.log("Datos: ", fechaValida, horaValida);
                console.log("Base: ", doc.fechaValida, doc.horaValida);
                if (doc.fechaValida === fechaValida && doc.horaValida === horaValida){
                    console.log("Entro al then dal Map de estado, ya existe la reserva");
                    setCorrecta(false);
                    setInvalida(true);
                    console.log("Salgo del map de estado, ya existe la reserva");
                    return false;
                }
                console.log("Entro al Map de estado, no existe la reserva");
                
                if (fechaValida !== "" && horaValida !=="" && nombre !=="" && apPaterno !=="" && apMaterno !=="" && telefono !=="" && correo !=="" )
                {
                    console.log("Se manda a GrabaReservacion, no existe la reserva"); 
                    let resultado = GrabaReservacion(fechaValida, horaValida, nombre, apPaterno, apMaterno, telefono, correo);
                    if( resultado ){ setError(false); }
                    else{ setError(true); }                    
                    
                    console.log("Regreso de GrabaReservacion, no existe la reserva");

                    setCorrecta(true);
                    setInvalida(false);
                    setDatos(false);
                    console.log("Salgo del map de estado, no existe la reserva");
                }   
            })
        }
    }

    return(
    <Fragment>
        <h2 className="H1-Reserva">Reservaciones</h2>
        <form className="forma">   
            <div className="captura">                  
                <label className="etiquetas">* Fecha y Hora </label>
                <input className="campos" type="datetime-local" onChange={ e => setFecha(e.target.value) }/>
            </div>
            <br/>
            <div className="captura">
                <label className="etiquetas">* Nombre </label> 
                <input className="campos" type="text" onChange={ e => setNombre(e.target.value)}/>
            </div>
            <br/>
            <div className="captura">
                <label className="etiquetas">* Apellido Paterno </label>
                <input className="campos" type="text" onChange={ e => setApPaterno(e.target.value)}/>
            </div>
            <br/>
            <div className="captura">
                <label className="etiquetas">* Apellido Materno </label>
                <input className="campos" type="text" onChange={ e => setApMaterno(e.target.value)}/>
            </div>
            <br/>
            <div className="captura">
                <label className="etiquetas">* Teléfono </label>
                <input className="campos" type="number" onChange={ e => setTelefono(e.target.value)}/>
            </div>
            <br/>
            <div className="captura">
                <label className="etiquetas">* Correo </label>
                <input className="campos" type="email" onChange={ e => setCorreo(e.target.value)}/>
            </div>
            <br/>
            <br/>
            <div className="botones">
                <div>
                    <button className="botonEnviar" type="button" onClick={ ValidaFormulario }>Enviar</button>
                </div>
                <div>
                    <a className="anclaRegresar" href='./containers/Main'>Regresar</a>
                </div>
            </div>
        </form>
        <br/>
        <br/>

        {( error ) ? <p className="error">Error al grabar una reservación</p> : <p> </p>}

        {( datos ) ? <p className="error">Los campos marcados con * son obligatorios</p> : <p> </p>}

        {( correcta ) ? <p className="resumen">Su reservación está confirmada para el día <u>{ fechaValida }</u> a las <u>{ horaValida }</u> a nombre de <u>{ nombre } { apPaterno } { apMaterno }</u></p> : <p> </p>}

        {( invalida ) ? <p className="invalida">Ya existe una reservación para esta fecha y hora, por favor elija otra</p> : <p> </p>}

    </Fragment>
    )
}

function GrabaReservacion(fechaValida, horaValida, nombre, apPaterno, apMaterno, telefono, correo){
    console.log("Entré a grabar la reservación");
    console.log(fechaValida, horaValida, nombre, apPaterno, apMaterno, telefono, correo);
    try{
        addDoc(collection(db, 'reservaciones'), { fechaValida, horaValida, nombre, apPaterno, apMaterno, telefono, correo });
        console.log("Salí de grabar la reservación, true");
        return true;
    }
    catch{
        console.log("Salí de grabar la reservación, false");
        return false;
    }
}

export default Reservaciones;