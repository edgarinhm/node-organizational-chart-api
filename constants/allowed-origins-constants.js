const allowedOrigins = process.env.API_ALLOW_ORIGINS || 'http://localhost:3000,http://localhost:5173';
module.exports = allowedOrigins;