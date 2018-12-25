const feErrorCodes = {
  duplication: 'UNIQUE_DUPLICATION',
  referenceNotExists: 'REFERENCE_NOT_EXISTS'
};

const throwError = ({ status = 400, message = '', ...attrs }) => {
  const error = new Error();
  error.message = message;
  error.statusCode = status;
  Object.keys(attrs).forEach(k => {
    error[k] = attrs[k]
  });
  throw error;
};

const errorTextCodes = {
  validation: 'VALIDATION_ERROR'
};

const genericErrorHandler = (res, err) => {
  if (!!err.statusCode) {
    return res.status(err.statusCode).json({ err });
  }
  return res.status(500).json(err);
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

const dbErrorsDescriptors = {
  uniqueDuplication: {
    attrName: 'duplicationAttributes',
    code: '23505'
  },
  referenceError: {
    attrName: 'referenceAttributes',
    code: '23503'
  }
};

const getErrorDescriptorByCode = (code, descriptors) => Object.values(descriptors)
  .find(({ code: errCode }) => errCode === code) || {};

const processDBError = (err, config = {}) => {
  const errorDescriptor = getErrorDescriptorByCode(err.code, dbErrorsDescriptors);
  const errorAttributes = config[errorDescriptor.attrName] || {};
  // Duplication UINQUE CONSTRAINT
  if (err.code === '23505') {
    throwError({
      message: err.detail,
      error_code: feErrorCodes.duplication,
      ...errorAttributes
    });
  }

  // FOREIGN KEY CONSTRAINT
  if (err.code === '23503') {
    const referenceField = Object.keys(errorAttributes)
      .find(k => err.detail.indexOf(k) > 0);
    const attrs = referenceField
      ? { fields: [referenceField], values: [errorAttributes[referenceField]] }
      : {};
    throwError({
      message: err.detail,
      error_code: feErrorCodes.referenceNotExists,
      ...attrs
    })
  }
  throw err;
}

module.exports = {
  middleware: (err, req, res, next) => {
    if (!err) return next();

    if (err.message === 'Validation errors') {
      return validationErrorHandler(res, err);
    }

    return genericErrorHandler(res, err);
  },
  genericErrorHandler,
  throwError,
  processDBError,
  dbErrorsDescriptors
};
