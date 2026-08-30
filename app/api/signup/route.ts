export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { UserController } from '@/server/controllers/user.controller';
import { UserService } from '@/server/services/user.service';
import { UserRepository } from '@/server/repositories/user.repository';
import connectToDatabase from '@/server/config/db';
import { NextRequest } from 'next/server';
import { sendError } from '@/server/utils/response';
import { ERROR_CODES, HTTP_STATUS } from '@/server/config/constants';
import { logger } from '@/server/utils/logger';
import { SignupSchema } from '@/server/validators/user.validator';

const MAX_BODY_BYTES = 32768; // 32 KB

export async function POST(req: NextRequest) {
  // 1. Early Content-Length Check
  const contentLength = req.headers.get('content-length');
  if (contentLength && parseInt(contentLength, 10) > MAX_BODY_BYTES) {
    return sendError('Payload too large.', 'PAYLOAD_TOO_LARGE', 413);
  }

  // 2. Exact Normalized Content-Type Check
  const mediaType = req.headers.get('content-type')?.split(';')[0].trim().toLowerCase();
  if (mediaType !== 'application/json') {
    return sendError('Unsupported Media Type. Only application/json is accepted.', 'UNSUPPORTED_MEDIA_TYPE', 415);
  }

  // 3. UTF-8 Byte Length Guard
  let bodyText: string;
  try {
    bodyText = await req.text();
  } catch {
    return sendError('Invalid request body.', ERROR_CODES.VALIDATION_ERROR, HTTP_STATUS.BAD_REQUEST);
  }

  if (Buffer.byteLength(bodyText, 'utf8') > MAX_BODY_BYTES) {
    return sendError('Payload too large.', 'PAYLOAD_TOO_LARGE', 413);
  }

  // 4. Guarded JSON Parse
  let body: any;
  try {
    body = JSON.parse(bodyText);
  } catch {
    return sendError('We received an invalid request format. Please try submitting again.', ERROR_CODES.VALIDATION_ERROR, HTTP_STATUS.BAD_REQUEST);
  }

  // 5. Validation BEFORE DB Connection
  const validationResult = SignupSchema.safeParse(body);
  if (!validationResult.success) {
    logger.warn('Signup validation failed');
    return sendError('Please check your details and try again.', ERROR_CODES.VALIDATION_ERROR, HTTP_STATUS.BAD_REQUEST);
  }

  // 6. Connect to Database ONLY AFTER validation passes
  try {
    await connectToDatabase();
    const repository = new UserRepository();
    const service = new UserService(repository);
    const controller = new UserController(service);
    return await controller.signup(validationResult.data, req);
  } catch (error) {
    logger.error({ code: ERROR_CODES.DATABASE_ERROR }, 'Database connection failed in signup route');
    return sendError('We are currently experiencing technical difficulties. Please try again shortly.', ERROR_CODES.DATABASE_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}
