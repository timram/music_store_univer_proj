import React from 'react';
import Component from './LoginView';
import { Formik } from 'formik';
import { getAccount } from '../../helpers/account';
import { withRouter } from 'react-router-dom';

export default withRouter(({ history, setAccount }) =>
  <Formik
    initialValues={{ email: '', password: '' }}
    onSubmit={async ({ email, password }, actions) => {
      const account = await getAccount({
        login: email,
        password
      });
      actions.setSubmitting(false);
      if (!account) {
        return actions.setErrors({ account: 'Пользователь с такой почтой и паролем не зарегистрирован' });
      }
      setAccount(account);
      history.push('/')
    }}
    render={Component}
  />
);