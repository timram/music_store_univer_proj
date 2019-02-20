import React from 'react';
import cx from 'classnames';
import { cleanEvent } from '../../../helpers/utils';

export default ({
  onToggle,
  active,
  label,
  style
}) =>
  <span
    className={cx('RichEditor-styleButton', active && 'RichEditor-activeButton')}
    onClick={cleanEvent(() => onToggle(style))}
  >
    {label}
  </span>