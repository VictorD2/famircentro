const pool = require('../database');
const ctrlUsuarios = {};


ctrlUsuarios.createUser = (req, res) => {

}

ctrlUsuarios.getUsers = async(req, res) => {
    const data = await pool.query('SELECT * FROM usuarios');
    res.json(data);
}

ctrlUsuarios.getUserById = (req, res) => {}

ctrlUsuarios.updateUser = (req, res) => {}

ctrlUsuarios.deleteUser = (req, res) => {}



module.exports = ctrlUsuarios;