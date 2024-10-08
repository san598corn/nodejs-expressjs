const express = require("express"); //Importamos express con 'require'

const {matematicas} = require("../datos/cursos").infoCursos;

//Router => Manejo mas practico de URL
const routerMatematicas = express.Router();     //Procesa el cuerpo de la solictud POST en formato json

//Middleware
routerMatematicas.use(express.json());

//Manejo de rutas - Routing con metodos http
//********* GET *********/
routerMatematicas.get("/",(req,res)=>{      //Obtenemos los cursos de matematicas solamente
    res.send(JSON.stringify(matematicas));
});

//Si tenemos cientos de cursos de matematicas, podemos hacer esto...
routerMatematicas.get("/:tema",(req,res)=>{
    const tema = req.params.tema;
    const resultados = matematicas.filter(curso => curso.tema === tema);
    if(resultados.length === 0){
        //return res.status(404).send(`No se encontraron cursos de ${tema}`);
        return res.status(404).end();
    }

    //Parametros de ordenamiento en URL (?clave=valor)
    if(req.query.ordenar === "vistas"){
        return res.send(JSON.stringify(resultados.sort((a,b)=> b.vistas - a.vistas)));
    }

    res.send(JSON.stringify(resultados));
});

//Para filtrar con 2 o mas parametros en la URL...
routerMatematicas.get("/:tema/:nivel", (req,res) => {
    const tema = req.params.tema;
    const nivel = req.params.nivel;
    const resultados = matematicas.filter(curso => curso.tema === tema && curso.nivel === nivel);
    if(resultados.length === 0){
        return res.status(404).send(`No se encontraron cursos de ${tema} de nivel ${nivel}`);
    }
    res.JSON(stringify(resultados));
});

//********* POST (Agregar)*********/
routerMatematicas.post("/", (req,res)=>{
    let cursoNuevo = req.body;                  //Extraemos el cuerpo de la solicitud
    matematicas.push(cursoNuevo);               //Agregamos el objeto nuevo a matematicas
    res.send(JSON.stringify(matematicas));      //enviamos la respuesta en formato JSON
});

//********* PUT (Modificar)*********/
routerMatematicas.put("/:id", (req,res) =>{
    const cursoActualizado = req.body;          //Modificamos el cuerpo de la solicitud
    const id = req.params.id;                   //Accedemos a los parametros de URL en este caso al id para modificar
    const indice = matematicas.findIndex(curso => curso.id == id);      //Encontar el indice de un elemento en un arreglo, en este caso los indices de curso.js (0,1,2,3,..)
    //Si indice es >= 0, entonces reemplazamos el objeto completo de matematicas
    if(indice >= 0){
        matematicas[indice] = cursoActualizado;     //Tomamos el indice del array "matematicas" y le asignamos el curso actualizado
    }else{
        res.status(404);
    }
    res.send(JSON.stringify(matematicas));          //Enviamos la version actualizada de todos los cursos en formato JSON
});

//********* PATCH (Modificar solamete los pares clave=valor del array, no todo el contenido) *********/
routerMatematicas.patch("/:id", (req,res) =>{
    const infoActualizada = req.body;           //Del cuerpo debemos ver que se modificara, en este caso no se modificara todo el body
    const id = req.params.id;                   //Accedemos a los parametros de URL en este caso al id para modificar
    const indice = matematicas.findIndex(curso => curso.id == id);  //Encontar el indice de un elemento en un arreglo, en este caso los indices de curso.js (0,1,2,3,..)
    if(indice >= 0){
        const cursoAModificar = matematicas[indice]       //El curso a modificar lo podemos obtener a traves del indice del array "matematicas"
        Object.assign(cursoAModificar, infoActualizada);    //Pasamos un objeto a modificar y otro objeto que tiene propiedades y valores actualizados
    }else{
        res.status(404);
    }
    res.send(JSON.stringify(matematicas));     //Enviamos la info actualizada al array matematicas
});


//********* DELETE (Eliminar)*********/
routerMatematicas.delete("/:id", (req,res)=>{
    const id = req.params.id;       //Obtenemos el id que deseamos eliminar (No es necesario trabajr con el body porque no vamos a pasar informacion)
    const indice = matematicas.findIndex(curso => curso.id == id);
    if(indice >= 0){
        matematicas.splice(indice, 1);      //Splice nos permite cortar el array en un indice especifico y eliminar uno o varios elementos a partir de ese corte
    }else{
        res.status(404);
    }
    res.send(JSON.stringify(matematicas));
});

//Exportamos este router
module.exports = routerMatematicas;












