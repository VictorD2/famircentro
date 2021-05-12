const router = require('express').Router();
const ctrlCursos = require('../controllers/cursos.controllers');
const { isAdmin, typePetition } = require('../lib/auth');


router.get('/all/:tipo/:modalidad', [typePetition], ctrlCursos.getTalleresSincronos);
router.get('/:id', ctrlCursos.getCursoById);
router.post('/', ctrlCursos.createCurso);
router.put('/:id', ctrlCursos.updateCurso);
router.delete('/:id', ctrlCursos.deleteCurso);

module.exports = router;