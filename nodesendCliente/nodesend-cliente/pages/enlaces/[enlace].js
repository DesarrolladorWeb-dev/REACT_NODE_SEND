import Layout from "@/components/Layout";
import clienteAxios from "@/config/axios";
import React, {useState, useContext} from 'react'
import appContext from '@/context/app/appContext';
import Alerta from '@/components/Alerta';



// Va a ser la respuesta que vamos a obtener al visitar un lugar - sirve archivos staticos
export async function getServerSideProps({params}){ // todo props es el mismo enlace que ponemos arriba - ayuda a leer los enlaces
    const {enlace} = params
    console.log(` desde losp orps ${enlace}`)
    
    const resultado = await clienteAxios.get(`/api/enlaces/${enlace}`)
    // console.log(resultado) // se ejecuta en consola 
    return {
        props: {
            enlace: resultado.data
        }
    }
}
// para saber que paginas se van a crear se utiliza esto - al final queda en el servidor
// primero necesitamos crear un listado de URLs - lo obtiene del servidor
export async function getServerSidePaths(){
    // aqui buscamos de donde va a encontrar las diferentes rutas "validas"
    const enlaces = await clienteAxios.get('/api/enlaces');
    // SE EJECUTA EN LA CONSOLA CUANDO INICIAS  - nota solo el getServerSidePaths se usa para una lista de URLs
    // console.log(enlaces.data)
    return{
        paths: enlaces.data.enlaces.map(enlace => ({
            params : {enlace: enlace.url }
        }) ),
        // para que solamente sea url validas
        fallback: false
            
    }
    
    
}


export default ({enlace})=> {

    // Context de la app
    const AppContext = useContext(appContext);
    const {mostrarAlerta , mensaje_archivo} = AppContext
    const [valorArchivo, guardarArchivo] = useState(enlace.archivo)

    const [tienePassword , setTienePassword] = useState(enlace.password)
    const [password , setPassword] = useState('')
    console.log(tienePassword) //true se vera si tiene password y undefined si no la tiene
    // console.log(enlace) //nos mostrara el enlace
    const verificarPassword = async e => {
        e.preventDefault()

        const data = {
            password
        }
        console.log(` verificar${enlace.password}`)
        try {
            const resultado = await clienteAxios.post(`/api/enlaces/${enlace.enlace}`, data);
            // TODO aqui enlace pasa a null
            console.log(resultado)
            guardarArchivo(resultado.data.archivo)
            // el password esta en false porque se puso bien el password o no habia password - mirar en el enlaceController - obtener password
            setTienePassword(resultado.data.password); //ahora con esto si me aparece para poder descargar el archivo 
        } catch (error) {
            console.log(error)
            mostrarAlerta(error.response.data.msg)
        }
        
    }
    
    // guardarArchivo(enlace.archivo)
    console.log(`nombre del archivo ${valorArchivo}`)
    return (
        <Layout>
            {
                tienePassword ? (
                    <>
                    <p className="text-center">Este enlace esta protegido por un pasword colocalo a continuacion</p>
                    {mensaje_archivo && <Alerta/>}
                    <div className='flex justify-center mt-5 '>
                    <div className='w-full max-w-lg'>
                    <form
                    onSubmit={e => verificarPassword(e)}
                        className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'>
                            <div className='mb-4'>
                                <label 
                                    htmlFor='password'
                                    className='block text-black text-sm font-bold mb-2'>Password</label>
                                <input 
                                    type="password"
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-stone-900'
                                    id='password'
                                    placeholder='Password del enlace'
                                    value={password}
                                    onChange={e =>setPassword(e.target.value) }
                                    />
                            <input 
                                type="submit"
                                className='bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold'
                                value="Validar Password ..."
                                />
                            </div>
                    </form>
                        
                    </div>
                    </div>
                    </>
                ): (
                    <>
                     <h1 className="text-4xl text-center  text-gray-700">Descarga tu archivo:</h1>
                    <div className="flex items-center justify-center mt-10">
                        <a 
                        href={`${process.env.backendURL}/api/archivos/${valorArchivo}`}
                        className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
                        download
                        >Aqui</a>
                        
                    </div>
                    </>
                )
            }
           
        </Layout>
    )
}