const router = require('express').Router();
const ctrlCursos = require('../controllers/cursos.controllers');
const { isAdmin, typePetition } = require('../lib/auth');


router.get('/Talleres/Sincronos', [typePetition], ctrlCursos.getTalleresSincronos);
router.get('/Talleres/Asincronos', [typePetition], ctrlCursos.getTalleresAsincronos);
router.get('/Cursos/Sincronos', [typePetition], ctrlCursos.getCursosSincronos);
router.get('/Cursos/Asincronos', [typePetition], ctrlCursos.getCursosAsincronos);
router.get('/:id', ctrlCursos.getCursoById);
router.post('/', ctrlCursos.createCurso);
router.put('/:id', ctrlCursos.updateCurso);
router.delete('/:id', ctrlCursos.deleteCurso);

module.exports = router;