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
    if (req.user) {
        const rows = await pool.query('SELECT * FROM usuarios WHERE Correo = ?', [req.user.Correo]);
        return res.json({ user: rows[0], authenticate: true });
    }
    return res.json({ message: "failed", authenticate: false }); //No autentificado
}

ctrlUsuarios.updateUser = (req, res) => {}

ctrlUsuarios.deleteUser = (req, res) => {}



module.exports = ctrlUsuarios;