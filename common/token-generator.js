const jwt = require('jsonwebtoken');

  function generateAccessToken(id, email) {
    return jwt.sign(
      { sub: id, email: email},
      process.env.SECRET_TOKEN,
      {
        expiresIn: '1h',
      }
    );
  }
  
  function generateRefreshToken(id, email) {
    return jwt.sign(
      { sub: id, email: email, refresh: true },
      process.env.SECRET_RTOKEN,
      {
        expiresIn: '30d',
      }
    );
  }

module.exports = {generateAccessToken, generateRefreshToken}