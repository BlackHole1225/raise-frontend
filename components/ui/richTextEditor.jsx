'use client';
import React, { useState, useCallback, useRef } from 'react';
import { Editor, EditorState, RichUtils, AtomicBlockUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { ChevronDown, Bold, Italic, Link, List, ListOrdered, Image } from 'lucide-react';

const BLOCK_TYPES = [
  { label: 'Paragraph', style: 'paragraph' },
  { label: 'Heading 1', style: 'header-one' },
  { label: 'Heading 2', style: 'header-two' }
];

const RichTextEditor = ({ placeholder }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [currentBlockType, setCurrentBlockType] = useState('paragraph');
  const editorRef = useRef(null);

  const handleEditorChange = (state) => {
    setEditorState(state);
    // Update current block type
    const selection = state.getSelection();
    const blockType = state.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
    setCurrentBlockType(blockType);
  };

  const handleKeyCommand = useCallback(
    (command, editorState) => {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        handleEditorChange(newState);
        return 'handled';
      }
      return 'not-handled';
    },
    [editorState]
  );

  const onStyleClick = (style) => {
    handleEditorChange(RichUtils.toggleInlineStyle(editorState, style));
  };

  const onBlockClick = (blockType) => {
    handleEditorChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const onBlockTypeChange = (event) => {
    const newBlockType = event.target.value;
    handleEditorChange(RichUtils.toggleBlockType(editorState, newBlockType));
  };

  const onLinkClick = () => {
    const selection = editorState.getSelection();
    const link = prompt('Enter a URL:');
    if (!link) {
      handleEditorChange(RichUtils.toggleLink(editorState, selection, null));
    } else {
      const content = editorState.getCurrentContent();
      const contentWithEntity = content.createEntity('LINK', 'MUTABLE', {
        url: link
      });
      const newEditorState = EditorState.push(editorState, contentWithEntity, 'create-entity');
      const entityKey = contentWithEntity.getLastCreatedEntityKey();
      handleEditorChange(RichUtils.toggleLink(newEditorState, selection, entityKey));
    }
  };

  const onImageClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target.result;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', { src });
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, {
          currentContent: contentStateWithEntity
        });
        handleEditorChange(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '));
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  const blockRendererFn = (contentBlock) => {
    if (contentBlock.getType() === 'atomic') {
      return {
        component: Media,
        editable: false
      };
    }
  };

  const Media = (props) => {
    const entity = props.contentState.getEntity(props.block.getEntityAt(0));
    const { src } = entity.getData();
    const type = entity.getType();

    if (type === 'IMAGE') {
      return <img src={src} alt="Uploaded content" className="max-w-full h-auto" />;
    }
  };

  return (
    <div className="border border-gray-300 rounded-md shadow-sm">
      <div className="flex items-center p-2 border-b border-gray-200 flex-wrap">
        <select
          className="mr-2 p-1 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={onBlockTypeChange}
          value={currentBlockType}
        >
          {BLOCK_TYPES.map((type) => (
            <option key={type.style} value={type.style}>
              {type.label}
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 text-gray-500 mr-2" />
        <button onClick={() => onStyleClick('BOLD')} className="p-1 rounded hover:bg-gray-100">
          <Bold className="w-4 h-4" />
        </button>
        <button onClick={() => onStyleClick('ITALIC')} className="p-1 rounded hover:bg-gray-100">
          <Italic className="w-4 h-4" />
        </button>
        <button onClick={onLinkClick} className="p-1 rounded hover:bg-gray-100">
          <Link className="w-4 h-4" />
        </button>
        <button
          onClick={() => onBlockClick('unordered-list-item')}
          className="p-1 rounded hover:bg-gray-100"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          onClick={() => onBlockClick('ordered-list-item')}
          className="p-1 rounded hover:bg-gray-100"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <button onClick={onImageClick} className="p-1 rounded hover:bg-gray-100">
          <Image className="w-4 h-4" alt="list" />
        </button>
      </div>
      <div className="p-4">
        <Editor
          ref={editorRef}
          editorState={editorState}
          onChange={handleEditorChange}
          handleKeyCommand={handleKeyCommand}
          placeholder={placeholder}
          blockRendererFn={blockRendererFn}
          className="min-h-[100px] focus:outline-none"
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
