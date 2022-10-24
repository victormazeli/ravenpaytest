const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const client = require("../common/redis");
const response = require("../common/response");
dotenv.config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  try {
    jwt.verify(token, process.env.SECRET_TOKEN, function(err, decoded) {
      if (err.name === "TokenExpiredError") {
        return res.status(403).json(response.error(403, "TOKEN EXPIRED"));
      }
      req.decoded = decoded;
    });
  } catch (err) {
    return res.status(401).json(response.error(401, "INVALID TOKEN"));
  }
  return next();
};

const verifyRefreshToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).send('A refresh token is required for access token exchnage');
  }
  
  try {
    // const getRefreshToken = await client.get(token);
    jwt.verify(token, process.env.SECRET_RTOKEN, function(err, decoded) {
      if (err.name == "TokenExpiredError") {
        return res.status(403).json(response.error(403, "TOKEN EXPIRED"));
      }
      req.decoded = decoded;
    });
  } catch (error) {
    return res.status(401).json(response.error(401, "INVALID TOKEN"));
  }

  return next();
}


module.exports = { verifyToken, verifyRefreshToken };