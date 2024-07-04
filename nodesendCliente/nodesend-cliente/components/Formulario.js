 import appContext from '@/context/app/appContext';
import React, {useState, useContext} from 'react'


 const Formulario = () => {
    
    // Context de la app
    const AppContext = useContext(appContext);
    const {agregarPassword, agregarDescargas} = AppContext


    const [tienePassword ,setTienePassword ] = useState(false)

    return ( 
        <div className='w-full mt-20 '>
            <div >
                 <label className='text-lg text-gray-800'>Eliminar tras : </label>
                    <select 
                    onChange={e => agregarDescargas(parseInt(e.target.value))}
                    className='appearance-none w-full mt-2 bg-white boder border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500'
                    >
                        <option value="" selected disabled> Selecciona</option>
                        <option value="1">1 Descarga</option>
                        <option value="5">5 Descargas</option>
                        <option value="10">10 Descargas</option>
                        <option value="20">20 Descargas</option>
                    </select>
            </div>
            <div className='mt-4'>
                <div className='flex justify-between items-center' >
                     <label className='text-lg text-gray-800 mr-2'>Proteger con Contraseña</label>
                     <input 
                    //  !tienePassword - significa lo contrario a lo que tienePassword - osea si esta false pasa a true
                     onChange={ () => setTienePassword(!tienePassword)}
                     type="checkbox" 
                     />
                  
                </div>
                {tienePassword ? (
                     <input 
                     className='appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500'
                     onChange={e => agregarPassword(e.target.value)}
                    type="password" />
              
                ) : null }
           
            </div>
           
        </div>

     );
 }
  
 export default Formulario;