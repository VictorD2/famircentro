const router = require('express').Router();
const ctrlCursos = require('../controllers/cursos.controllers');
const { isAdmin, typePetition } = require('../lib/auth');


router.get('/', [typePetition], ctrlCursos.getCursos);
router.get('/:id', ctrlCursos.getCursoById);
router.post('/', ctrlCursos.createCurso);
router.put('/:id', ctrlCursos.updateCurso);
router.delete('/:id', ctrlCursos.deleteCurso);

module.exports = router;