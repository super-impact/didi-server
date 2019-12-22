import { randomFillSync, scryptSync } from 'crypto';

export const encryptPassword = (
  plainPassword: string,
): {
  passwordSalt: string;
  passwordHash: string;
} => {
  const passwordSalt = randomFillSync(Buffer.alloc(64)).toString('hex');
  const passwordHash = scryptSync(plainPassword, passwordSalt, 64).toString('hex');

  return {
    passwordSalt,
    passwordHash,
  };
};

export const checkCorrectPassword = (password: string, passwordSalt: string, passwordHash: string): boolean => {
  const encryptedPassword = scryptSync(password, passwordSalt, 64).toString('hex');

  return passwordHash === encryptedPassword;
};
