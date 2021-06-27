const pool = require('../database');
const ctrlUsuarios = {};
const helpers = require('../lib/helpers');
const fs = require('fs-extra');
const path = require('path');
ctrlUsuarios.createUser = (req, res) => {

}

ctrlUsuarios.getUsers = async(req, res) => {
    const data = await pool.query('SELECT * FROM usuarios');
    res.json(data);
}

ctrlUsuarios.getUserById = (req, res) => {}

ctrlUsuarios.whoiam = async(req, res) => {
    if (!req.user) return res.json({ error: "No autentificado" }); //No autentificado
    const usuario = await pool.query('SELECT * FROM usuario WHERE id_usuario = ?', [req.user.id_usuario]);
    delete usuario[0].password;
    usuario[0].authenticate = true;
    return res.json({ user: usuario[0] });
}

ctrlUsuarios.updateUserDatos = async(req, res) => {

    if (req.params.id != req.user.id_usuario) return res.json({ error: "No tienes permiso para esta acción" });
    delete req.body.authenticate;
    const newUsuario = req.body;
    try {
        const rows = await pool.query('UPDATE usuario set ? WHERE id_usuario = ?', [newUsuario, req.params.id])
        newUsuario.authenticate = true
        if (rows.affectedRows === 1) return res.json({ success: "Perfil modificado correctamente", usuario: newUsuario }); //Se logró registrar
    } catch (error) {
        if (error.code === 'ECONNREFUSED') return res.json({ error: "Base de datos desconectada" });
        if (error.code === 'ER_DUP_ENTRY') return res.json({ error: "Ya existe un usuario con ese correo" });
    }

    return res.json({ error: "Ocurrió un error" });
}

ctrlUsuarios.updatePassword = async(req, res) => {

    if (req.params.id != req.user.id_usuario) return res.json({ error: "No tienes permiso para esta acción" });

    const usuario = await pool.query('SELECT * FROM usuario WHERE id_usuario = ?', [req.params.id])
    if (usuario[0].password != "") {
        const validarPassword = await helpers.matchPassword(req.body.oldPassword, usuario[0].password)
        if (!validarPassword) return res.json({ error: "Contraseña anterior incorrecta" })
    }
    const newPassword = await helpers.encrypPassword(req.body.newPassword);
    const newUsuario = {
        password: newPassword
    }
    const rows = await pool.query('UPDATE usuario set ? WHERE id_usuario = ?', [newUsuario, req.params.id])

    if (rows.affectedRows === 1) return res.json({ success: "Contraseña modificada correctamente" }); //Se logró registrar

    return res.json({ error: "Ocurrió un error" });
}

ctrlUsuarios.updateImg = async(req, res) => {
    if (req.params.id != req.user.id_usuario) return res.json({ error: "No tienes permiso para esta acción" });
    const usuario = await pool.query('SELECT * FROM usuario WHERE id_usuario = ?', [req.params.id])

    if (usuario[0].url_foto_usuario.search(`/uploads/fotosPerfil`) != -1) {
        await fs.unlink(path.join(__dirname, "../build" + usuario[0].url_foto_usuario));
    }
    const newUsuario = { url_foto_usuario: `/uploads/fotosPerfil/${req.file.filename}` }
    const rows = await pool.query('UPDATE usuario set ? WHERE id_usuario = ?', [newUsuario, req.params.id])

    if (rows.affectedRows === 1) return res.json({ success: "Foto modificada correctamente", url_foto_usuario: newUsuario.url_foto_usuario }); //Se logró registrar

    return res.json({ error: "Ocurrió un error" });
}

ctrlUsuarios.deleteUser = (req, res) => {}



module.exports = ctrlUsuarios;