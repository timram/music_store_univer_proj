import FilterBar from './filter-bar';
import { withInstruments } from '../../../../providers/instruments';
import { compose, withProps, withHandlers, withState } from 'recompose';
import PropTypes from 'prop-types';


const SmartFilterBar = compose(
  withInstruments, 

  withProps(({ instruments, name }) => {
    const items = instruments.aggs[name].filter(i => i.count > 0);
    const selectedItems = instruments.filters[name] || [];
    return items.reduce(({ selected, notSelected }, item) => selectedItems.includes(item.name)
      ? { selected: [...selected, item], notSelected }
      : { selected, notSelected: [...notSelected, item] },
      { selected: [], notSelected: [] }
    )
  }), 

  withHandlers({
    onClick: ({ instruments, name }) => item => {
      const selectedItems = instruments.filters[name] || [];
      const updItems = selectedItems.includes(item.name)
        ? selectedItems.filter(i => i !== item.name)
        : [...selectedItems, item.name];

      return instruments.loadInstruments({
        [name]: updItems
      });
    }
  }) ,

  withState('opened', 'setOpened', true)
)(FilterBar);

SmartFilterBar.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default SmartFilterBar;