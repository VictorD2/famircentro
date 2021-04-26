const pool = require('../database');
const ctrlProfesores = {};

const data = [{
        id_profesor: "123",
        nombre: "pedro",
        apellido: "pedro",
        email: "pedro@hotmail.com",
        profesion: "profesion",
        pais: "Peru"
    },
    {
        id_profesor: "1234",
        nombre: "pedro",
        apellido: "marino",
        email: "pedro@hotmaxxxil.com",
        profesion: "profeeesion",
        pais: "Peeeeeru"
    },
    {
        id_profesor: "1235",
        nombre: "peqwedro",
        apellido: "peqwedro",
        email: "pedwwwro@hotmail.com",
        profesion: "pwwwrofesion",
        pais: "Pwwwweru"
    },
]
ctrlProfesores.createProfesor = (req, res) => {
    console.log(req.body);
    res.json({ message: "Profesor Creado" });
}

ctrlProfesores.getProfesores = (req, res) => {
    res.json(data);
}

ctrlProfesores.getProfesorById = (req, res) => {
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if (req.params.id == element.id_profesor) return res.json(element);
    }
    return res.json({ message: "No encontrado" });
}

ctrlProfesores.updateProfesor = (req, res) => {
    console.log(req.body);
    res.json({ message: "Actualizado" });
}

ctrlProfesores.deleteProfesor = (req, res) => {}



module.exports = ctrlProfesores;