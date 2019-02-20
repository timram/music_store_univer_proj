import React from 'react';
import { Form, Field } from 'formik';
import FormikInput from '../common/MaterialFormikInput';
import FormikToggler from '../common/FormikToggler';
import Grid from '@material-ui/core/Grid';
import withFormikLogic from '../../helpers/withFormikLogic';
import Button from '../common/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import ImageLoader from '../common/ImageLoader';
import TextEditor from '../common/text-editor';
import FormikSelectorWithAsyncValues from '../common/MaterialFormikSelectorWithAsyncValues';
import { getPostTypes, mapTypesForSelector } from '../../helpers/crud/post-types';

export default withFormikLogic(({
  values,
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
      name="title"
      label="Название публикации"
      description="Название публикации..."
      changeOnBlur
      onChange={updateValue({ name: 'title' })}
      onFocus={touchElement({ name: 'title' })}
      required
    />
    <Field 
      component={FormikSelectorWithAsyncValues}
      name="post_type_id"
      label="Тип"
      description="Выберите тип публикации"
      required
      onChange={updateValue({ name: 'post_type_id' })}
      onReset={resetValue({ name: 'post_type_id', val: -1 })}
      onClick={touchElement({ name: 'post_type_id' })}
      valuesLoader={getPostTypes}
      valuesMapper={mapTypesForSelector}
    />
    <Field
      component={TextEditor}
      name="body"
      label="Тело публикации"
      description="Контент публикации"
      changeOnBlur
      onChange={updateValue({ name: 'body' })}
      onFocus={touchElement({ name: 'body' })}
      required
    />
    <Field
      component={FormikInput}
      name="description"
      label="Краткое описание публикации"
      description="Описание публикации..."
      changeOnBlur
      onChange={updateValue({ name: 'description' })}
      onFocus={touchElement({ name: 'description' })}
      multiline
      rows="4"
    />
    <Field
      component={FormikToggler}
      name="enabled"
      label="Опубликовать"
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