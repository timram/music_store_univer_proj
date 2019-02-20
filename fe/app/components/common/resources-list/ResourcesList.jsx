import React from 'react';
import Pagination from '../../Pagination';
import ItemsMapper from '../ItemsMapper';

export default ({
  basePath,
  resources,
  loadResources,
  deleteResource,
  ItemCard
}) =>
  <div>
    <ItemsMapper
      deleteResource={deleteResource}
      items={resources.items}
      component={ItemCard}
    />
    <Pagination
      endpoint={basePath}
      {...resources}
      onClick={loadResources}
    />
  </div>