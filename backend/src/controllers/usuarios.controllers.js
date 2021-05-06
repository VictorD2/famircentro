const pool = require('../database');
const ctrlUsuarios = {};


ctrlUsuarios.createUser = (req, res) => {

}

ctrlUsuarios.getUsers = async(req, res) => {
    const data = await pool.query('SELECT * FROM usuarios');
    res.json(data);
}

ctrlUsuarios.getUserById = (req, res) => {}

ctrlUsuarios.whoiam = async(req, res) => {
    if (!req.user) return res.json({ message: "failed"}); //No autentificado
    delete req.user.password;
    req.user.authenticate = true;
    return res.json({ user: req.user });
}

ctrlUsuarios.updateUser = (req, res) => {}

ctrlUsuarios.deleteUser = (req, res) => {}



module.exports = ctrlUsuarios;