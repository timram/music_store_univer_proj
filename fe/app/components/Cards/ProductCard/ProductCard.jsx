import React from 'react';
import Typeography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Button from '../../common/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { cleanEvent } from '../../../helpers/utils';
import * as config from '../../../config';
import * as theme from '../../../theme';

import style from './style.scss';

export default ({
  availability,
  brand,
  count,
  name,
  price,
  type,
  id,
  created_at,
  deleteResource,
  image_url
}) =>
<Link
  to={`${config.endpoints.products}/${id}`}
  className={theme.productCard.root}>
  <div className={theme.productCard.content}>
    <div
      display-if={image_url}
      className={theme.productCard.contentBlock}
    >
      <img
        className={theme.productCard.image}
        src={image_url}
      />
    </div>
    <div className={theme.productCard.contentBlock}>
      <Typeography variant="subtitle1">
        {name}
      </Typeography>
      <Typeography variant="subtitle1">
        Тип: {type}
      </Typeography>
      <Typeography variant="subtitle1">
        Бренд: {brand} 
      </Typeography>
    </div>
    <div className={theme.productCard.contentBlock}>
      <Typeography vaiant="subtitle1">
        Цена: {price} руб.
      </Typeography>
      <Typeography vaiant="subtitle1">
        {new Date(created_at).toLocaleDateString('ru-RU')}
      </Typeography>
    </div>
    <div className={theme.productCard.contentBlock}>
      <Button
        color="secondary"
        onClick={cleanEvent(() => deleteResource({
          id, name, type, brand
        }))}
      >
        Удалить
        <DeleteIcon/>
      </Button>
    </div>
  </div>
</Link>;