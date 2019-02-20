import React from 'react';
import { productEditor } from '../../../theme';
import Grid from '@material-ui/core/Grid';
import Typeography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import withLoader from '../../../helpers/withLoader';
import ElementLoader from '../../loaders/element-loader';
import style from './style.scss';

const Image = withLoader({ loaderComponent: ElementLoader })(({ src }) =>
  <img 
    className={productEditor.image}
    src={src}
  />
);

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  }
});

export default withStyles(styles)(({ loaded, src, onChange, classes }) =>
  <Grid
    className={classes.root}
  >
    <Typeography component="p" variant="headline">
      Загрузить изображение
    </Typeography>
    <input
      type="file"
      accept=".png, .jpg, .jpeg"
      onChange={onChange}
    />
    <Image
      display-if={src}
      loaded={loaded}
      src={src}
    />
  </Grid>
);