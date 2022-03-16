import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { convertFromHTML, ContentState, convertToRaw } from "draft-js";
import { EditorState } from "draft-js";

export default class EditDescriptionModal extends React.Component {
  constructor(props) {
    const text = props.text ? props.text : false;
    super(props);
    this.state = {
      editorContent: text ? text : this._getInitialHTML(),
    };
  }

  _getInitialHTML() {
    const contentBlocks = convertFromHTML("<p>Hello world</p>");
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    return convertToRaw(contentState);
  }

  onEditorChange(editorContent) {
    this.setState({ editorContent });
    this.props.updateDescription(draftToHtml(editorContent));
  }

  render() {
    const { editorContent } = this.state;
    return (
      <Editor
        rawContentState={this.state.editorContent}
        toolbarClassName="demo-toolbar"
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onChange={this.onEditorChange.bind(this)}
        toolbarAlwaysVisible
      />
    );
  }
}
