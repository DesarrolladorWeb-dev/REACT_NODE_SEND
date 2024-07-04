const Enlaces = require('../models/Enlace')
const shortid = require('shortid')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')


exports.nuevoEnlace = async (req ,res , next) => {

    // Revisar si hay errores
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    // console.log(req.body) //para saber que estamos enviando
    // Crear un objeto de Enlace
    const {nombre_original, nombre} = req.body
    const enlace = new Enlaces();
    enlace.url = shortid.generate(); 
    enlace.nombre = nombre;
    enlace.nombre_original = nombre_original;
    
    // Si el usuario esta autenticado 
    if(req.usuario){
        const {password, descargas} = req.body
        // Asignar a enlace el numero de descargas
        if(descargas){
            enlace.descargas = descargas;
        }
        if(password){
            const salt = await bcrypt.genSalt(10)
            enlace.password = await bcrypt.hash(password, salt);
        }
        enlace.autor = req.usuario.id //sabremos que usuario lo creo
    }


    // Almacenar en la BD
    try {
        await enlace.save()
        // para que pueda compartir el url
        return res.json({msg : `${enlace.url}`})
        next()
    } catch (error) {
        console.log(error)
    }
}

// Obtiene un listado de todos los enlaces 
exports.todosEnlaces = async (req, res) => {
    try {
        const enlaces = await Enlaces.find({}, 'url -_id');
        res.json({enlaces})
    } catch (error) {
        console.log(error)
    }
}

// Retorna si el enlace tiene password o no 
exports.tienePassword = async (req, res, next) => {
    //   Validamos el enlace
    const {url} = req.params

    console.log(url)
    // Verficar si existe el enlace
    const enlace = await Enlaces.findOne({url})
    if(!enlace){
        res.status(404).json({msg : 'Era Enlace no existe'})
        return next()
    }
    if(enlace.password){
        return res.json({password: true , enlace: enlace.url})
    }
    next()


}
// Verifica si el passwird es Correcto
exports.verificarPassword = async (req , res , next) => {
    console.log(req.params) //nos dara la URL
    console.log(req.body); // nos dara el PASSWORD
    const {url} = req.params;
    const enlace = await Enlaces.findOne({url});

    // Verificar el password 
    const {password} = req.body;
    if(bcrypt.compareSync(password , enlace.password)){
        //Permitirle descargar el archivo
        next()
    
    }else{
        return res.status(401).json({msg: 'Password Incorrecto'})
    }



}




// Obtener el enlace 
exports.obtenerEnlace = async (req , res , next ) => {

    // console.log(req.params.url)
    const {url} = req.params

    console.log(url)
    // Verficar si existe el enlace
    const enlace = await Enlaces.findOne({url})
    if(!enlace){
        res.status(404).json({msg : 'Era Enlace no existe'})
        return next()
    }

    // Si el enlace existe 
    // crear vista ->  res.send 
    // descargar -> res.download (agrega el Content disposition por mi )
    // Todo el password esta en false porque se puso bien el password o no habia password
    res.json({archivo : enlace.nombre , password:false})

    // TODO lo agrege 
    next();

}