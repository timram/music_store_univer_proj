const errorTextCodes = {
  validation: 'VALIDATION_ERROR'
};

const genericErrorHandler = (res, err) => {
  if (!!err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res.status(500).json({ message: err.message });
}

const validationErrorHandler = (res, err) => {
  const { errors: [{ errors }] } = err;
  if (!errors || errors.length === 0) {
    return res.status(400).json({ message: 'validation error!' });
  }

  return res.status(400).json({
    validationErrors: errors.map(({ message, path, code, params }) => {
      const field = code === 'OBJECT_MISSING_REQUIRED_PROPERTY'
        ? params[0]
        : path[0];
      return {
        code,
        field,
        message
      };
    })
  });
};

module.exports = {
  middleware: (err, req, res, next) => {
    if (!err) return next();

    if (err.message === 'Validation errors') {
      return validationErrorHandler(res, err);
    }

    return genericErrorHandler(res, err);
  },
  genericErrorHandler,
  throwError: ({ status = 400, message = '' }) => {
    const error = new Error(message);
    error.statusCode = status;
    throw error;
  }
};
