import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const RouterLink = ({ to, label, icon, ...props }) =>
  <li>
    <ListItem
      selected={window.location.pathname === to}
      {...props}
      button
      component={props => <Link to={to} {...props} />}
    >
      <ListItemIcon display-if={!!icon}>
        {icon}
      </ListItemIcon>
      <ListItemText primary={label}/>
    </ListItem>
  </li>


RouterLink.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
};

export default RouterLink;