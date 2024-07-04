
const jwt = require('jsonwebtoken')
require('dotenv').config({path :'variables.env'})

module.exports = (req, res, next ) => {
    const authHeader = req.get('Authorization')
    // console.log('dasd', authHeader)
    // const token = authHeader.split(' ')[1];
    if(authHeader){
        //Obtener el Token 
        const token = authHeader.split(' ')[1];

        // coprobar el JWT 
        try {
            const usuario = jwt.verify(token,process.env.SECRETA )
            // console.log(usuario)
            req.usuario = usuario; //lo guardamos en el req el valor usuario


            // res.json({usuario})
        } catch (error) {
            console.log(error)
            console.log('JWT no valido')
            
        }

    }
    console.log('No hay Header ... ')

    return next();
}