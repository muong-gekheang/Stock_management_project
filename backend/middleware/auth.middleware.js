import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/env.js'

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access Denied: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  console.log('Incoming token:', token);
  console.log('Secret used:', JWT_SECRET ? 'Set' : 'NOT SET'); // Avoid logging secret

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Decoded JWT payload:', decoded);

    req.user = decoded; // Attach user to request
    next();
  } catch (err) {
    console.error('JWT verification error:', err.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
