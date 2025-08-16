import path from "path";

export const isMatchingExtension = (file: Express.Multer.File, ext: RegExp) =>
  ext.test(path.extname(file.originalname).toLowerCase());
