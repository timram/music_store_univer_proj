import commonCrudOperations from './commonCrudOperations';

export const product = commonCrudOperations({
  baseEndpoint: '/instruments',
  fields: ['name', 'type_id', 'brand_id', 'price', 'count', 'availability', 'image']
});

export const post = commonCrudOperations({
  baseEndpoint: '/content/posts',
  fields: ['title', 'body', 'image', 'enabled', 'description', 'post_type_id']
});