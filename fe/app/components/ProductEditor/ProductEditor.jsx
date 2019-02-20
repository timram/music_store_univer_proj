import React from 'react';
import { Form, Field } from 'formik';
import FormikSelectorWithAsyncValues from '../common/MaterialFormikSelectorWithAsyncValues';
import FormikInput from '../common/MaterialFormikInput';
import {
  getAttributes,
  createAttribute,
  mapAttributesForSelector,
  deleteAttribute
} from '../../helpers/crud/instrument-attributes';
import FormikToggler from '../common/FormikToggler';
import Grid from '@material-ui/core/Grid';
import withFormikLogic from '../../helpers/withFormikLogic';
import Button from '../common/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import ImageLoader from '../common/ImageLoader';

export default withFormikLogic(({
  errors,
  values,
  touched,
  updateValue,
  touchElement,
  resetValue,
  onDelete,
  ...props
}) =>
  <Form>
    <ImageLoader
      imageUrl={values.image_url}
      onChange={updateValue({ name: 'image' })}
    />
    <Field
      component={FormikInput}
      name="name"
      label="Название"
      description="Название продукта..."
      changeOnBlur
      onChange={updateValue({ name: 'name' })}
      onFocus={touchElement({ name: 'name' })}
      required
    />
    <Grid container spacing={40}>
      <Grid item xs={6}>
        <Field 
          component={FormikSelectorWithAsyncValues}
          name="type_id"
          label="Тип"
          description="Выберите тип инструмента"
          required
          onChange={updateValue({ name: 'type_id' })}
          onReset={resetValue({ name: 'type_id', val: -1 })}
          onClick={touchElement({ name: 'type_id' })}
          valuesLoader={getAttributes('types')}
          valuesMapper={mapAttributesForSelector}
          valueCreator={createAttribute('types')}
          valueDeleter={deleteAttribute('types')}
          deleteable
        />
        <Field 
          component={FormikSelectorWithAsyncValues}
          name="brand_id"
          label="Бренд"
          description="Выберите бренд инструмента"
          required
          onChange={updateValue({ name: 'brand_id' })}
          onReset={resetValue({ name: 'brand_id', val: -1 })}
          onClick={touchElement({ name: 'brand_id' })}
          valuesLoader={getAttributes('brands')}
          valuesMapper={mapAttributesForSelector}
          valueCreator={createAttribute('brands')}
          valueDeleter={deleteAttribute('brands')}
          deleteable
        />
      </Grid>
      <Grid item xs={6}>
        <Field
          component={FormikInput}
          name="price"
          label="Цена"
          description="Цена продукта в рублях"
          required
          changeOnBlur
          type="number"
          onChange={updateValue({ name: 'price' })}
          onFocus={touchElement({ name: 'price' })}
        />
        <Field
          component={FormikInput}
          name="count"
          label="Количество"
          description="Количество товара"
          required
          changeOnBlur
          type="number"
          onChange={updateValue({ name: 'count' })}
          onFocus={touchElement({ name: 'count' })}
        />
      </Grid>
    </Grid>
    <Field
      component={FormikToggler}
      name="availability"
      label="Товар доступен"
    />
    <Grid container>
      <Button
        type="submit"
      >
        { values.id ? 'Обновить' : 'Создать' }
      </Button>
      <Button
        display-if={onDelete}
        color="secondary"
        onClick={onDelete}
      >
        Удалить
        <DeleteIcon/>
      </Button>
    </Grid>
  </Form>
);