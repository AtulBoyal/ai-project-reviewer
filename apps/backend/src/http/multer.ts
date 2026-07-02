import multer from "multer";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { MAX_UPLOAD_SIZE } from "../constants/upload.js";

const storage = multer.diskStorage({
  destination: "tmp/uploads",
  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname);
    cb(null, `${randomUUID()}${extension}`);
  },
});

const fileFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
  if (path.extname(file.originalname).toLowerCase() !== ".zip") {
    return cb(new Error("Only ZIP files are supported."));
  }

  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_UPLOAD_SIZE,
  },
});