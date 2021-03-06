import React from 'react'
import styled, { css } from 'styled-components/native'
import { type Note, type Folder as FolderType } from '../types'
import screenSize from '../hocs/ScreenSize'

const FolderContainer = styled.View`
  display: inline;
  padding: 0 5px;
`

const FolderText = screenSize(styled.TextInput`
  color: ${props => props.theme.mediumGray};
  font-size: 15px;
  margin-bottom: 5px;
  margin-top: 10px;
  cursor: pointer;
  padding-left: 10px;
  ${props =>
    props.isOpen &&
    css`
      border-left: 9px solid ${props => props.theme.yellow};
      margin-left: -9px;
      font-weight: bold;
      color: ${props => props.theme.black};
    `}
  ${props =>
    props.screenWidth <= 900 &&
    props.isOpen &&
    css`
      border-left: 5px solid ${props => props.theme.yellow};
      margin-left: -5px;
      padding-left: 6px;
    `};
`)

type Props = {
  folderID: string,
  folder: FolderType,
  isOpen: boolean,
  isBeingEdited: boolean,
  handleClick: Note => void,
  handleDoubleClick: () => void,
  onDragOver?: Event => void,
  onDrop?: (Event, FolderType) => void,
  archive?: Event => void,
  onChangeText?: string => void,
  onSubmitEditing?: () => void,
}

const Folder = (props: Props) => {
  return (
    <FolderContainer>
      <FolderText
        isOpen={props.isOpen}
        draggable={props.folderDraggable}
        editable={props.isBeingEdited}
        defaultValue={props.folder.name}
        onDoubleClick={props.handleDoubleClick}
        onClick={() => props.handleClick(props.folderID)}
        onDragOver={props.onDragOver && (e => props.onDragOver(e))}
        onDrop={
          props.archive
            ? e => props.archive(e)
            : props.onDrop &&
              (e =>
                props.onDrop(e, {
                  name: props.folder.name,
                  type: props.folder.type,
                }))
        }
        onChangeText={props.onChangeText && (text => props.onChangeText(text))}
        onSubmitEditing={props.onSubmitEditing && props.onSubmitEditing}
      />
    </FolderContainer>
  )
}

export default Folder
