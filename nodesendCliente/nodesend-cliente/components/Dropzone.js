import React,{ useCallback, useContext} from 'react'
import {useDropzone} from 'react-dropzone'
import clienteAxios from '@/config/axios'
import appContext from '@/context/app/appContext'
import authContext from '@/context/auth/authContext'
import Formulario from './Formulario'


const Dropzone = () => {

    // Context de la app
    const AppContext = useContext(appContext);
    const {cargando ,mostrarAlerta, subirArchivos, crearEnlace } = AppContext

    // Context del authenticacion
    const AuthContext = useContext(authContext);
    const {usuario , autenticado} = AuthContext

    const onDropRejected = () => {
        mostrarAlerta('No se pudo subir, el limite es 1MB, obten una cuenta  para subir archivos mas grandes')
    }

    // todos los archivos que soltamos lo veremos aqui
    // el  useCallback se usa si se quiere procesar muchos eventos para que no exista errores
    // como utiliza multiples rendering que se ejecuta una vez y otra vez usaremos useCollback
    const onDropAccepted = useCallback( async (acceptedFiles) => {
        // console.log(acceptedFiles)
        // pasamos los datos al FormData
        // crear un Formdate - y subirremos un archivo
        const formData = new FormData();
        formData.append('archivo', acceptedFiles[0])

        // para obtener el nombre original
        // console.log(acceptedFiles[0].path)

        subirArchivos(formData , acceptedFiles[0].path);


    }, [])

    // accepdFile - los archivos que ya se van suviendo
    // isDragActive - que pasara cuando mantenemos el archivo en arrastrar
    // extraer contenido de Dropzpne
    // solucion para el limite de pezo ,
    // onDrop- se ejecuta siempre todo los archivos ya sea que pase o no pase siertas validaciones
    // onDropAccepted - si colocas reglas en reject debe pasar las reglas para subir  - y si no cumple caera en onDropRejected
    // ononDropRejected - caeran los archivos que han sido rechazados bajo algunas reglas 
    // la regla maxSize useDropozone lo tiene todo
    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({onDropAccepted, onDropRejected, maxSize: 1000000})
    const archivos = acceptedFiles.map(archivo => (
        <li key={archivo.lastModified}  className='bg-white flex-1 p-3 mb-4 shadow-lg rounded '>
           <p className='font-bold text-xl'> {archivo.path}</p>
           <p className='text-sm text-gray-500'>{(archivo.size / Math.pow(1024,2)).toFixed(2)}MB</p>
        </li>
    ) )



    return (
            <div className='md:flex-1 mb-3 mx-2 mt-16 lg-mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4'>
                {
                    acceptedFiles.length > 0  ? (
                        <div className='mt-10 w-full'>
                            <h4 className='text-2xl font-bold text-center mb-4'>archivos</h4>
                             <ul>
                            {archivos}
                            </ul> 

                            {
                                autenticado ? <Formulario/>: ""
                            }

                            {cargando ? <p className='my-10 text-center text-gray-600'>Subiendo Archivo ...</p> : (
                                <button
                                    type="button"
                                    className='bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800'
                                    onClick={() => crearEnlace()}
                                    >
                                    Crear Enlace

                                </button>
                            )}
                           
                        </div>
                       
                    ): (
                <div { ...getRootProps({className:'dropzone w-full py-32'})}>
                    <input className='h-100 '{...getInputProps()}/>
                 

                        {
                            isDragActive ? <p className='text-2xl text-center text-gray-600'>
                                Suelta el archivo
                            </p> :   
                            <div className='text-center'>
                            <p className='text-2xl text-center text-gray-600'>Selecciona un archivo y arrastralo aqui</p>
                            <button className='bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800  ' type="button">
                                Selecciona archivos para subir
                            </button>  
                            </div>
                        }
                        
                  
                </div>
                    )
                }
               

               
    </div> 
);
}
 
export default Dropzone;

