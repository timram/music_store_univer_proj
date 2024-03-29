module.exports = ({ status, message }) => {
  const error = new Error(message);
  error.statusCode = status;
  throw error;
}