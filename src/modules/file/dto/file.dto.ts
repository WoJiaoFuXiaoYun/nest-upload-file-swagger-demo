import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

export class FileDto {
    @ApiProperty({ description: '文件' })
    @IsDefined({ message: 'file不能为空' })
    readonly fieldname: string;

    @ApiProperty({ description: '文件' })
    @IsDefined({ message: 'file不能为空' })
    readonly originalname: string;
    readonly encoding: string;
    readonly mimetype: string;
    readonly buffer: Buffer[];
    readonly size: number;
}