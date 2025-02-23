const { validationResult } = require('express-validator')
const Usuario = require('../models/Usuario')
const bcrypt = require('bcrypt')
exports.nuevoUsuario = async(req, res) => {

    // Mostrar mensaje de errror de express validaror 
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    //Verificar si el usuario ya estuvo registrado
    const {email, password} = req.body;

    let usuario = await Usuario.findOne({email});

    if(usuario){
            return res.status(400).json({msg: 'El usuario ya esta registrado'}); 
    }

    // Crear un nuevo usuario 
    usuario = new Usuario(req.body)
    // Hachear el passwird 
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);
    try {
        await usuario.save()
    
        res.json({msg : 'Usuario Creado Correctamente'})
    } catch (error) {
        console.log(error)
    }
   

}