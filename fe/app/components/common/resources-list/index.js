import ResourcesList from './ResourcesList';
import { compose, withHandlers } from 'recompose';
import PageLoader from '../../loaders/page-loader';
import { getSearchParams } from '../../../helpers/searchParams';
import ModalTypes from '../../modals/modal-types';
import withModal from '../../../helpers/containers/withModal';
import withValueLoading from '../../../helpers/withValueLoading';
import PropTypes from 'prop-types';
 
const SmartList = compose(
  withModal(),

  withValueLoading(({ CRUD }) => ({
    name: 'resources',
    useLoader: true,
    loaderComponent: PageLoader,
    valueLoader: () => CRUD.getResourcesList(getSearchParams('offset', 'limit'))
  })),

  withHandlers({
    loadResources: ({ setLoaded, setResources, CRUD }) => async ({ offset, limit }) => {
      setLoaded(false);
      const resources = await CRUD.getResourcesList({ offset, limit });
      setResources(resources);
    }
  }),

  withHandlers(({ deleteable }) => deleteable
    ? {
        deleteResource: ({ loadResources, showModal, CRUD, itemToString }) => item => showModal(
          ModalTypes.DIALOG,
          {
            title: `Удалить ${itemToString(item)} ?`,
            onApprove: async () => {
              await CRUD.deleteResource(item.id);
              loadResources(getSearchParams('offset', 'limit'));
            }
          }
        )
      }
    : {}
  )
)(ResourcesList);

SmartList.propTypes = {
  CRUD: PropTypes.object.isRequired,
  deleteable: PropTypes.bool,
  itemToString: PropTypes.func.isRequired,
  basePath: PropTypes.string.isRequired,
  ItemCard: PropTypes.func.isRequired
}

export default SmartList;