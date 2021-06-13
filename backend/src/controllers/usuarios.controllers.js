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
    if (!req.user) return res.json({ message: "failed" }); //No autentificado

    delete req.user.password;
    req.user.authenticate = true;
    return res.json({ user: req.user });
}

ctrlUsuarios.updateUser = (req, res) => {
    if (req.params.id !== req.user.id_usuario) return res.json({ error: "No tienes permiso para esta acción" });

    console.log(req.params.id)
    console.log(req.file);
    res.json({ success: "Ok" });
}

ctrlUsuarios.deleteUser = (req, res) => {}



module.exports = ctrlUsuarios;