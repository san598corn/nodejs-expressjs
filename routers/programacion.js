const express = require("express"); //Importamos express con 'require'

const {programacion} = require("../datos/cursos").infoCursos;

//Router => Manejo mas practico de URL
const routerProgramacion = express.Router();

//Middleware
routerProgramacion.use(express.json()); //Procesa el cuerpo de la solictud POST en formato json


//Manejo de rutas - Routing con metodos http
//********* GET *********/
routerProgramacion.get("/", (req,res)=>{    //Obtenemos los cursos de programacion solamente
    res.send(JSON.stringify(programacion));
});

//Si tenemos cientos de lenguajes de programacion, podemos hacer esto...
routerProgramacion.get("/:lenguaje",(req,res)=>{
    const lenguaje = req.params.lenguaje;
    const resultados = programacion.filter(curso => curso.lenguaje === lenguaje);
    if(resultados.length === 0){
        //return res.status(404).send(`No se encontraron cursos de ${lenguaje}`);
        return res.status(404).end();
    }

    //Parametros de ordenamiento en URL (?clave=valor)
    if(req.query.ordenar === "vistas"){
        return res.send(JSON.stringify(resultados.sort((a,b)=>b.vistas - a.vistas)));
    }
    res.send(JSON.stringify(resultados));
});

//Para filtrar con 2 o mas parametros en la URL...
routerProgramacion.get("/:lenguaje/:nivel", (req,res)=>{
    const lenguaje = req.params.lenguaje;
    const nivel = req.params.nivel;
    const resultados = programacion.filter(curso => curso.lenguaje === lenguaje && curso.nivel === nivel);
    if(resultados.length === 0){
        //return res.status(404).send(`No se encontraron cursos de ${lenguaje} de nivel ${nivel}`);
        return res.status(404).end();
    }
    res.send(JSON.stringify(resultados));
});

//********* POST (Agregar)*********/
routerProgramacion.post("/", (req,res)=>{
    let cursoNuevo = req.body; //Extraemos el cuerpo de la solicitud
    programacion.push(cursoNuevo); //Agregamos el objeto nuevo a programacion
    res.send(JSON.stringify(programacion)); //enviamos la respuesta en formato JSON
});

//********* PUT (Modificar)*********/
routerProgramacion.put("/:id", (req,res)=>{
    const cursoActualizado = req.body           //Modificamos el cuerpo de la solicitud
    const id = req.params.id                    //Accedemos a los parametros de URL en este caso al id para modificar
    const indice = programacion.findIndex(curso => curso.id == id);    //Encontar el indice de un elemento en un arreglo, en este caso los indices de curso.js (0,1,2,3,..)
    //Si indice es >= 0, entonces reemplazamos el objeto completo de programacion
    if(indice >= 0){
        programacion[indice] = cursoActualizado; //Tomamos el indice del array "programacion" y le asignamos el curso actualizado
    }else{
        res.status(404);
    }
    res.send(JSON.stringify(programacion));     //Enviamos la version actualizada de todos los cursos en formato JSON
});

//********* PATCH (Modificar solamete los pares clave=valor del array, no todo el contenido) *********/
routerProgramacion.patch("/:id", (req,res)=>{
    const infoActualizada = req.body;           //Del cuerpo debemos ver que se modificara, en este caso no se modificara todo el body
    const id = req.params.id;                   //Accedemos a los parametros de URL en este caso al id para modificar
    const indice = programacion.findIndex(curso => curso.id == id); //Encontar el indice de un elemento en un arreglo, en este caso los indices de curso.js (0,1,2,3,..)
    if(indice >= 0){
        const cursoAModificar = programacion[indice]       //El curso a modificar lo podemos obtener a traves del indice del array "programacion"
        Object.assign(cursoAModificar, infoActualizada);    //Pasamos un objeto a modificar y otro objeto que tiene propiedades y valores actualizados
    }else{
        res.status(404);
    }
    res.send(JSON.stringify(programacion));     //Enviamos la info actualizada al array programacion
});

//********* DELETE (Eliminar)*********/
routerProgramacion.delete("/:id", (req,res)=>{
    const id = req.params.id;       //Obtenemos el id que deseamos eliminar (No es necesario trabajr con el body porque no vamos a pasar informacion)
    const indice = programacion.findIndex(curso => curso.id == id);
    if(indice >= 0){
        programacion.splice(indice, 1);      //Splice nos permite cortar el array en un indice especifico y eliminar uno o varios elementos a partir de ese corte
    }else{
        res.status(404);
    }
    res.send(JSON.stringify(programacion));
});

//Exportamos este router
module.exports = routerProgramacion;






