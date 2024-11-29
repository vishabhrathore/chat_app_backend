import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch()
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    switch (exception.code) {
      case 'P2002':
        response.status(400).json({ message: 'Duplicate field value!' });
        break;
      case 'P2025':
        response.status(404).json({ message: 'Record not found!' });
        break;
      default:
        response.status(500).json({ message: 'Database error!' });
        break;
    }
  }
}
