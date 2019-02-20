import React from 'react';
import PageTitle from '../../common/PageTitle';
import { withAccount } from '../../../providers/account';


export default withAccount({ redirect: true })(() =>
  <PageTitle>
    Главная панель администратора
  </PageTitle>
);