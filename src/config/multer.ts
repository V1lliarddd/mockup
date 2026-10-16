// backend/src/config/multer.ts
import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const UPLOADS_DIR = path.join(__dirname, '..', '..', 'images');
const AVATARS_DIR = path.join(UPLOADS_DIR, 'users');
const CAN_TEACH_DIR = path.join(UPLOADS_DIR, 'can_teach');

[UPLOADS_DIR, AVATARS_DIR, CAN_TEACH_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    const dir = file.fieldname === 'avatar' ? AVATARS_DIR : CAN_TEACH_DIR;
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${crypto.randomUUID()}${ext}`);
  }
});

const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

const fileFilter: multer.Options['fileFilter'] = (_req, file, cb) => {
  if (!ALLOWED_MIME.includes(file.mimetype)) {
    return cb(new Error('Недопустимый тип файла'));
  }
  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 5
  }
});
