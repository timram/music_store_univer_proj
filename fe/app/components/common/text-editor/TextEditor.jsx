import React from 'react';
import { Editor, convertToRaw } from 'draft-js';
import StyleButton from './style-button';
import { convertToHTML } from 'draft-convert';
import Typography from '@material-ui/core/Typography';
import ErrorMessage from '../ErrorMessage';

const Controls = ({
  items,
  isItemActive,
  onToggle
}) =>
<div className="RichEditor-controls">
  {items.map((item) =>
    <StyleButton
      key={item.label}
      active={isItemActive(item)}
      label={item.label}
      onToggle={onToggle}
      style={item.style}
    />
  )}
</div>

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'}
];
const BlockStyleControls = (props) => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return <Controls
    {...props}
    items={BLOCK_TYPES}
    isItemActive={item => item.style === blockType}
  />;
};

var INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'},
];
const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  return <Controls
    {...props}
    items={INLINE_STYLES}
    isItemActive={item => currentStyle.has(item.style)}
  />;
};

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};
function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}

export default ({
  editorState,
  setEditorState,
  handleKeyCommand,
  mapKeyToEditorCommand,
  toggleInlineStyle,
  toggleBlockType,
  className,
  onChange,
  onFocus,
  label,
  field,
  form
}) =>
<div className="RichEditor-wrapper">
  <Typography variant="headline">
    {label}
  </Typography>
  <div
    className="RichEditor-root"
  >
    <BlockStyleControls
      editorState={editorState}
      onToggle={toggleBlockType}
    />
    <InlineStyleControls
      editorState={editorState}
      onToggle={toggleInlineStyle}
    />
    <div className={className}>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={handleKeyCommand}
        blockStyleFn={getBlockStyle}
        customStyleMap={styleMap}
        keyBindingFn={mapKeyToEditorCommand}
        spellCheck={true}
        onFocus={onFocus}
        onBlur={() => {
          const content = editorState.getCurrentContent();
          const rawContent = convertToRaw(content);
          const isTextExist = rawContent.blocks.find(({ text }) => text && text.length > 0);
          onChange(isTextExist ? convertToHTML(content) : '');
        }}
      />
    </div>
  </div>
  <ErrorMessage
    display-if={form.errors[field.name] && form.touched[field.name]}
    msg={form.errors[field.name]}
  />
</div>