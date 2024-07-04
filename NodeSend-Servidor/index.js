const express = require('express');
const conectarDB = require('./config/db')
const cors = require('cors')


// crear el servidor 
const app = express()




// conectar a la base de datos
conectarDB()

// Puerto de la app
const port = process.env.PORT || 4000;

// habilitar cors
const opcionesCors = {
    origin:process.env.FRONTEND_URL
}
app.use(cors(opcionesCors))

// Habilidat leer los valores de un body
app.use(express.json()) //para que se muestren en consola  al enviar los send en el postman 

// Havbilitar carpeta publica - y aqui estaran todos nuestros archivos staticos
// localhost/7SmkORky1.jpg   --> si me mostrara la imagen
app.use(express.static('uploads'))

// Ruta de la app
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/enlaces', require('./routes/enlaces'))
app.use('/api/archivos', require('./routes/archivos'))

// arrancar la app
app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor esta funcionand oen el puerto ${port}`)
})