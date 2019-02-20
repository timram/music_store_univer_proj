import React from 'react';
import ProductEditor from '../../ProductEditor';
import PageTitle from '../../common/PageTitle';
import { compose } from 'recompose';
import { withAccount } from '../../../providers/account';
import { withTheme } from '../../../providers/theme';

const enhancer = compose(
  withAccount({ redirect: true }),
  withTheme
); 

export default enhancer(({ theme }) =>
  <div>
    <PageTitle>
      Создайте продукт
    </PageTitle>
    <div className={theme.general.page.content.wrapper}>
      <ProductEditor/>
    </div>
  </div>
);