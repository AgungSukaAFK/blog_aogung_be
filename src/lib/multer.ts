import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images"); // Folder tempat penyimpanan
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Menyimpan file dengan nama unik
  },
});

export const upload = multer({ storage: storage });
