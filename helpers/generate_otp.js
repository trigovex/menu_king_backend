import crypto from 'crypto';

async function generateOTP() {
  const length = 4;
  let otp = '';

  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10);
  }

  return otp;
}

async function generateRandomId(length) {
  const bytes = Math.ceil(length / 2);
  return crypto.randomBytes(bytes).toString('hex').slice(0, length);
}

export { generateOTP, generateRandomId };
