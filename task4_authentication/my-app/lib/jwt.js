import jwt from 'jsonwebtoken';

const SECRET_KEY = "your_secret_key"; // Replace with a secure key

export const createToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};
