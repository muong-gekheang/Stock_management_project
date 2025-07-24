// controllers/user.controller.js
import User from '../models/User.js';
import bcrypt from "bcryptjs";

export const getProfile = async (req, res) => {
    
    const userId = req.user.UserID;
    if (!userId) {
        return res.status(404).json({ message: 'User not found' });
    }

    try {
        const user = await User.findOne({
        where: { UserID: userId },
        attributes: ['UserID', 'Username', 'Email', 'StoreName', 'StoreCategory', 'JoinDate', 'ImageURL'],
        })

        res.json(user);
    } catch (err) {
        console.error('Get profile error:', err);
        res.status(500).json({ message: 'Server error' });
    }
    };

export const updateProfile = async (req, res) => {
  const { Username, Email, StoreName, StoreCategory, ImageURL } = req.body;

  // ✅ Validate inputs
  if (!Username || Username.trim().length < 3) {
    return res.status(400).json({ message: 'Username is required (min 3 chars)' });
  }

  try {
    const user = await User.findByPk(req.user.UserID);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields
    user.Username = Username.trim();
    user.Email = Email ? Email.trim() : null;
    user.StoreName = StoreName ? StoreName.trim() : null;
    user.StoreCategory = StoreCategory || null;
    if (ImageURL) user.ImageURL = ImageURL;

    await user.save();

    // Don't send password hash back
    const userData = user.toJSON();
    delete userData.Password; // Just in case

    res.json(userData);
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ message: 'Failed to update profile' });
  }
};

export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  // ✅ Input validation
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'All password fields are required' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ message: 'New password must be at least 6 characters' });
  }

  try {
    const user = await User.findByPk(req.user.UserID);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 🔐 Compare current password
    const isMatch = await bcrypt.compare(currentPassword, user.Password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // ✅ Hash new password
    const salt = await bcrypt.genSalt(10);
    user.Password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    console.error('Change password error:', err);
    res.status(500).json({ message: 'Server error while changing password' });
  }
};