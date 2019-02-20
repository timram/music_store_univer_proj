module.exports = (err, req, res, next) => {
  if (!err) return next();

  const status = err.statusCode || 500;

  return res.status(status).json({ message: err.message });
};