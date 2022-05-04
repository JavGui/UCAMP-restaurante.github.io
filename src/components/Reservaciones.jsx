import db from './firebase';
import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
        const coleccion = collection(db, 'reservaciones');
        const documentosSnapshot = await getDocs(coleccion);
        const contenido = documentosSnapshot.docs.map((doc) => doc.data());
        setEstado(contenido);
    }

    // ********** VALIDA FORMULARIO **********

    async function ValidaFormulario() 
    {
        if (fecha === "" || numero ==="" || nombre ==="" || apPaterno ==="" || apMaterno ==="" || telefono ==="" || correo ==="" )
        {
            setCorrecta(false);
            setError(false);
            setInvalida(false);
            setDatos(true);
            return;
        }           
       
        let dia = fecha.substr(8, 2);  // tolocaldatetime.string
        let mes = fecha.substr(5, 2);
        let año = fecha.substr(0, 4);

        let armaFecha = (`${dia}/${mes}/${año}`);
        let armaHora = fecha.substr(11, 5);;

        setFechaValida(armaFecha);
        setHoraValida(armaHora);


        if( !estado || estado.length === null || estado.length === 0)
        { 
            if (armaFecha !== "" && armaHora !== "" && numero !=="" && nombre !=="" && apPaterno !=="" && apMaterno !=="" && telefono !=="" && correo !=="" ){
                let resultado = GrabaReservacion(armaFecha, armaHora, numero, nombre, apPaterno, apMaterno, telefono, correo);
                if( resultado )
                    { 
                        setCorrecta(true);
                        setError(false);
                        setInvalida(false);
                        setDatos(false);
                        setFecha("");
                    }
                    else
                    { 
                        setCorrecta(false);
                        setError(true);
                        setInvalida(false);
                        setDatos(false);
                        setFecha(""); 
                    }
            }

            return;
        } 
        else
        {    
            let existeReserva = false;
                  
            await estado.map((doc) => 
            {            
                if (doc.fecha === armaFecha && doc.hora === armaHora){
                    existeReserva = true;
                    setCorrecta(false);
                    setError(false);
                    setInvalida(true);
                    setDatos(false);
                    setFecha(""); 
                }
                return existeReserva;
            })

            if(existeReserva === false){
                if (armaFecha !== "" && armaHora !=="" && numero !==""&& nombre !=="" && apPaterno !=="" && apMaterno !=="" && telefono !=="" && correo !=="" )
                {
                    let resultado = GrabaReservacion(armaFecha, armaHora, numero, nombre, apPaterno, apMaterno, telefono, correo);
                    if( resultado )
                    { 
                        setCorrecta(true);
                        setError(false);
                        setInvalida(false);
                        setDatos(false);
                        setFecha("");
                    }
                    else
                    { 
                        setError(true); 
                    }
                }
            }
        }
    }

    const letraAzul = { color: 'blue' }

    return(
        <Fragment>
            <div className="cuerpo">
                {/* <h2>Reservaciones</h2> */}
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
    const mesa = "X";
    try{
        addDoc(collection(db, 'reservaciones'), { fecha, hora, numero, nombre, apPaterno, apMaterno, telefono, correo, mesa });
        return true;
    }
    catch{
        return false;
    }
}

export default Reservaciones;