module.exports = function cors(req, res, next) {
  // CORS headers
  res.header('Access-Control-Allow-Origin', '*');

  res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,x-token,Cookie');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  return next();
};
