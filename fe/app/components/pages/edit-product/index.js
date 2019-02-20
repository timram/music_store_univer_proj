import React from 'react';
import ProductEditor from '../../ProductEditor';
import PageTitle from '../../common/PageTitle';
import { compose } from 'recompose';
import { withAccount } from '../../../providers/account';
import { general } from '../../../theme';

const enhancer = compose(
  withAccount({ redirect: true })
);

export default enhancer(({ match }) =>
  <div>
    <PageTitle>
      Редактировать продукт
    </PageTitle>
    <div className={general.page.content.wrapper}>
      <ProductEditor prodID={match.params.prodID}/>
    </div>
  </div>
);