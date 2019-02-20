import React from 'react';
import PageTitle from '../../common/PageTitle';
import PostsList from '../../PostsList';
import Button from '../../common/Button';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { withConfig } from '../../../providers/config';
import { withTheme } from '../../../providers/theme';
import { compose } from 'recompose';
import { withAccount } from '../../../providers/account';

const enhancer = compose(
  withConfig,
  withTheme,
  withAccount({ redirect: true })
);

export default enhancer(({ config, theme }) =>
  <div> 
    <PageTitle> 
      Публикации
    </PageTitle>
    <div className={theme.general.page.content.wrapper}>
      <Grid container justify="flex-end">
        <Button
          component={Link} 
          to={config.endpoints.createPost}
        > 
          Создать публикацию
        </Button>
      </Grid> 
      <PostsList/>
    </div>
  </div>
);