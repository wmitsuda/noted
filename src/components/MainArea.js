// @flow

import React, { Component } from 'react'
import styled from 'styled-components/native'
import { Editor } from 'react-draft-wysiwyg'
import {
  EditorState,
  ContentState,
  convertFromHTML,
  convertFromRaw,
  convertToRaw,
} from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import { type Note } from '../types'

import applyContext from '../hocs/Context'

import screenSize from '../hocs/ScreenSize'

type State = {
  editorState: EditorState,
}

type Props = {
  note: Note,
  notes: Array<Note>,
  update: (note: Note) => void,
  save: () => void,
  delete: () => void,
}

const Container = screenSize(styled.View`
  flex: 1;
  background-color: ${props => props.theme.gray};
  padding: ${props => props.theme.spacing};
`)

const EditorContainer = styled.View`
  padding-bottom: ${props => props.theme.spacing};
  background-color: ${props => props.theme.white};
  flex: 1;
`

const Title = styled.TextInput`
  font-size: 40px;
  padding-bottom: ${props => props.theme.spacing};
  color: ${props => props.theme.darkGray};
`

const ButtonContainer = styled.View`
  max-width: 130px;
  margin-bottom: 30px;
  flex-direction: row;
  justify-content: space-between;
`

const SaveButton = styled.Button`
  flex: 1;
`

const DeleteButton = styled.Button`
  flex: 1;
`

class MainArea extends Component<Props, State> {
  state: State = {
    editorState: EditorState.createWithContent(
      this.props.note.content
        ? ContentState.createFromBlockArray(
            this.props.note.content.getBlocksAsArray(),
          )
        : ContentState.createFromText('no content yet'),
    ),
  }

  onContentChange = newContent => {
    this.props.update({
      ...this.props.note,
      content: convertFromRaw(newContent),
    })
  }

  onTitleChange = newTitle => {
    this.props.update({ ...this.props.note, title: newTitle })
  }

  render() {
    console.log(
      this.props.note.content && this.props.note.content.getBlocksAsArray(),
    )
    return (
      <Container>
        <Title
          value={this.props.note.title ? this.props.note.title : 'untitled'}
          onChangeText={this.onTitleChange}
        />
        <ButtonContainer>
          <SaveButton onPress={this.props.save} title="Save" />
          <DeleteButton onPress={this.props.delete} title="Delete" />
        </ButtonContainer>
        <EditorContainer>
          <Editor
            defaultEditorState={this.state.editorState}
            onChange={newContent => this.onContentChange(newContent)}
          />
        </EditorContainer>
      </Container>
    )
  }
}

export default applyContext(MainArea)
