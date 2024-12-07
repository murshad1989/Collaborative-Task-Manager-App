const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // JWT کو ہیڈر سے نکالنا
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    // ٹوکن کو ویری فائی کرنا
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // یوزر کی ID اور دیگر معلومات کو request میں ڈالنا
    req.user = decoded;
    next(); // اگلے middleware یا route handler کو چلائیں
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
