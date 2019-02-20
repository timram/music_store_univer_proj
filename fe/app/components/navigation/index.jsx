import React from 'react';
import List from '@material-ui/core/List';
import RouterLink from '../common/RouterLink';

export default () =>
  <List component="nav">
    <RouterLink to="/" label="Главная"/>
    <RouterLink to="/products" label="Продукты"/>
    <RouterLink to="/posts" label="Посты"/>
  </List>


