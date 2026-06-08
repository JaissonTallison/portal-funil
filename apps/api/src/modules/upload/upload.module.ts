import { BadRequestException, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomUUID } from 'crypto';
import { UploadController } from './upload.controller';

const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp']);
const ALLOWED_EXT = /\.(jpg|jpeg|png|webp)$/i;

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: (_req, file, cb) => {
          const folder = file.fieldname === 'event' ? 'events' : 'articles';
          cb(null, `public/uploads/${folder}`);
        },
        filename: (_req, file, cb) => {
          cb(null, `${randomUUID()}${extname(file.originalname)}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (_req, file, cb) => {
        if (!ALLOWED_EXT.test(file.originalname) || !ALLOWED_MIME.has(file.mimetype)) {
          return cb(new BadRequestException('Formato inválido. Use JPG, PNG ou WEBP.') as unknown as Error, false);
        }
        cb(null, true);
      },
    }),
  ],
  controllers: [UploadController],
})
export class UploadModule {}
