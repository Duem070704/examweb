//configura el express
const express = require('express');
const bodyParser = require('body-parser')
const app = express()

 // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

require('dotenv').config()

const port = process.env.PORT || 3000;

const mongoose = require('mongoose');
const user= "duilio_ortega"
const password= "9bQ5rMSGtGjuMtMu"
const dbname= "Carretón"  

//conexion  a base de datos
 const  uri = `mongodb+srv://${user}:${password}@atlascluster.hqxn42v.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(uri) 
  .then(()=> console.log('Base de Datos conectada')) 
  .catch(e => console.log('error de conexión', e))
 
//configuramos los motores de plantilla
app.set('view engine','ejs');
//configuramos la carpeta  vistas 
app.set('views', __dirname +"/views");
 
// configurar de la carpeta estatica (public)
app.use(express.static(__dirname +"/public"));

//rutas     
app.use('/',require('./router/rutas'));
app.use('/Productos',require('./router/Productos'));

app.use((req,res,next)=>{
    res.status(404).render("404",{
        titulo: "404",
        descripcion: "Carreton ULV"
    })
})

// para configurra el puerto
app.listen(port, () => {
  console.log('Servidor a su servicio en el puerto',port)
});