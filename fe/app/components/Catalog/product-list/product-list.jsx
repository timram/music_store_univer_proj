import React from 'react';
import ItemsMapper from '../../common/ItemsMapper';
import ProductCard from '../../Cards/CatalogCard';
import Pagination from '../catalog-pagination';

export default ({ instruments }) =>
<div className="products-grid-wrapper">
  <div className="products-grid">
    <ItemsMapper
      items={instruments.items}
      component={ProductCard}
    />
  </div>
  <div className="products-grid-pagination-wrapper">
    <Pagination
      offset={instruments.offset}
      limit={instruments.limit}
      total={instruments.total}
    />
  </div>
</div>