import authContext from "@/context/auth/authContext";
import React, { useContext } from "react";
import appContext from '@/context/app/appContext';

const Alerta = () => {
    // Extraer mensaje de error para usuarios
    const AuthContext = useContext(authContext)
    const {mensaje} = AuthContext

      // Extraer el mensaje de error de archios
  const AppContext = useContext(appContext)
  const {mensaje_archivo} = AppContext ;
    return ( 
        <div className="bg-red-500 py-2 px-3 w-full my-3 max-w-lg text-white mx-auto">
            {mensaje || mensaje_archivo}  
        </div>

     );
}
 
export default Alerta;