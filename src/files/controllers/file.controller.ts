import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { ApiFile } from 'src/common/decorator/file.decorator';
import { ResponseOk } from 'src/response';
import { createFileName } from '../utils/file-upload.util';

@ApiTags('Files')
@Controller('files')
export class FileController {
  @ApiOperation({
    summary: 'upload file',
  })
  @ApiFile('file')
  @ApiConsumes('multipart/form-data')
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/uploads/',
        filename: createFileName,
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File): ResponseOk {
    const response: ResponseOk = {
      filename: file.filename,
    };
    return response;
  }
}
