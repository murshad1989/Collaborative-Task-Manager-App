const bcrypt = require('bcryptjs'); // Password hashing library
const jwt = require('jsonwebtoken'); // JWT token generation library
const User = require('../models/User'); // Import User model

// Controller function for user registration
const register = async (req, res) => {
  const { name, email, password } = req.body; // Extract data from request body
  console.log(`Registering user with name: ${name}, email: ${email}`);
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const user = await User.create({ name, email, password: hashedPassword }); // Save user to database
    
    // Generate JWT token after successful registration
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      message: 'User registered successfully!',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token, // Return JWT token in the response
    });
  } catch (err) {
    res.status(400).json({ error: err.message }); // Error response
  }
};


// Controller function for user login
const login = async (req, res) => {
  const { email, password } = req.body; // Extract login credentials
  try {
    const user = await User.findOne({ where: { email } }); // Find user by email
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password); // Compare hashed passwords
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Generate JWT token
    res.json({ message: 'Login successful!', token });
  } catch (err) {
    res.status(500).json({ error: err.message }); // Error response
  }
};

// Controller function for user logout
const logout = (req, res) => {
  res.json({ message: 'Logout successful!' }); // Simple logout response
};

// Export all controller functions
module.exports = { register, login, logout };
