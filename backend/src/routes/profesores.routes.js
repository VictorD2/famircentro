const router = require('express').Router();
const ctrlProfesores = require('../controllers/profesores.controllers');

router.get('/', ctrlProfesores.getUsers);
router.get('/:id', ctrlProfesores.getUserById);
router.post('/', ctrlProfesores.createUser);
router.put('/:id', ctrlProfesores.updateUser);
router.delete('/:id', ctrlProfesores.deleteUser);



module.exports = router;