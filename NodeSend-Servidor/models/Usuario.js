const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
    email : {
        type: String,
        required: true, 
        unique: true,
        lowercase:true, //pasa a mayuscula
        trim: true  //elimina los espacios 

    },
    nombre: {
        type: String,
        required:true,
        trim: true
    },
    password:{
        type :String, 
        required: true,
        trim:true
    }

})

module.exports = mongoose.model('Usuarios', usuariosSchema);