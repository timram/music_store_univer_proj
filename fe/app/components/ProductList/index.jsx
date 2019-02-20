import { product as productCRUD } from '../../helpers/crud';
import ResourcesList from '../common/resources-list';
import { endpoints } from '../../config';
import ProductCard from '../Cards/ProductCard';
import React from 'react';

export default () => 
  <ResourcesList
    CRUD={productCRUD}
    deleteable={true}
    itemToString={({ name, brand, type }) => `${name} (${brand}, ${type})`}
    basePath={endpoints.products}
    ItemCard={ProductCard}
  />