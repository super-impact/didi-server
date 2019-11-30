import { randomFillSync, scryptSync } from 'crypto';

export const encryptPassword = (plainPassword: string) => {
  const passwordSalt = randomFillSync(Buffer.alloc(64)).toString('hex');
  const passwordHash = scryptSync(plainPassword, passwordSalt, 64).toString('hex');

  return {
    passwordSalt,
    passwordHash,
  };
};
