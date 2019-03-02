import React from 'react';
import FilterBar from './filter-bar';

export default () =>
  <div>
    <FilterBar 
      name="type"
      label="Тип"
    />
    <FilterBar
      name="brand"
      label="Бренд"
    />
  </div>