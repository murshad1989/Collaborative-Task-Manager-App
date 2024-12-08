const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const pool = require("../config/db");

// Verify Password
const verifyPassword = async (inputPassword, storedPassword) => {
  return await bcrypt.compare(inputPassword, storedPassword);
};

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Send Verification Email
const sendVerificationEmail = async (userEmail, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Email Verification',
    text: `Click on the link to verify your email: ${process.env.BASE_URL}/verify-email?token=${token}`,
  };

  await transporter.sendMail(mailOptions);
};

// Register User
const registerUser = async (req, res) => {
  const { username, name, email, password } = req.body;

  if (!username || !name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const checkUserExists = async (email) => {
    const user = await User.findOne({ where: { email } });
    return user ? true : false;
  };

  try {
    // Check if user already exists
    const [existingUser] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user
    const [result] = await pool.query(
      "INSERT INTO users (username, name, email, password) VALUES (?, ?, ?, ?)",
      [username, name, email, hashedPassword]
    );

    if (result.affectedRows === 1) {
      const token = generateToken(result.insertId);
      await sendVerificationEmail(email, token);
      res.status(201).json({ message: "User registered successfully. Verification email sent." });
    } else {
      throw new Error("Failed to register user.");
    }
  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const [user] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await verifyPassword(password, user[0].password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET);
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// Logout User
const logoutUser = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
};

// Get User Profile
const getUserProfile = async (req, res) => {
  const user = await User.findByPk(req.user.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

module.exports = { registerUser, loginUser, logoutUser, getUserProfile };
