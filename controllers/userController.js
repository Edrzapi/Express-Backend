const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');


const readUser = asyncHandler(async (req, res, next) => {
  try {
    const user = req.user;   
    if (user.token == "") {
      throw new error;
    }
    return res.status(200).json({ status: 200, user });
  }
  catch (err) {
    res.status(404).json({ status: 404, message: "No user logged in." });
    err.statusCode = 404;
    err.message = "404 - not found.";
    return next(err);
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION_TIME,
  })
}

const signUp = asyncHandler(async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const { firstName, lastName, email, password } = req.body;
    console.log(req.body)
    const hashedPassword = await bcrypt.hash(password, salt);
    // Incorrect data
    if (!firstName || !lastName || !email || !password) {
      res.status(400).json({ status: 400, message: "Missing a field, please check the supplied data." });
      throw new Error("Field missing");
    }
    // User exists
    const userExists = await userModel.findOne({ email })
    if (userExists) {
      res.status(400).json({ status: 400, message: `User with email: ${email} already exists.` });
      throw new Error("User exists");
    }
    const user = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: generateToken(user._id),
        status: 201,
        message: "User created."
      });
    } else {
      res.status(400).json({ status: 400, message: `Invalid input, please check content.` });
      throw new Error();
    }
  }
  catch (err) {
    return next(err);
  }
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    // Check user credentials
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ status: 400, message: 'Invalid credentials' });
      throw new Error('Invalid credentials');
    }
    
  } catch (err) {
    return next(err);
  }
});


module.exports = {
  signUp,
  login,
  readUser,
}