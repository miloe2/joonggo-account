// middleware/apiKeyAuth.js
module.exports = function apiKeyAuth(req, res, next) {
  const clientKey = req.headers['x-api-key'];

  if (clientKey !== process.env.API_KEY) {
    return res.status(403).json({ message: 'Forbidden: Invalid API Key' });
  }

  next();
};