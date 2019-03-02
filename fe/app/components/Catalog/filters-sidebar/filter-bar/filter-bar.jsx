import React from 'react';
import ItemsMapper from '../../../common/ItemsMapper';
import cx from 'classnames';
import PlusIcon from '../../../common/icons/plus';
import MinusIcon from '../../../common/icons/minus';

const FilterItem = ({ name, count, onClick, selected }) =>
  <li
    className={cx('filters-sidebar-filter-bar-item', selected && 'selected-filter-item')}
    onClick={() => onClick({ name })}
  >
    <span
      className={cx('filters-sidebar-filter-bar-item-checkbox', selected ? 'bg-success' : 'bg-secondary')}
    />
    <span
      className={cx('filters-sidebar-filter-bar-item-name text-dark', selected && 'font-weight-bold')}
    >
      {name}
    </span>
    <span className="filters-sidebar-filter-bar-item-count text-secondary">({count})</span>
  </li>

export default ({ selected, notSelected, onClick, label, opened, setOpened }) =>
  <div className="filters-sidebar-filter-bar border rounded">
    <div
      className="filters-sidebar-filter-bar-header border-bottom"
      onClick={() => setOpened(!opened)}
    >
      <h3 className="filters-sidebar-filter-bar-header-title text-primary">{label}</h3>
      <span className="filters-sidebar-filter-bar-header-icon">
        <PlusIcon display-if={!opened}/>
        <MinusIcon display-if={opened}/>
      </span>
    </div>
    <ul
      display-if={opened}
      className="filters-sidebar-filter-bar-body"
    >
      <ItemsMapper
        items={selected.sort((a, b) => b.count - a.count)}
        selected={true}
        onClick={onClick}
        component={FilterItem}
      />
      <ItemsMapper
        items={notSelected.sort((a, b) => b.count - a.count)}
        onClick={onClick}
        component={FilterItem}
      />
    </ul>
  </div>