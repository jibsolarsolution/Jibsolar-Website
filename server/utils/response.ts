import { NextResponse } from 'next/server';

export const sendSuccess = (data: any, message = 'Success', status = 200) => {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status }
  );
};

export const sendError = (message = 'Error', code = 'UNKNOWN_ERROR', status = 500, errors?: any) => {
  const payload: Record<string, any> = {
    success: false,
    message,
    code,
  };
  if (errors !== undefined) {
    payload.errors = errors;
  }
  return NextResponse.json(payload, { status });
};
