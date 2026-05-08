import multer from "multer";
import path from "path";

const allowedMimeTypes = [
  "text/plain",

  "application/pdf",

  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

  "image/png",
  "image/jpeg",
  "image/webp",
  "image/tiff",
  "image/bmp",
];

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },

  filename(req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

export const upload = multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter(req, file, cb) {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error("Unsurppoted file type"));
    }

    cb(null, true);
  },
});
