import React from 'react';

export default ({ selected, options, applySorting, opened, setOpened }) =>
<div className="btn-group">
  <button
    type="button" className="btn btn-danger dropdown-toggle" aria-haspopup="true" aria-expanded="false"
    onClick={() => setOpened(!opened)}
  >
    {selected.label}
  </button>
  <div
    className="dropdown-menu"
    style={{
      display: opened ? 'block' : 'none'
    }}
  >
    {options.map((opt, i) =>
      <a
        className="dropdown-item"
        key={i}
        onClick={() => applySorting(opt)}
      >
        {opt.label}
      </a>  
    )}
  </div>
</div>