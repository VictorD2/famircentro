const router = require('express').Router();
const ctrlUsuarios = require('../controllers/usuarios.controllers');
const { isAdmin, typePetition } = require('../lib/auth');
router.get('/api/usuarios', [typePetition], ctrlUsuarios.getUsers);
router.get('/:id', ctrlUsuarios.getUserById);
router.post('/', ctrlUsuarios.createUser);
router.put('/:id', ctrlUsuarios.updateUser);
router.delete('/:id', ctrlUsuarios.deleteUser);

module.exports = router;