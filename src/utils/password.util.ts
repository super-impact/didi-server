import { randomFillSync, scryptSync } from 'crypto';

export const encryption = (password: string) => {
  const passwordSalt = randomFillSync(Buffer.alloc(64)).toString('hex');
  const passwordHash = scryptSync(password, passwordSalt, 64).toString('hex');

  return { passwordSalt, passwordHash };
};
