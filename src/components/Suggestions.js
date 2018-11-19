import React from 'react'
import { FlatList, Text } from 'react-native-web'
import styled from 'styled-components/native'

const SuggestionText = styled.Text`
  color: ${props => props.theme.blue};
  font-size: 14px;
  padding: 5px;
  cursor: pointer;
`

const Container = styled.View`
  background-color: #fff;
  border-radius: 5px;
  opacity: 0.7;
`

const Suggestions = props => {
  const myArray = [
    { key: 1, title: 'hi' },
    { key: 2, title: 'bonjour' },
    { key: 3, title: 'hola' },
  ]
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
