import { HttpException, HttpStatus } from '@nestjs/common';

export function apiToken(req, res, next) {
  if (req.headers.api_key === process.env.API_KEY) {
    next();
  } else {
    throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
  }
}