import React, {useReducer} from 'react'
import appContext from './appContext'
import appReducer from './appReducer'
import clienteAxios from '@/config/axios'
import{
    MOSTRAR_ALERTA,
    OCULTA_ALERTA,
    SUBIR_ARCHIVO_ERROR,
    SUBIR_ARCHIVO_EXITO,
    CREAR_ENLACE_EXITO,
    CREAR_ENLACE_ERROR,
    SUBIR_ARCHIVO,
    LIMPIAR_STATE,
    AGREGAR_PASSWORD,
    AGREGAR_DESCARGAS
    
}from '../../types'

const AppState = ({children}) => {

    const initialState = {
        mensaje_archivo: '',
        nombre: '',
        nombre_original: '',
        cargando: null,
        descargas : 1,
        password: '',
        autor: null,
        url:'',
    }
    // Crear dispatch y state 
    const [state, dispatch] = useReducer(appReducer, initialState)

    // Muestra  una alerta 
    const mostrarAlerta = msg => {
        console.log(msg)
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: msg
        })
        setTimeout(() => {
            dispatch({
                type : OCULTA_ALERTA
            })
        }, 3000);
    }
    // SUba los archivos  al servidor 
    const subirArchivos = async (formData, nombreArchivo) => {

        dispatch({
            type: SUBIR_ARCHIVO
        })

        try {
            const resultado = await clienteAxios.post('/api/archivos', formData)
            console.log(resultado.data)

            dispatch({
            type: SUBIR_ARCHIVO_EXITO,
            payload :  {
                nombre : resultado.data.archivo,
                nombre_original : nombreArchivo
            }
            })
        } catch (error) {
            // console.log(error)
            dispatch({
                type: SUBIR_ARCHIVO_ERROR,
                payload: error.response.data.msg
            })

        }
      
    }

    const crearEnlace = async () => {
        const data = {
            nombre: state.nombre,
            nombre_original : state.nombre_original,
            descargas: state.descargas,
            password: state.password,
            autor: state.autor
        }
        try {
            const resultado = await clienteAxios.post('/api/enlaces', data);
            dispatch({
                type: CREAR_ENLACE_EXITO,
                payload: resultado.data.msg
            })
        } catch (error) {
            cconsole.log(error)
        }
    }

    const limpiarState = () => {
        dispatch({
            type: LIMPIAR_STATE
        })
    }

    // Agregar el password 
    const agregarPassword = password => {
        dispatch({
            type: AGREGAR_PASSWORD,
            payload : password
        })
    }

    // agregar un numero de descargas 
    const agregarDescargas = descargas => {
        dispatch({
            type: AGREGAR_DESCARGAS,
            payload: descargas
        })

    }

    return (
        <appContext.Provider
            value={{
                mensaje_archivo : state.mensaje_archivo,
                nombre : state.nombre,
                nombre_original : state.nombre_original,
                cargando: state.cargando,
                descargas : state.descargas,
                password: state.password,
                autor: state.autor,
                url: state.url,
                mostrarAlerta,
                subirArchivos,
                crearEnlace,
                limpiarState,
                agregarPassword,
                agregarDescargas,
            }}
        >
            {children}
        </appContext.Provider>
    )
}
export default AppState