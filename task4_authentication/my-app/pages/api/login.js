import { createToken } from '../../lib/jwt';
import cookie from 'cookie';

export default function handler(req, res) {
  const { username, password } = req.body;

  // Hardcoded user for demo purposes
  const validUser = {
    username: 'admin',
    password: 'admin',
  };

  if (username === validUser.username && password === validUser.password) {
    const token = createToken({ username });

    // Set the token as a cookie
    res.setHeader('Set-Cookie', cookie.serialize('auth', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600, // 1 hour
      path: '/',
    }));

    return res.status(200).json({ message: 'Login successful' });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
}
