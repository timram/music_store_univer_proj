import ProductList from './product-list';
import { withInstruments } from '../../../providers/instruments';
import { compose, lifecycle } from 'recompose';
import { hideCatalogLoader } from '../../../helpers/side-effects';

export default compose(
  withInstruments,

  lifecycle({
    componentDidMount() {
      hideCatalogLoader();
    }
  })
)(ProductList);