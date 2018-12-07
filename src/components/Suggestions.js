import React from 'react'
import { FlatList } from 'react-native-web'
import styled from 'styled-components/native'

const SuggestionText = styled.Text`
  color: #a6a6a6;
  font-size: 14px;
  padding: 5px;
  cursor: pointer;
`

const Container = styled.View`
  background-color: #fff;
  border-radius: 5px;
`

const Suggestions = props => {
  return (
    <Container>
      <FlatList
        data={props.results}
        renderItem={({ item }) => (
          <SuggestionText onClick={() => props.update(item)}>
            {item.title}
          </SuggestionText>
        )}
      />
    </Container>
  )
}

export default Suggestions
