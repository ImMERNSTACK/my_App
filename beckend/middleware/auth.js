const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
    
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }
    const token = authHeader.split(' ')[1];
    console.log(token);
    if (!token) {
      return res.status(401).json({ error: 'Token missing' });
    }
    jwt.verify(token, 'yfhgfdgjkjllkj', (err, decoded) => {
      if (err) {
        console.error('Token verification failed:');
        return res.status(401).json({ error: 'Unauthorized access' });
      }
      req.user = decoded;
      next();
    });
  };