const router = require('express').Router();
const ctrlTema = require('../controllers/tema.controllers');
const { isAdmin, typePetition } = require('../lib/auth');
const upload = require('../lib/multer');

router.post('/', upload.fields([{ name: 'video', maxCount: 1 }, { name: 'material', maxCount: 3 }]), ctrlTema.createTema);
router.put('/:id', ctrlTema.actualizarTema);
router.delete('/:id', ctrlTema.eliminarTema);

module.exports = router;