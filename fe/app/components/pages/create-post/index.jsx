import React from 'react';
import PostEditor from '../../PostEditor';
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
      Создайте публикацию
    </PageTitle>
    <div className={theme.general.page.content.wrapper}>
      <PostEditor/>
    </div>
  </div>
);