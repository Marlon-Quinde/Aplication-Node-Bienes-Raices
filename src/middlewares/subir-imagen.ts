import multer, { diskStorage } from "multer";
import path from "path";
import { generarId } from "../helpers/tokens";

const storage = diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/uploads/");
  },
  filename(req, file, callback) {
    callback(null, generarId() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

export default upload;
