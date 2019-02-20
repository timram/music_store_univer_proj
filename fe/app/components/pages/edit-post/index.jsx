import React from 'react';
import PostEditor from '../../PostEditor';
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
      Редактировать публикацию
    </PageTitle>
    <div className={general.page.content.wrapper}>
      <PostEditor postID={match.params.postID}/>
    </div>
  </div>
);