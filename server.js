require('dotenv').config() //Uso de archivo .env (Variables de entorno)
const express = require('express')
const cors = require('cors') //CORS para permitir acceso externo
const app = express()
const mongoose = require('mongoose')
app.use('/static', express.static(__dirname + '/files')) //Static para la carga de imagenes
app.use(cors());
//Conexion a la base de datos
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error',(error) => console.log(error))
db.once('open',()=> console.log('Conectado a la base de datos'))

app.use(express.json())
//Rutas del API
const beyRouter = require('./routes/beyblade')
app.use('/beyblades', beyRouter)
//Puerto utilizado por el server
app.listen(3000, ()=>console.log("Server Start"))