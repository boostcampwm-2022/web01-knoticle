import jwt from 'jsonwebtoken';

export const generateJWT = (
  expiresIn: '3h' | '7d',
  payload: { id?: number; nickname?: string } = {}
) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn });
};

export const decodeJWT = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};
