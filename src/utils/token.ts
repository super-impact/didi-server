import jwt from 'jsonwebtoken';

require('dotenv').config();

const { JWT_SECRET_KEY } = process.env;

if (!JWT_SECRET_KEY) {
  throw new Error('Not found jwt secret key');
}

export async function generateAccessToken(payload: { id: string }) {
  try {
    return jwt.sign(payload, JWT_SECRET_KEY, {
      subject: 'access-token',
      issuer: 'didi.org',
      expiresIn: '3h',
    });
  } catch (error) {
    throw error;
  }
}

export async function verfiyAccessToken(accessToken: string) {
  try {
    return jwt.verify(accessToken, JWT_SECRET_KEY);
  } catch (error) {
    throw error;
  }
}

export async function generateRefreshToken(payload: { id: string }) {
  try {
    return jwt.sign(payload, JWT_SECRET_KEY, {
      subject: 'refresh-token',
      issuer: 'didi.org',
      expiresIn: '14d',
    });
  } catch (error) {
    throw error;
  }
}

export async function verfiyRefreshToken(refreshToken: string) {
  try {
    return jwt.verify(refreshToken, JWT_SECRET_KEY);
  } catch (error) {
    throw error;
  }
}
