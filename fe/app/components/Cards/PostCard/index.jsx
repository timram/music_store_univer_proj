import React from 'react';
import { endpoints } from '../../../config';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '../../common/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { cleanEvent } from '../../../helpers/utils';


const styles = theme => ({
  card: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3
  },
  media: {
    height: 200,
    backgroundSize: 'cover'
  },
  link: {
    textDecoration: 'none'
  }
});

export default withStyles(styles)(({
  title,
  id,
  image_url,
  classes,
  deleteResource,
  description,
  post_type
}) =>
<Card className={classes.card}>
  <CardActionArea>
    <Link
      className={classes.link}
      to={`${endpoints.posts}/${id}`}
    >
      <CardMedia
        display-if={image_url}
        className={classes.media}
        image={image_url}
        title={title}
      />
      <CardContent>
        <Typography>
          ({post_type})
        </Typography>
        <Typography variant="headline">
          {title}
        </Typography>
        <Typography variant="subtitle1">
          {description}
        </Typography>
      </CardContent>
    </Link>
  </CardActionArea>
  <CardActions>
    <Button
      color="secondary"
      onClick={cleanEvent(() => deleteResource({
        id, title
      }))}
    >
      Удалить
      <DeleteIcon/>
    </Button>
  </CardActions>
</Card>
);