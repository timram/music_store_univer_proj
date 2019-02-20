import { post as postCRUD } from '../../helpers/crud';
import ResourcesList from '../common/resources-list';
import { endpoints } from '../../config';
import PostCard from '../Cards/PostCard';
import React from 'react';

export default () => 
  <ResourcesList
    CRUD={postCRUD}
    deleteable={true}
    itemToString={({ title }) => `Публикация: ${title}`}
    basePath={endpoints.posts}
    ItemCard={PostCard}
  />