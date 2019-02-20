import Pagination from './Pagination';
import { withProps, compose } from 'recompose';
import { withTheme } from '../../providers/theme';

export default compose(
  withTheme,
  withProps(({ offset, limit, total, step = 2 }) => {
    const currentPage = offset;
    const lastPage = Math.ceil(total / limit) - 1;
    const firstPageToDisplay = currentPage - step;
    const lastPageToDisplay = currentPage + step;
    const pages = Array(lastPageToDisplay - firstPageToDisplay + 1)
      .fill(0)
      .map((a, i) => firstPageToDisplay + i);

    const pagesToDisplay = pages.filter(p => p >= 0 && p <= lastPage);

    return {
      currentPage,
      pages: pagesToDisplay,
      showFirstPage: firstPageToDisplay > 0,
      showLastPage: lastPageToDisplay < lastPage,
      lastPage
    };
  })
)(Pagination);