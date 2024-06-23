import User from '../models/user.model.js';
import Propirty from '../models/propirty.model.js';
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt"; 


const saltRounds = 10;
// Function to make a user an admin
export const makeAdmin = async (req, res) => {
  const userId = req.params.id;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      console.log('User not found');
      res.send('User not found');
      return;
    }

    // Update the user's role to "admin"
    user.type = 'admin';

    // Save the updated user
    await user.save();

    console.log('User is now an admin');
    res.redirect('/admin/viewusers');
  } catch (error) {
    console.log(error);
    res.send('An error occurred');
  }
};

const validation = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^])[A-Za-z\d@$!%*?&^]+$/
    )
    .withMessage(
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
    ),
  body("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),
];
