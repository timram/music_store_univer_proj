import React from 'react';
import { compose, withProps, withHandlers, withStateHandlers, lifecycle, withState } from 'recompose';
import { getSearchParams, setUrlQuery } from '../../helpers/searchParams';
import { product as productCRUD } from '../../helpers/crud';
import { getAttributes } from '../../helpers/crud/instrument-attributes';
import { InstrumentsProvider } from '../../providers/instruments';
import FiltersSidebar from './filters-sidebar';
import ProductList from './product-list';
import Sorting from './catalog-sorting';
import { catalog } from '../../config';
import cx from 'classnames';
import styles from './styles.scss';

const initValuesLoader = async () => {
  const [instruments, brands, types] = await Promise.all([
    productCRUD.getResourcesList(
      getSearchParams('offset', 'limit', 'type', 'brand', 'sort_field', 'sort_order'),
      { limit: catalog.defaults.limit }
    ),
    getAttributes('brands')(),
    getAttributes('types')()
  ]);

  return {
    instruments,
    aggs: { brand: brands, type: types }
  };
}

const enhancer = compose(
  withStateHandlers(
    {
      instruments: null,
      aggs: null
    },
    {
      setInstruments: state => instruments => ({ ...state, instruments }),
      setAggs: state => aggs => ({ ...state, aggs }),
      setInstrumentsWithAggs: () => (instruments, aggs) => ({
        instruments, aggs
      })
    }
  ),

  lifecycle({
    async componentDidMount() {
      const { instruments, aggs } = await initValuesLoader();
      this.props.setInstrumentsWithAggs(instruments, aggs);
    }
  }),

  withHandlers({
    loadInstruments: ({ setInstruments, instruments }) =>
      async ({ offset, limit, type, brand, sort }) => {
        const searchSort = sort || instruments.sort;
        const searchParams = {
          limit: limit || instruments.limit,
          offset: offset || instruments.offset,
          type: type || instruments.filters.type,
          brand: brand || instruments.filters.brand,
          sort_field: searchSort.field,
          sort_order: searchSort.order
        };

        if (type || brand) {
          instruments.offset = 0;
        }

        const updInstruments = await productCRUD.getResourcesList(searchParams);

        setInstruments(updInstruments);
        setUrlQuery(searchParams);
      }
  }),

  withState('filtersOpened', 'setFiltersOpened', false),

  withProps(({ instruments }) => ({
    totalFilters: instruments
      ? Object.values(instruments.filters)
          .reduce((acc, v) => acc + v.length, 0)
      : 0
  }))
);

export default enhancer(
  ({ instruments, aggs, loadInstruments, filtersOpened, setFiltersOpened, totalFilters }) =>
    <InstrumentsProvider
      display-if={instruments && aggs}
      value={{ ...instruments, aggs, loadInstruments }}
    >
    <div className="container-fluid">
      <div className="catalog-wrapper">
        <div className="mobile-actions justify-content-center flex-column">
          <button
            className="mobile-actions-button btn btn-primary mb-2"
            onClick={() => setFiltersOpened(!filtersOpened)}
          >
            Фильтровать ({totalFilters})
          </button>
          <Sorting/>
        </div>
        <div
          className={cx('filters-sidebar-wrapper', filtersOpened && 'mobile-opened')}
        >
          <FiltersSidebar/>
        </div>
        <div className="product-list-wrapper">
          <div className="desktop-actions mb-3 pl-3">
            <Sorting/>
          </div>
          <ProductList/>
        </div>
      </div>
    </div>
    </InstrumentsProvider>
);