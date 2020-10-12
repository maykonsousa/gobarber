import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AuthConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}
export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error('Token is missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, AuthConfig.jwt.secret);
    const { sub } = decoded as TokenPayload;
    req.user = {
      id: sub,
    };
    return next();
  } catch (err) {
    throw new Error('Token is invalid');
  }
}
