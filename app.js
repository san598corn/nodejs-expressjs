const express = require("express"); //Importamos express con 'require'
const app = express();  //Definimos una aplicacion de tipo "express"

//Simularemos una DB con un archivo "cursos.js"
//Importamos el archivo cursos.js
const {infoCursos} = require ("./datos/cursos");

//Importacion de los routers
const routerProgramacion = require("./routers/programacion");   //Importamos el router de programacion
app.use("/api/cursos/programacion", routerProgramacion);
const routerMatematicas = require("./routers/matematicas"); //importamos el router de matematicas
app.use("/api/cursos/matematicas", routerMatematicas);


//Manejo de rutas - Routing con metodos http
//********* GET *********/
app.get("/", (re, res)=>{       //Raiz
    res.send("Mi primer servidor con Express. Cursos");
});

app.get("/api/cursos", (req,res)=>{ //Obtenemos todos los cursos 
    res.send(JSON.stringify(infoCursos));
});


//Configuracion de escucha del puerto
const PUERTO = process.env.PORT || 3000;
app.listen(PUERTO, ()=>{
    console.log(`El servidor esta escuchando en el puerto ${PUERTO}...`);
});




















