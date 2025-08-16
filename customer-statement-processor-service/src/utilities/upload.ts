import multer from "multer";
import { v4 } from "uuid";
import path from "path";

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, "./storage/uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, `${v4()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    const filetypes = /csv|xml/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (extname) {
      return callback(null, true);
    }
    const message =
      "Please upload a valid file format. Only CSV and XML are supported at the moment.";

    return callback(new Error(message));
  },
});

export default upload;
