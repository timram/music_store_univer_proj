import Sorting from './sorting';
import { withProps, withHandlers, withState, compose } from 'recompose';
import { withInstruments } from '../../../providers/instruments';
import { sorting } from '../../../config';

export default compose(
  withInstruments,
  
  withProps(({ instruments: { sort } }) => ({
    selected: sorting.options.find(({ field, order }) => field === sort.field && order === sort.order),
    options: sorting.options.filter(({ field, order }) => field !== sort.field
      ? true
      : order !== sort.order
    )
  })),

  withState('opened', 'setOpened', false),

  withHandlers({
    applySorting: ({ instruments, setOpened }) => ({ field, order }) => {
      setOpened(false);
      return instruments.loadInstruments({ sort: { field, order } });
    }
  }),
)(Sorting);