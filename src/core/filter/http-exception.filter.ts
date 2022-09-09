import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const errRes = exception.getResponse();
    console.log(errRes);
    let errMsg = typeof errRes === 'object' ? (errRes as any)?.message : '';
    errMsg = Array.isArray(errMsg) ? errMsg[0] : errMsg;
    // 设置错误信息
    const message =
      errMsg ||
      exception.message ||
      `${status >= 500 ? 'Service Error' : 'Client Error'}`;
    const errorResponse = {
      code: status,
      message: message,
      path: request.originalUrl,
    };

    response.status(200).json(errorResponse);
  }
}
