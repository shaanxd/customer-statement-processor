import multer from "multer";
import { v4 } from "uuid";
import path from "path";
import { isMatchingExtension } from "./file";

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, "./storage/uploads/");
  },
  filename: (_req, file, callback) => {
    callback(null, `${v4()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (_req, file, callback) => {
    if (isMatchingExtension(file, /csv|xml/)) {
      return callback(null, true);
    }
    return callback(
      new Error(
        "Please upload a valid file format. Only CSV and XML are supported at the moment."
      )
    );
  },
});

export default upload;
