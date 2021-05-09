const pool = require('../database');
const ctrlCursos = {};
const helpers = require('../lib/helpers');

ctrlCursos.createCurso = async(req, res) => {
    console.log(req.body);
    res.json({ message: "success" });
}

ctrlCursos.getTalleresAsincronos = async(req, res) => {
    const data = await pool.query('SELECT * FROM curso WHERE tipo = \'Taller\' AND modalidad = \'Asincrono\'');
    res.json(data);
}
ctrlCursos.getTalleresSincronos = async(req, res) => {
    const data = await pool.query('SELECT * FROM curso WHERE tipo = \'Taller\' AND modalidad = \'Sincrono\'');
    res.json(data);
}
ctrlCursos.getCursosAsincronos = async(req, res) => {
    const data = await pool.query('SELECT * FROM curso WHERE tipo = \'Curso\' AND modalidad = \'Asincrono\'');
    res.json(data);
}
ctrlCursos.getCursosSincronos = async(req, res) => {
    const data = await pool.query('SELECT * FROM curso WHERE tipo = \'Curso\' AND modalidad = \'Sincrono\'');
    res.json(data);
}

ctrlCursos.getCursoById = async(req, res) => {}

ctrlCursos.updateCurso = async(req, res) => {}

ctrlCursos.deleteCurso = async(req, res) => {}



module.exports = ctrlCursos;