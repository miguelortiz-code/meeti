import multer from 'multer';
import shortid from 'shortid';
import path from 'path';
import fs from 'fs';

 // Definir el tipo de formatos permitidos
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error('Formato no válido (solo .jpg, .jpeg, .png, .webp).'),
      false
    );
  }
};

/**
 * Crea un middleware multer dinámico según la carpeta
 * @param {string} folderName - Nombre de la carpeta donde se guardará la imagen
 */

export const uploadTo = (folderName) => {
  // Definimos el storage dinámico
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(`./src/public/uploads/${folderName}`);

      // Crear la carpeta si no existe
      fs.mkdirSync(uploadPath, { recursive: true });

      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, `${shortid.generate()}${path.extname(file.originalname)}`);
    },
  });

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: 1_000_000 }, // 1MB
  });
};