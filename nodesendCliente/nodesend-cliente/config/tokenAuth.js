import clienteAxios from "./axios";

const tokenAuth = token => {
    if(token) {
        clienteAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }else{
        // porque alguien elimino del localstorage
        delete clienteAxios.defaults.headers.common['Authorization']
    }
}
export default tokenAuth