const throwError = require('./throwError');

module.exports =  ({ password, repeat_password }) => {
  if (password !== repeat_password) {
    throwError({
      repeat_password: 'Пароли не совпадают'
    });
  }

  if (password.length < 6) {
    throwError({
      password: 'Пароль должен быть не менее 6 символов'
    });
  }
};