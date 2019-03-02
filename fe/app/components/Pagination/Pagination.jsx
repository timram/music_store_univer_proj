import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { applyQueryParams } from '../../helpers/searchParams';
import cx from 'classnames';
import style from './style.scss';
import { withStyles } from '@material-ui/core/styles';
import * as theme from '../../theme';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 2
  }
});

const PaginationButton = ({
  selected,
  endpoint,
  offset,
  limit,
  onClick,
  ...props
}) => selected
  ? <a {...props}>
      {offset + 1}
    </a> 
  : <Link
      onClick={() => onClick({ offset, limit })}
      to={{ 
        pathname: endpoint,
        search: applyQueryParams({
          params: [
            { name: 'offset', value: offset },
            { name: 'limit', value: limit }
          ],
          url: ''
        })
      }}
      {...props}
    >
      {offset + 1} 
    </Link>;

const Pagination = ({
  currentPage,
  pages,
  showFirstPage,
  showLastPage,
  endpoint,
  limit,
  lastPage,
  onClick,
  classes
}) =>
  <Grid justify="center" className={classes.root} container spacing={16}>
    <PaginationButton
      display-if={!!showFirstPage}
      endpoint={endpoint}
      limit={limit}
      offset={0}
      onClick={onClick}
      className={theme.pagination.button}
    />
    <span
      display-if={!!showFirstPage}
      className={cx(theme.pagination.button, theme.pagination.dot)}
    >
      ...
    </span>
    {pages.map((p, i) =>
      <PaginationButton
        key={i}
        selected={currentPage === p}
        endpoint={endpoint}
        limit={limit}
        offset={p}
        onClick={onClick}
        className={cx(theme.pagination.button, currentPage === p && theme.pagination.selected)}
      />
    )}
    <span
      display-if={!!showLastPage}
      className={cx(theme.pagination.button, theme.pagination.dot)}
    >
      ...
    </span>
    <PaginationButton
      display-if={!!showLastPage}
      endpoint={endpoint}
      limit={limit}
      offset={lastPage}
      onClick={onClick}
      className={theme.pagination.button}
    />
  </Grid>

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pages: PropTypes.arrayOf(PropTypes.number).isRequired,
  showFirstPage: PropTypes.bool.isRequired,
  showLastPage: PropTypes.bool.isRequired,
  endpoint: PropTypes.string.isRequired,
  limit: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export default withStyles(styles)(Pagination);