const router = require('express').Router();
const ctrlModulo = require('../controllers/modulos.controllers');

router.post('/', ctrlModulo.createModulo);
router.delete('/:id', ctrlModulo.eliminarModulo);
router.put('/', ctrlModulo.actualizarModulo);


module.exports = router;