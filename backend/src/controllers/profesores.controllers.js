const pool = require('../database');
const ctrlProfesores = {};

ctrlProfesores.createProfesor = (req, res) => {
    const {nombre,apellido,profesion,correo,telefono,rut} = req.body;
    console.log(nombre);
    console.log(apellido);
    console.log(profesion);
    console.log(correo);
    console.log(telefono);
    console.log(rut);
    res.json({ message: "Profesor Creado" });
}

ctrlProfesores.getProfesores = (req, res) => {
    res.json(data);
}

ctrlProfesores.getProfesorById = (req, res) => {
    return res.json({ message: "No encontrado" });
}

ctrlProfesores.updateProfesor = (req, res) => {
    console.log(req.body);
    res.json({ message: "Actualizado" });
}

ctrlProfesores.deleteProfesor = (req, res) => {}



module.exports = ctrlProfesores;