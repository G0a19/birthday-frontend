import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { convertFromHTML, ContentState, convertToRaw } from "draft-js";
import { EditorState } from "draft-js";

const Textwithcontent = (props) => {
  const blocksFromHTML = convertFromHTML(`${props.text}`);
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );

  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(state)
  );

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    props.updateDescription(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
  };

  useEffect(() => {
    props.updateDescription(props.text);
  }, [props]);

  return (
    <Editor
      toolbarClassName="toolbarClassName"
      wrapperClassName="ChannelDesscription"
      editorClassName="editorClassName"
      editorState={editorState}
      defaultEditorState={editorState}
      onEditorStateChange={onEditorStateChange}
    />
  );
};

export default Textwithcontent;
