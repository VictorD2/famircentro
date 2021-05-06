const router = require('express').Router();
const ctrlEstudiantes = require('../controllers/estudiantes.controllers');
const { isAdmin, typePetition } = require('../lib/auth');


router.get('/', [typePetition], ctrlEstudiantes.getEstudiantes);
router.get('/:id', ctrlEstudiantes.getEstudianteById);
router.delete('/:id', ctrlEstudiantes.deleteEstudiante);
// router.post('/', ctrlEstudiantes.createUser);
// router.put('/:id', ctrlEstudiantes.updateUser);

module.exports = router;