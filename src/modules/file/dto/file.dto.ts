import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsDefined, IsString } from "class-validator";
import { ApiFile } from "src/common/decorator/file.decorator";

class File {
    readonly fieldname: string;
    readonly originalname: string;
    readonly encoding: string;
    readonly mimetype: string;
    readonly buffer: Buffer[];
    readonly size: number;
    readonly suffix?: string;
}

export class FileDto {
    @ApiFile()
    @IsDefined()
    readonly file: File;
}

export class FilesDto {
    @ApiFile({ isArray: true })
    readonly files: File[];
}


