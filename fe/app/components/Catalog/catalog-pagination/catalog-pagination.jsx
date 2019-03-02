import React from 'react';
import cx from 'classnames';

const PaginationButton = ({
  selected,
  offset,
  limit,
  onClick
}) =>
  <li className={cx('page-item', selected && 'active')}>
    <a className="page-link" onClick={() => !selected && onClick({ offset, limit })}>
      {offset + 1}
    </a>
  </li>

const Dots = () =>
  <li className="page-item disabled">
    <a className="page-link">...</a>
  </li>

export default ({
  currentPage,
  pages,
  showFirstPage,
  showLastPage,
  limit,
  lastPage,
  onClick
}) =>
  <ul className="pagination justify-content-center">
    <PaginationButton
      display-if={showFirstPage}
      limit={limit}
      offset={0}
      onClick={onClick}
    />
    <Dots display-if={showFirstPage}/>
    {pages.map((p, i) =>
      <PaginationButton
        key={i}
        selected={currentPage === p}
        limit={limit}
        offset={p}
        onClick={onClick}
      />
    )}
    <Dots display-if={showLastPage}/>
    <PaginationButton
      display-if={showLastPage}
      limit={limit}
      offset={lastPage}
      onClick={onClick}
    />
  </ul>