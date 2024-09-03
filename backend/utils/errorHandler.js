import logger from './logger.js';

export default function errorHandler(err, req, res, next) {
  logger.error(err.stack);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Invalid token' });
  }

  return res.status(500).json({ message: 'Something went wrong' });
}
