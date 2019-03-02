const knex = require('../helpers/knex');
const config = require('../../config');
const { getUpdItemForDB } = require('../helpers/utils');
const {
  getTotalRowsCount,
  applyRestrictionsToQuery,
  applyOrderToQuery,
  applySelectionToQuery
} = require('../helpers/common-queries');
const {
  processDBError,
  dbErrorsDescriptors,
  throwError
} = require('../helpers/error-handler')
const { flow } = require('lodash/fp');

const processPostDBErrors = (err, post) => processDBError(err, {
  [dbErrorsDescriptors.uniqueDuplication.attrName]: {
    fields: ['title'],
    values: [post.title]
  }
});

const getUpdPostForDB = getUpdItemForDB({
  fields: ['title', 'body', 'enabled', 'description', 'post_type_id'],
  uploadImage: true,
  imageNameBuilder: ({ title }) => `${title.replace(/ /g, '_')}.jpeg`
})

const postsSelection = [
  'post.id',
  'post.title',
  'post.created_at',
  'post.body',
  'post.image_url',
  'post.enabled',
  'post.description',
  'post.post_type_id',
  'post_type.display_name as post_type'
];

const getPostQuery = (type, enabled) => {
  const query = knex('post')
    .innerJoin('post_type', 'post_type.id', 'post.post_type_id');
  
  const filters = {};
  if (type) {
    filters['post_type.name'] = type;
  }
  if (enabled !== undefined) {
    filters['post.enabled'] = enabled;
  }

  return query.where(filters);  
}

const Service = {
  getAllPosts: async ({
    limit = config.content_pagination.default.limit,
    offset = config.content_pagination.default.offset,
    type,
    enabled
  }) => {
    const postsQuery = getPostQuery(type, enabled);
    const finalGetPostsQuery = flow(
      applyRestrictionsToQuery({ limit, offset }),
      applyOrderToQuery('created_at', 'desc'),
      applySelectionToQuery(postsSelection)
    )(postsQuery);
    
    const [posts, [{ total }]] = await Promise.all([
      finalGetPostsQuery,
      getTotalRowsCount(postsQuery)
    ]);

    return {
      items: posts,
      total: parseFloat(total),
      limit,
      offset,
      filters: { post_type: type }
    }
  },

  getPost: async postID => {
    const [post] = await applySelectionToQuery(postsSelection)(
      getPostQuery()
        .where('post.id', postID)
    );
    
    if (!post) {
      throwError({
        status: 404,
        message: `There is not post with ID = ${postID}`
      });
    }

    return post;
  },

  createPost: async post => {
    try {
      const formattedPost = await getUpdPostForDB(post);
      const [newID] = await knex('post')
        .insert(formattedPost)
        .returning('id');

      return Service.getPost(newID);
    } catch (err) {
      processPostDBErrors(err, post);
    }
  },

  updatePost: async (postID, post) => {
    try {
      await Service.getPost(postID)

      const formattedPost = await getUpdPostForDB(post);
      
      await knex('post')
        .update(formattedPost)
        .where('id', postID);

      return Service.getPost(postID);
    } catch (err) {
      processPostDBErrors(err, post);
    }
  },

  deletePost: async postID => {
    await Service.getPost(postID);
    return knex('post').delete().where('id', postID);
  },

  getPostTypes: () => knex('post_type')
    .select('id', 'name', 'display_name')
};

module.exports = Service;
