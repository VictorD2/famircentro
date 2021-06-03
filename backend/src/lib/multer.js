  const multer = require('multer');
  const path = require('path');
  const multerCtrl = {};
  // Settings
  const storageVideos = multer.diskStorage({
      destination: path.join(__dirname, '../uploads/video'),
      filename: (req, file, cb) => {
          const fecha = new Date();
          cb(null, `${fecha.getDate()}-${fecha.getMonth()}-${fecha.getFullYear()}-${fecha.getHours()}${fecha.getMinutes()}${fecha.getSeconds()}${file.originalname}`)
      }
  });
  const filerVideos = (req, file, cb) => {
      const filetypes = /mp4|MP4/
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(path.extname(file.originalname));
      if (mimetype && extname) {
          return cb(null, true);
      }
      cb("Archivo debe ser un video .mp4.");
  }


  const storageFotos = multer.diskStorage({
      destination: path.join(__dirname, '../build/uploads/fotos'),
      filename: (req, file, cb) => {
          const fecha = new Date();
          cb(null, `${fecha.getDate()}-${fecha.getMonth()}-${fecha.getFullYear()}-${fecha.getHours()}${fecha.getMinutes()}${fecha.getSeconds()}${file.originalname}`)
      }
  });

  const storageArchivos = multer.diskStorage({
      destination: path.join(__dirname, '../build/uploads/material'),
      filename: (req, file, cb) => {
          const fecha = new Date();
          cb(null, `${fecha.getDate()}-${fecha.getMonth()}-${fecha.getFullYear()}-${fecha.getHours()}${fecha.getMinutes()}${fecha.getSeconds()}${file.originalname}`)
      }
  });

  multerCtrl.videos = multer({ storage: storageVideos, fileFilter: filerVideos });
  multerCtrl.fotos = multer({ storage: storageFotos });
  multerCtrl.archivos = multer({ storage: storageArchivos });

  module.exports = multerCtrl;