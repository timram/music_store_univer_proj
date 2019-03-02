module.exports = fields => {
  const error = new Error();
  error.validation = fields;
  throw error;
};