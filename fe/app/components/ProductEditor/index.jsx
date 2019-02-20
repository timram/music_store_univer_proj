import React from 'react';
import ProductEditor from './ProductEditor';
import * as Yup from 'yup';
import { labels } from '../../config';
import { product as productCRUD } from '../../helpers/crud';
import { withRouter } from 'react-router-dom';
import { endpoints, errorCodes } from '../../config';
import Editor from '../common/Editor';

const schema = Yup.object().shape({
  name: Yup.string()
    .required(labels.validation.required),
  type_id: Yup.number()
    .min(0, 'Выберите Тип')
    .required(labels.validation.required),
  brand_id: Yup.number()
    .min(0, 'Выберите бренд')
    .required(labels.validation.required),
  price: Yup.number('Введите валидное число')
    .positive(labels.validation.positive)
    .required(labels.validation.required),
  count: Yup.number()
    .min(0, labels.validation.positive)
    .integer(labels.validation.integer)
    .required(labels.validation.required),
  availability: Yup.boolean()
    .required(labels.validation.required),
  image: Yup.string()
});

export default withRouter(({ history, prodID }) =>
<Editor
  resID={prodID}
  title="Продукт"
  initValues={{
    name: '',
    type_id: -1,
    brand_id: -1,
    price: 0.00,
    count: 0,
    availability: false,
    image: ''
  }}
  validationSchema={schema}
  handleError={err => {
    if (err.response && err.response.data.err && err.response.data.err.error_code === errorCodes.duplication) {
      const duplicatedFields = err.response.data.err.fields;
      return duplicatedFields.reduce((acc, f) => ({
        ...acc,
        [f]: 'Бренд с таким названием уже зарегистрирован'
      }), {});
    }
    return false;
  }}
  createResource={async product => {
    const newProd = await productCRUD.createResource({
      ...product,
      price: parseFloat(product.price),
      count: parseFloat(product.count)
    });
    history.push(`${endpoints.products}/${newProd.id}`);
    return newProd;
  }}
  updateResource={(id, product) => productCRUD.updateResource(id, {
    ...product,
    price: parseFloat(product.price),
    count: parseFloat(product.count)
  })}
  deleteResource={async prodID => {
    await productCRUD.deleteResource(prodID);
    return history.push(endpoints.products);
  }}

  deleteable={true}

  loadResource={({ resID }) => productCRUD.getResource(resID)}

  Component={ProductEditor}
/>);