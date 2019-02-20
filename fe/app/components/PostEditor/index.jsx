import React from 'react';
import PostEditor from './PostEditor';
import * as Yup from 'yup';
import { labels } from '../../config';
import { post as postCRUD } from '../../helpers/crud';
import { withRouter } from 'react-router-dom';
import { endpoints, errorCodes } from '../../config';
import Editor from '../common/Editor';

const schema = Yup.object().shape({
  title: Yup.string()
    .required(labels.validation.required),
  body: Yup.string()
    .required(labels.validation.required),
  description: Yup.string().nullable(),
  enabled: Yup.boolean()
    .required(labels.validation.required),
  image: Yup.string(),
  post_type_id: Yup.number()
    .positive(labels.validation.positive)
    .required(labels.validation.required)
});

export default withRouter(({ history, postID }) =>
<Editor
  resID={postID}
  title="Публикация"
  initValues={{
    title: '',
    body: '',
    enabled: false,
    image: '',
    description: '',
    post_type_id: -1
  }}
  validationSchema={schema}
  createResource={async post => {
    const newPost = await postCRUD.createResource(post);
    history.push(`${endpoints.posts}/${newPost.id}`);
    return newPost;
  }}
  updateResource={(id, post) => postCRUD.updateResource(id, post)}
  deleteResource={async postID => {
    await postCRUD.deleteResource(postID);
    return history.push(endpoints.posts);
  }}

  handleError={err => {
    if (err.response && err.response.data.err && err.response.data.err.error_code === errorCodes.duplication) {
      const duplicatedFields = err.response.data.err.fields;
      return {
        title: 'Публикация с таким названием уже зарегистрирована'
      }
    }
    return false;
  }}

  deleteable={true}

  loadResource={({ resID }) => postCRUD.getResource(resID)}

  Component={PostEditor}
/>);