const jwt = require("jsonwebtoken");

const userAuthMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'agape_vows_secret_key_2026');
      req.userId = decoded.userId;
      return next();
    }
    
    const userId = req.headers["user-id"];
    if (userId) {
      req.userId = userId;
      return next();
    }

    return res.status(401).json({ success: false, message: "Unauthorized: Token missing" });
  } catch (error) {
    return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
  }
};

module.exports = userAuthMiddleware;