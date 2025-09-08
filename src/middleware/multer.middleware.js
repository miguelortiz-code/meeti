import multer from "multer";
import shortid from "shortid";
import path from "path";
import fs from "fs";

const multerMiddleware = (folder) => {
  const uploadPath = `./src/public/uploads/${folder}`;
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadPath),
    filename: (req, file, cb) =>
      cb(null, shortid.generate() + path.extname(file.originalname)),
  });

  const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "El formato del archivo no es válido (solo .jpg, .png, .webp)."
        ),
        false
      );
    }
  };

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
  });
};

export default multerMiddleware;
