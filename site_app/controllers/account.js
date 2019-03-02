const {
  login: loginRequest,
  updateAccount,
  registerAccount
} = require('../helpers/common-requests');
const registerValidator = require('../validators/register');

const extractApiErrors = err => {
  const errObj = err.error && err.error.err;
  if (errObj && errObj.error_code === 'UNIQUE_DUPLICATION') {
    return {
      unique: errObj.fields.reduce((acc, f) => ({ ...acc, [f]: true }), {})
    };
  }
};

const Controller = {
  login: async (req, res) => {
    const { login, password } = req.body;
    try {
      const account = await loginRequest({ login, password });
      req.session.account = account;
      return res.redirect('../');
    } catch (err) {
      return res.render('login', {
        title: 'Войти',
        error: true,
        login,
        password
      })
    }
  },

  viewAccount: (req, res) => {
    if (!req.session.account) {
      return res.redirect(' ../login');
    }
    return res.render('account', {
      title: 'Аккаунт',
      email: req.session.account.email,
      fname: req.session.account.fname,
      lname: req.session.account.lname
    })
  },

  updateAccount: async (req, res) => {
    if (!req.session.account) {
      return res.redirect('../login');
    }
    const { email, fname, lname } = req.body;
    try {
      const updAccount = await updateAccount({
        email,
        fname,
        lname,
        token: req.session.account.token,
        id: req.session.account.id
      });

      req.session.account = {
        ...req.session.account,
        ...updAccount
      };

      return res.redirect('/account');
    } catch (err) {
      const apiErrors = extractApiErrors(err);
      if (apiErrors) {
        return res.render('account', {
          title: 'Аккаунт',
          email,
          fname,
          lname,
          errors: { ...apiErrors }
        });
      }
      throw err;
    }
  },

  registerView: (req, res) => {
    if (req.session.account) {
      return res.redirect('../');
    }
    return res.render('register', { title: 'Регистрация' });
  },

  registerAccount: async (req, res) => {
    if (req.session.account) {
      return res.redirect('../');
    }
    const { email, fname, lname, password, repeat_password } = req.body;
    try {
      registerValidator(req.body);

      const newAccount = await registerAccount({
        email,
        fname,
        lname,
        password
      });

      req.session.account = newAccount;

      return res.redirect('../');
    } catch (err) {
      const apiErrors = extractApiErrors(err);
      const validationErrors = err.validation;
      if (apiErrors || validationErrors) {
        return res.render('register', {
          title: 'Регистрация',
          email,
          fname,
          lname,
          password,
          repeat_password,
          errors: {
            ...apiErrors,
            validation: validationErrors
          }
        })
      }
      throw err;
    }
  },
};

module.exports = Controller;
