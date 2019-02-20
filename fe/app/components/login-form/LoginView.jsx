import React from 'react';
import { Form, Field } from 'formik';
import FormikInput from '../common/MaterialFormikInput';
import ErrorMessage from '../common/ErrorMessage';
import Button from '../common/Button';
import withFormikLogic from '../../helpers/withFormikLogic';

export default ({
  errors,
  values, 
  isSubmitting
}) => 
  <Form>
    <ErrorMessage
      display-if={!!errors.account}
      msg={errors.account}
    />
    <Field
      component={FormikInput}
      type="email"
      name="email"
      placeholder="example@mail.com"
      label="Почта"
      description="Введите почту"
      required
      />
    <Field
      type="password"
      name="password"
      label="Пароль"
      description="Введите ваш пароль"
      component={FormikInput}
      required />
    <Button
      type="submit"
      disabled={isSubmitting}
    >
      Войти
    </Button>
  </Form>;