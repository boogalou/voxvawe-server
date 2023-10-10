import * as crypto from 'crypto';

export const idGenerator = (email: string) => {
  const hash = crypto.createHash('sha256')
    .update(email.split('@').join(''));
  const hashBytes = hash.digest();
  const hashString = hashBytes.readUIntBE(0, 5)
    .toString()
    .padStart(10, '0');
  return hashString;
};

// function generateNumericId(email) {
//   const hash = crypto.createHash('sha256')
//     .update(email)
//     .digest('hex');
//
//   // Преобразование хэша в 10-значное число
//   const numericId = parseInt(hash, 16) % 1e10;
//
//   return numericId;
// }