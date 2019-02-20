import React from 'react';

export default ({
  items,
  component,
  ...props
}) => items.map((item, i) =>
  React.createElement(component, { ...item, ...props, key: i }));