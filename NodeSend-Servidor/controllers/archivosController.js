
const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs')
const Enlaces = require('../models/Enlace')


exports.subirArchivo = async (req, res , next) => {

    const  configuracionMuller = {
        // el tamaño del archivo 1mb , si menoramos el limite tendra un error
        limits : {fileSize :req.usuario ? 1024 * 1024 * 10 : 1000000 },
        // donde se va a guardar los archivos 
        storage : fileStorage = multer.diskStorage({
            destination : (req , file , cb) => {
                cb(null , __dirname + '/../uploads')
            },
            
            filename :  (req , file , cb) => {
                // usamos la instancia del archivo que estamos subiendo 
                // const extension = file.mimetype.split('/')[1];
                //todo esto es para los archivos que tengan muchos puntos , solo obtendra el ultimo
                const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length)
                // el callback - acortaremos el nombre 
                cb(null, `${shortid.generate()}${extension}`);
            },
            // tambien podremos limites de archivos 
            // fileFilter : (req , file, cb) => {
            // no aceptamos pdf
            //     if(file.mimetype === "application/pdf"){ 
            //         return cb(null, true)
            //     }
            // }
        })
    }
    // de esta forma ya se va a almacenar 
    const upload = multer(configuracionMuller).single('archivo')

    upload(req , res , async (error)=> {
        // si queremos leer files - form data
        console.log(req.file)  
        // si no hay ningun error
        if(!error) {
            res.json({archivo : req.file.filename}) // le retornaremos
        }else{
            console.log(error)
            return next()
        }
    })


}
exports.eliminarArchivo = async(req, res) => {

    console.log('desde aqui ' , req.archivo)
    try {
        // eliminar un archivo del sistema , unlickSyn es la eliminacio sincrona
        fs.unlinkSync(__dirname + `/../uploads/${req.archivo}`)
        console.log('Archivo Eliminado')
        
    } catch (error) {
        console.log(error)
    }
}
 
// Descarga un archivo
exports.descargar = async (req, res, next) =>{

    // Obtener el enlace
    const {archivo} = req.params;
    console.log(`el archivo a buscar ${archivo}`)

    const enlace = await Enlaces.findOne({ nombre: archivo})
    console.log(`mensaje de enlace ${enlace}`)
    const archivoDescarga = __dirname + '/../uploads/' + archivo
    res.download(archivoDescarga)

    // Eliminar el archivo y la entrada de la base de la datos
       // Si las descargas son iguales a 1  - Borrar la entrada y borrar el archivo
    const {descargas , nombre } = enlace; 
    if(descargas === 1 ){
    // console.log('Si solo 1 ')
    // Eliminar el archivo
    req.archivo = nombre; //inserta al req el nombre del archivo

    // eliminar la entrada de la bd
    await Enlaces.findOneAndDelete(descargas.id)

    next()


    }else {
    // todo : accedo al enlace y descargo y entonces tiene que restarse 1 porque ya se uso , y si mas lo usan tambien se restara
    // si las descargas son > a 1  - Restar 1
    enlace.descargas--;
    await enlace.save();
    }
}