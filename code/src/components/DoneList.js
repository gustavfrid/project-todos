import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import moment from 'moment'

import { todos } from '../reducers/todos'

const TodoSection = styled.section`
  padding: 0 10px;
`
const DoneItem = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgb(244, 244, 244);
  padding: 1.5rem 5px;
  box-sizing: border-box;
  background-color: rgb(244, 244, 244);
`
const TodoText = styled.p`
  margin: 0;
  flex-grow: 1;
  font-size: 1.5rem;
`
const Checkbox = styled.input`
  border-radius: 50%;
`
const Button = styled.button`
  margin: 5px;
  height: 4rem;
  width: 4rem;
  font-size: 1rem;
  text-align: center;
  border-radius: 10px;
  border: 0;
  color: black;
`
const Dates = styled.div`
  display: flex;
  flex-direction: column;
`

export const DoneList = () => {
  const items = useSelector(store => store.todos.items)
  const dispatch = useDispatch()

  const onToggleTodo = id => {
    dispatch(todos.actions.toggleTodo(id))
  }

  const onDeleteTodo = id => {
    dispatch(todos.actions.deleteTodo(id))
  }

  const onSelectItem = id => {
    dispatch(todos.actions.setSelectedItem(id))
  }

  return (
    <TodoSection>
      {items
        .filter(item => item.isComplete)
        .map(item => (
          <DoneItem key={item.id}>
            <Checkbox
              type='checkbox'
              checked={item.isComplete}
              onChange={() => onToggleTodo(item.id)}
            />
            <TodoText onClick={() => onSelectItem(item.id)}>{item.text}</TodoText>
            <Dates>
              <p>Created: {moment(item.createdAt).fromNow()}</p>
              {item.dueDate && <p>Due: {moment(item.dueDate).fromNow()}</p>}
            </Dates>
            <Button onClick={() => onDeleteTodo(item.id)}>x</Button>
          </DoneItem>
        ))}
    </TodoSection>
  )
}
