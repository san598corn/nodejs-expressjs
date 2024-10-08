let infoCursos = {
    "programacion":[
        {
            id: 1,
            titulo: "Aprende Python",
            lenguaje: "python",
            vistas: 56172,
            nivel: "basico"
        },
        {
            id: 2,
            titulo: "Python intermedio",
            lenguaje: "python",
            vistas: 78676,
            nivel: "intermedio"
        },
        {
            id: 3,
            titulo: "Aprende JavaScript",
            lenguaje: "javascript",
            vistas: 45261,
            nivel: "basico"
        }
    ],
    "matematicas": [
        {
            id: 1,
            titulo: "Aprende Calculo",
            tema: "calculo",
            vistas: 12465,
            nivel: "basico"
        },
        {
            id: 2,
            titulo: "Aprende Algebra",
            tema: "algebra",
            vistas: 10672,
            nivel: "intermedio"
        }
    ]
}

//Exportamos este modulo
module.exports.infoCursos = infoCursos;