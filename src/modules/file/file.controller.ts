import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileDto } from './dto/file.dto';

@Controller('file')
@ApiTags('文件')
export class FileController {
    constructor() { }


    @ApiOperation({ summary: '单文件上传', description: '单文件上传' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        required: true,
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                }
            }
        }
    })
    @Post('single')
    @UseInterceptors(FileInterceptor('file'))
    async single(@UploadedFile(new ValidationPipe()) file: FileDto) {
        console.log("🚀  ~ file", file)
        return '上传成功';
    }

    @ApiOperation({ summary: '多文件上传', description: '多文件上传' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        required: true,
        schema: {
            type: 'object',
            properties: {
                files: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                }
            }
        }
    })
    @Post('many')
    @UseInterceptors(FileInterceptor('files'))
    many(@UploadedFiles(new ValidationPipe()) files: FileDto[]) {
        console.log("🚀  ~ files", files);
        return '上传成功';
    }
}

