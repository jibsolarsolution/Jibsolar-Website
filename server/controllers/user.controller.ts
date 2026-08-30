import { UserService } from '@/server/services/user.service';
import { sendSuccess, sendError } from '@/server/utils/response';
import { SignupSchema } from '@/server/validators/user.validator';
import { HTTP_STATUS, ERROR_CODES } from '@/server/config/constants';
import { NextRequest } from 'next/server';
import { logger } from '@/server/utils/logger';
import { z } from 'zod';

export class UserController {
  constructor(private service: UserService) {}

  async signup(data: z.infer<typeof SignupSchema>, req: NextRequest) {
    try {
      const clientIp = req.headers.get('x-forwarded-for') || req.ip || undefined;
      const userAgent = req.headers.get('user-agent') || undefined;

      const result = await this.service.registerUser(data, clientIp, userAgent);

      return sendSuccess(result, 'Your information has been successfully saved. Thank you!', result.status === 'new' ? HTTP_STATUS.CREATED : HTTP_STATUS.OK);
    } catch (error: any) {
      if (error.message === 'USER_ALREADY_EXISTS') {
        logger.warn('User already exists');
        return sendError('It looks like you already have an account with this email or phone number.', ERROR_CODES.USER_ALREADY_EXISTS, HTTP_STATUS.BAD_REQUEST);
      }
      logger.error({ code: ERROR_CODES.UNKNOWN_ERROR }, 'Error during signup');
      return sendError('Oops! Something went wrong on our end. Please try again later.', ERROR_CODES.UNKNOWN_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
  }
}
