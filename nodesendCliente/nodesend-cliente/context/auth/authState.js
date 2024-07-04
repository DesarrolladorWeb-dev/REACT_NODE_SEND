"use client"; // top to the file

import React, {useReducer} from 'react'
import authContext from './authContext'
import authReducer from './authReducer';
import {
    CERRAR_SESION,
    USUARIO_AUTENTICADO,
    LOGIN_ERROR,
    LOGIN_EXITOSO,
    OCULTA_ALERTA,
    REGISTRO_EXITOSO, 
    REGISTRO_ERROR} from '../../types/';
import clienteAxios from '@/config/axios';
import tokenAuth from '@/config/tokenAuth';

const AuthState = ({children}) => {
// Definir un state inicial
const initialState = {
    token: typeof window !== 'undefined' ?  localStorage.getItem('token') : '',
    autenticado: null,
    usuario: null,
    mensaje: null
}
// Definir el reducer
const [state, dispatch] = useReducer(authReducer, initialState);

// Registrar nuevos Usuarios
const registrarUsuario = async datos => {
   
    try {
        const respuesta = await clienteAxios.post('/api/usuarios', datos)
        dispatch({
            type: REGISTRO_EXITOSO,
            payload: respuesta.data.msg
        })
       
    } catch (error) {
        console.log(error.response.data.msg)
        dispatch({
            type: REGISTRO_ERROR,
            payload:error.response.data.msg
        })
        
    }
     // Limpiar la alerta despues de 3 segundos
     setTimeout(() => {
        dispatch({
            type: OCULTA_ALERTA
        })
    }, 3000);
}

// Autenticar Usuarios
const iniciarSesion = async datos =>  {
    console.log(datos)
    try {
        const respuesta = await clienteAxios.post('/api/auth', datos)
        dispatch({
            type:LOGIN_EXITOSO,
            payload: respuesta.data.token
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type:LOGIN_ERROR,
            payload: error.response.data.msg
        })
        
        
    }
    setTimeout(() => {
        dispatch({
            type: OCULTA_ALERTA
        })
    }, 3000);
}

// Retorne el usuario autenticado en base al JWT
const usuarioAutenticado = async () => {
    // obtener el token
    const token = localStorage.getItem('token');
    if(token){
        tokenAuth(token)
    }
    try {
        const respuesta = await clienteAxios.get('/api/auth');
        if(respuesta.data.usuario){
        
        dispatch({
            type:USUARIO_AUTENTICADO,
            payload: respuesta.data.usuario
        })
        }
       
    } catch (error) {
        
        dispatch({
            type:LOGIN_ERROR,
            payload: error.response.data.msg
        })
    }
}
// Cerrar la sesion
const cerrarSesion = () => {
    dispatch({
        type: CERRAR_SESION
    })
}


    return(
        <authContext.Provider
            value={{
                token : state.token,
                autenticado : state.autenticado,
                usuario: state.usuario,
                mensaje: state. mensaje,
                usuarioAutenticado,
                registrarUsuario,
                iniciarSesion,
                cerrarSesion,
            }}
        >
            {children}
        </authContext.Provider>
    )
}
export default AuthState