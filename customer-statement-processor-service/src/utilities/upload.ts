import multer from "multer";
import { isMatchingExtension } from "./file";

const storage = multer.memoryStorage();

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
