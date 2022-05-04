import db from '../firebase';
import { Link } from 'react-router-dom';
import React, { useState, Fragment, useEffect } from 'react';
import { collection, getDocs, addDoc} from "firebase/firestore/lite";

const Reservaciones = () => 
{
    const [formState, setformState] = useState({
        numero: "",
        nombre: "",
        apPaterno: "",
        apMaterno: "",
        telefono: "",
        correo: ""
    });
    
    const { numero, nombre, apPaterno, apMaterno, telefono, correo } = formState;

    const handleInputChange = ({ target }) => {
        setformState({
            ...formState,
            [target.name] : target.value
        });
    }
    const [fecha, setFecha] = useState("");
    const [fechaValida, setFechaValida] = useState("");
    const [horaValida, setHoraValida] = useState("");
    const [correcta, setCorrecta] = useState(false);
    const [invalida, setInvalida] = useState(false);
    const [datos, setDatos] = useState(false);
    const [error, setError] = useState(false);
    const [estado, setEstado] = useState();
    
    useEffect(() => {
        LeerFirebase(db)  
    }, [fecha]);
    

    async function LeerFirebase(db){
        console.log("Entro a leer firebase");
        const coleccion = collection(db, 'reservaciones');
        const documentosSnapshot = await getDocs(coleccion);
        const contenido = documentosSnapshot.docs.map((doc) => doc.data());
        setEstado(contenido);
        console.log(estado);
        console.log("Salgo de firebase");
    }

    // ********** VALIDA FORMULARIO **********

    async function ValidaFormulario() 
    {
        console.log("Entré a ValidaFormulario");

        console.log("Campos de entrada: ", fecha, numero, nombre, apPaterno, apMaterno, telefono, correo);

        if (fecha === "" || numero ==="" || nombre ==="" || apPaterno ==="" || apMaterno ==="" || telefono ==="" || correo ==="" )
        {
            console.log("Datos Obligatorios Vacíos");
            setCorrecta(false);
            setError(false);
            setInvalida(false);
            setDatos(true);
            console.log("Salgo de validaFormulario");
            return;
        }           

        let dia = fecha.substr(8, 2);  // tolocaldatetime.string
        let mes = fecha.substr(5, 2);
        let año = fecha.substr(0, 4);

        let armaFecha = (`${dia}/${mes}/${año}`);
        let armaHora = fecha.substr(11, 5);;

        setFechaValida(armaFecha);
        setHoraValida(armaHora);

        console.log("fechaConvertida: ", armaFecha);
        console.log("horaConvertida: ", armaHora);

        if( !estado || estado.length === null || estado.length === 0)
        { 
            console.log("Sin datos en FireBase");
            console.log(armaFecha, armaHora, numero, nombre, apPaterno, apMaterno, telefono, correo);
            if (armaFecha !== "" && armaHora !== "" && numero !=="" && nombre !=="" && apPaterno !=="" && apMaterno !=="" && telefono !=="" && correo !=="" ){
                console.log("Se manda a GrabaReservacion desde sin datos")
                let resultado = GrabaReservacion(armaFecha, armaHora, numero, nombre, apPaterno, apMaterno, telefono, correo);
                if( resultado )
                    { 
                        setCorrecta(true);
                        setError(false);
                        setInvalida(false);
                        setDatos(false);
                        setFecha("");
                        console.log(fecha);
                        console.log("Regreso de GrabaReservacion correcta, sin datos en firebase");
                    }
                    else
                    { 
                        setCorrecta(false);
                        setError(true);
                        setInvalida(false);
                        setDatos(false);
                        setFecha(""); 
                        console.log("Regreso de GrabaReservacion incorrecta, sin datos en firebase");
                    }
                console.log("Regreso de GrabaReservacion")
            }

            console.log("Salgo de ValidaFormulario desde sin datos");                 
            return;
        } 
        else
        {    
            let existeReserva = false;
            console.log("existeReserva: ", existeReserva);
            console.log("Sin hay datos en FireBase");
            console.log(estado.length);
            console.log("Datos: ", armaFecha, armaHora);            
            await estado.map((doc) => 
            {            
                console.log("Entro al map de estado");
                console.log("Datos: ", armaFecha, armaHora);
                console.log("Base: ", doc.fechaValida, doc.horaValida);
                
                if (doc.fecha === armaFecha && doc.hora === armaHora){
                    console.log("Entro al then dal Map de estado, ya existe la reserva");
                    existeReserva = true;
                    console.log("existeReserva1: ", existeReserva);
                    setCorrecta(false);
                    setError(false);
                    setInvalida(true);
                    setDatos(false);
                    setFecha(""); 
                    console.log(fecha);
                    console.log("Salgo del map de estado, ya existe la reserva");
                }
                return existeReserva;
            })

            console.log(invalida);
            console.log("existeReserva2: ", existeReserva);
            if(existeReserva === false){
                console.log("No existe la reserva");
            
                if (armaFecha !== "" && armaHora !=="" && numero !==""&& nombre !=="" && apPaterno !=="" && apMaterno !=="" && telefono !=="" && correo !=="" )
                {
                    console.log("Se manda a GrabaReservacion, no existe reserva"); 
                    let resultado = GrabaReservacion(armaFecha, armaHora, numero, nombre, apPaterno, apMaterno, telefono, correo);
                    if( resultado )
                    { 
                        setCorrecta(true);
                        setError(false);
                        setInvalida(false);
                        setDatos(false);
                        setFecha("");
                        console.log(fecha);
                        console.log("Regreso de GrabaReservacion correcta, no existe reserva");
                    }
                    else
                    { 
                        setError(true); 
                        console.log("Regreso de GrabaReservacion incorrecta, no existe reserva");
                    }
                }
            }
        }
    }

    const letraAzul = { color: 'blue' }

    return(
        <Fragment>
            <div className="cuerpo">
                <h2 className='h2Reserva'>Reservaciones</h2>
                <form className="forma">   
                    <div className="captura">                  
                        <label className="etiquetas">* Fecha y Hora </label>
                        <input id="fecha" className="campos" type="datetime-local" value={fecha} autoComplete="off" onChange={ e => setFecha(e.target.value) }/>
                    </div>
                    <br/>
                    <div className="captura">
                        <label className="etiquetas">* Número de personas </label> 
                        <input className="campos" type="number" name="numero" value={numero} autoComplete="off" onChange={ handleInputChange }/>
                    </div>
                    <br/>
                    <div className="captura">
                        <label className="etiquetas">* Nombre </label> 
                        <input className="campos" type="text" name="nombre" value={nombre} autoComplete="off" onChange={ handleInputChange }/>
                    </div>
                    <br/>
                    <div className="captura">
                        <label className="etiquetas">* Apellido Paterno </label>
                        <input className="campos" type="text" name="apPaterno" value={apPaterno} autoComplete="off" onChange={ handleInputChange }/>
                    </div>
                    <br/>
                    <div className="captura">
                        <label className="etiquetas">* Apellido Materno </label>
                        <input className="campos" type="text" name="apMaterno" value={apMaterno} autoComplete="off" onChange={ handleInputChange }/>
                    </div>
                    <br/>
                    <div className="captura">
                        <label className="etiquetas">* Teléfono </label>
                        <input className="campos" type="number" name="telefono" value={telefono} autoComplete="off" onChange={ handleInputChange }/>
                    </div>
                    <br/>
                    <div className="captura">
                        <label className="etiquetas">* Correo </label>
                        <input className="campos" type="email" name="correo" value={correo} autoComplete="off" onChange={ handleInputChange }/>
                    </div>
                    <br/>
                    <div className="botones">
                        <div>
                            <button className="botonEnviar" type="button" onClick={ ValidaFormulario }>Enviar</button>
                        </div>
                        <div>
                            <Link to ="/" className="linkRegresar">Regresar</Link>
                        </div>
                    </div>
                </form>
                <div className="mensaje">
                    {( error ) ? <p className="mensaje">Error al grabar una reservación</p> : <p> </p>}

                    {( datos ) ? <p className="mensaje">* Todos los campos son de captura obligatoria</p> : <p> </p>}

                    {( correcta ) ? <p style={letraAzul} className="mensaje">Su reservación está confirmada para el día <u>{ fechaValida }</u> a las <u>{ horaValida }</u> a nombre de <u>{ nombre } { apPaterno } { apMaterno }</u></p> : <p> </p>}

                    {( invalida ) ? <p className="mensaje">Ya existe una reservación para el día <u>{ fechaValida }</u> a las <u>{ horaValida }</u> por favor elija otra</p> : <p> </p>}
                    </div>
            </div>
        </Fragment>
    )
}

function GrabaReservacion(fecha, hora, numero, nombre, apPaterno, apMaterno, telefono, correo){
    console.log("Entré a grabar la reservación");
    console.log(fecha, hora, numero, nombre, apPaterno, apMaterno, telefono, correo);
    const mesa = "X";
    try{
        addDoc(collection(db, 'reservaciones'), { fecha, hora, numero, nombre, apPaterno, apMaterno, telefono, correo, mesa });
        console.log("Salí de grabar la reservación, true");
        return true;
    }
    catch{
        console.log("Salí de grabar la reservación, false");
        return false;
    }
}

export default Reservaciones;
