import TextEditor from './TextEditor';
import { withState, withHandlers, compose, withProps } from 'recompose';
import { EditorState, RichUtils, getDefaultKeyBinding, ContentState, convertFromHTML } from 'draft-js';
import style from './style.scss';

const enhancer = compose(
  withState('editorState', 'setEditorState', ({ field }) => field.value.length > 0
    ? EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(field.value)))
    : EditorState.createEmpty()
  ),

  withHandlers({
    handleKeyCommand: ({ setEditorState }) => (command, editorState) => {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      newState && setEditorState(newState);
    },
    mapKeyToEditorCommand: ({ editorState, setEditorState }) => e => {
      if (e.keyCode === 9 /* TAB */) {
        const newEditorState = RichUtils.onTab(
          e,
          editorState,
          4, /* maxDepth */
        );
        if (newEditorState !== editorState) {
          setEditorState(newEditorState);
        }
        return;
      }
      return getDefaultKeyBinding(e);
    },
    toggleBlockType: ({ editorState, setEditorState }) => blockType => {
      setEditorState(
        RichUtils.toggleBlockType(
          editorState,
          blockType
        )
      );
    },
    toggleInlineStyle: ({ editorState, setEditorState }) => inlineStyle => {
      setEditorState(
        RichUtils.toggleInlineStyle(
          editorState,
          inlineStyle
        )
      );
    }
  }),

  withProps(({ editorState }) => {
    let className = 'RichEditor-editor';
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }
    return { className };
  })
);

export default enhancer(TextEditor); 