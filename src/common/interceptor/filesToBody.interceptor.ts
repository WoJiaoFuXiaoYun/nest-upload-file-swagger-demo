import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class FilesToBodyInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();
        const req = ctx.getRequest();
        if (req.body && Array.isArray(req.files) && req.files.length) {
            req.body.files = [];//会忽略body中files字段
            req.files.forEach((file) => {
                const { fieldname } = file;
                if (!req.body[fieldname]) {
                    req.body[fieldname] = [file];
                } else {
                    req.body[fieldname].push(file);
                }
            });
        } else {
            throw new HttpException({ errcode: 0, errmsg: '上传文件不能为空' }, HttpStatus.BAD_REQUEST);
        }

        return next.handle();
    }
}