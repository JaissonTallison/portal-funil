import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { Request } from 'express';

@Controller('upload')
export class UploadController {
  @Post('article')
  @Roles(Role.ADMIN, Role.EDITOR, Role.JOURNALIST)
  @UseInterceptors(FileInterceptor('file'))
  uploadArticleImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('Nenhum arquivo enviado');
    return { url: `/uploads/articles/${file.filename}` };
  }

  @Post('event')
  @Roles(Role.ADMIN, Role.EDITOR)
  @UseInterceptors(FileInterceptor('file'))
  uploadEventImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('Nenhum arquivo enviado');
    return { url: `/uploads/events/${file.filename}` };
  }
}
