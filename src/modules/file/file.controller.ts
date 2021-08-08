import { Body, Controller, HttpException, HttpStatus, Post, UploadedFile, UploadedFiles, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FilesToBodyInterceptor } from 'src/common/interceptor/filesToBody.interceptor';
import { FileToBodyInterceptor } from 'src/common/interceptor/fileToBody.interceptor';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileDto, FilesDto } from './dto/file.dto';

@Controller('file')
@ApiTags('文件')
export class FileController {
    constructor() { }


    @ApiOperation({ summary: '单文件上传', description: '单文件上传' })
    @UseInterceptors(FileInterceptor('file'), FileToBodyInterceptor)
    @ApiConsumes('multipart/form-data')
    @Post('single')
    async single(@Body() { file }: FileDto) {
        const res: any = await this.uploadfile(file.suffix, file.buffer).catch(err => {
            throw new HttpException({ errcode: 0, errmsg: `上传文件失败: ${err.statusCode} ${err.data.error}` }, HttpStatus.BAD_REQUEST);
        })
        return res;
    }

    @ApiOperation({ summary: '多文件上传', description: '多文件上传' })
    @ApiConsumes('multipart/form-data')
    @Post('many')
    @UseInterceptors(FilesInterceptor('files'), FilesToBodyInterceptor)
    async many(@Body() { files }: FilesDto) {
        const arr = files.map(file => {
            return this.uploadfile(file.suffix, file.buffer)
        })

        return await Promise.all(arr).catch(err => {
            throw new HttpException({ errcode: 0, errmsg: `上传文件失败: ${err.statusCode} ${err.data.error}` }, HttpStatus.BAD_REQUEST);
        })
    }


    uploadfile(suffix, buffer) {
        return new Promise((resolve) => setTimeout(() => resolve('ok'), 1000))
    }
}

