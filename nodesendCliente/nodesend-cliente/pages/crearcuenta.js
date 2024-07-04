"use client"; // top to the file
import React, {useContext, useEffect} from 'react';
import * as Yup from 'yup'
import Layout from "@/components/Layout";


import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';

import authContext from '@/context/auth/authContext';
import Alerta from '@/components/Alerta';

function CrearCuenta() {

    // Acceder al state 
    const AuthContext = useContext(authContext)
    const {registrarUsuario , mensaje } = AuthContext


// Formulario y validacion con fornik y yup
const formik = useFormik({
    initialValues:{
        nombre:'',
        email: '',
        password:''
    },
    // antes de ejecutar el submit ejecutarta la validacion usando YUP
    validationSchema: Yup.object({
        nombre: Yup.string()
                    .required('El Nombre es obligatorio'),
        email: Yup.string()
                    .email('El email no es valido')
                    .required('El Email es obligatorio'),
        password: Yup.string()
                    .required('no puede ir vacio')
                    .min(6, 'El password debe contener al menos 6 caracteres')
    }),
    onSubmit:(valores) => {
        registrarUsuario(valores)
    }
})

  return (
    <Layout>
    <div className='md:w-4/5 xl:w-3/5 mx-auto rb-32' >
        <h2 className='text-4xl font-sans font-bold text-gray-800 text-center my-4'>Crear Cuenta</h2>
        {mensaje && <Alerta/> }
        <div className='flex justify-center mt-5 '>
            <div className='w-full max-w-lg'>

                        <form
                            onSubmit={formik.handleSubmit}
                            className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'>
                            
                            <div className='mb-4'>
                                <label 
                                    htmlFor='nombre'
                                    className='block text-black text-sm font-bold mb-2'>Nombre</label>
                                <input 
                                    type="text"
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-stone-900'
                                    id='nombre'
                                    placeholder='nombre de usuario'
                                    value={formik.values.nombre}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} //cuando le de click al input y luego me salgo 
                                    />
                                    {/* es para eso el touch.nombre */}
                                    {formik.touched.nombre && formik.errors.nombre ? (
                                        <div className='my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4'>
                                            <p className='font-bold'>Error</p>
                                            <p>{formik.errors.nombre}</p>
                                        </div>
                                    ): null}
                            </div>
                            <div className='mb-4'>
                                <label 
                                    htmlFor='email'
                                    className='block text-black text-sm font-bold mb-2'>Email</label>
                                <input 
                                    type="email"
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-stone-900'
                                    id='email'
                                    placeholder='email de usuario'
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    />
                                     {formik.touched.email && formik.errors.email ? (
                                        <div className='my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4'>
                                            <p className='font-bold'>Error</p>
                                            <p>{formik.errors.email}</p>
                                        </div>
                                    ): null}
                            </div>
                            <div className='mb-4'>
                                <label 
                                    htmlFor='password'
                                    className='block text-black text-sm font-bold mb-2'>Password</label>
                                <input 
                                    type="password"
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-stone-900'
                                    id='password'
                                    placeholder='password de usuario'
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.password && formik.errors.password ? (
                                        <div className='my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4'>
                                            <p className='font-bold'>Error</p>
                                            <p>{formik.errors.password}</p>
                                        </div>
                                    ): null}
                            </div>
                            <input 
                                type="submit"
                                className='bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold'
                                value="Crear Cuenta"
                                />
                        </form>

                
            </div>
        </div>
    </div>
    </Layout>
  )
 
}

export default CrearCuenta