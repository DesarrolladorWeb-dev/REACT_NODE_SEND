"use client"; // top to the file
import React, {useContext, useEffect} from 'react'
import authContext from '@/context/auth/authContext';
import appContext from '@/context/app/appContext';
import { useRouter } from 'next/router';

import Link from 'next/link'


const Header = () => {

    //router 
    const router = useRouter();

    // Extraer el usuario autenticado del Storage 
    const AuthContext = useContext(authContext)
    const {usuario ,usuarioAutenticado, cerrarSesion} = AuthContext ;

    // Context de la aplicacion 
    const AppContext = useContext(appContext)
    const {limpiarState} = AppContext ;
    

    useEffect(()=>{
    usuarioAutenticado()
    },[]) 

    const redireccionar = () => {
        router.push('/')
        limpiarState()
    }

    return ( 
        <header className='py-8 flex flex-col md:flex-row items-center justify-between '>
            
                <img 
                    onClick={() => redireccionar()}
                className='w-64 mb-8 md:mb-0 cursor-pointer' src="/logo.svg" alt="logo"/>
           
           
            <div className='flex' >
                {usuario ? (
                    <div className='flex items-center'>
                     <p className='mr-2'>Hola {usuario.nombre}</p>
                    <button
                    className=' mx-2 bg-black px-5 py-3 rounded-lg text-white font-bold uppercase' 
                    type="button"
                    onClick={()=> cerrarSesion()}
                    > Cerrar Sesion</button>
                    </div>
                   
                ):(
                    <>
                        <Link href="/login">
                        <p className='mx-2 bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase'>Iniciar Sesion</p>
                        </Link>
                        <Link href="/crearcuenta">
                            <p className=' mx-2 bg-black px-5 py-3 rounded-lg text-white font-bold uppercase'>Crear Cuenta</p>
                        </Link>
                    </>
                )}
               
            </div>
        </header>
     );
}
 
export default Header;