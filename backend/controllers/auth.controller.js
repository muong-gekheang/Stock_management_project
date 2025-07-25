import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js'; // 
import { JWT_SECRET } from '../config/env.js';

export const register = async (req, res) => {
  const { Username, Email, Password, StoreName, StoreCategory } = req.body;
  console.log('Request Body:', req.body);
  console.log('Username:', Username);
  


  try {
    const existingUser = await User.findOne({ where: { Username } });

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists.' });
    }

    const hashedPassword = bcrypt.hashSync(Password, 10);

    await User.create({
      Username,
      Email,
      Password: hashedPassword,
      StoreName,
      StoreCategory,
    });

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error during registration.' });
  }
};

export const login = async (req, res) => {
  const { Username, Password } = req.body;

  try {
    if (!Username || !Password) {
      return res.status(400).json({ message: 'Username and Password are required.' });
    }

    const user = await User.findOne({ where: { Username } });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const isValid = await bcrypt.compare(Password, user.Password);

    if (!isValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { UserID: user.UserID, Username: user.Username },
      JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login.' });
  }
};

export const getProfile = (req, res) => {
  res.json({ message: 'Profile access granted', user: req.user });
};
