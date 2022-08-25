import { configureStore, createAction } from '@reduxjs/toolkit'
import {
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO_TITLE,
  UPDATE_TODO_ITEM
} from './actions';

const defaultState = {
  todoList: []
};

const initialState = JSON.parse(localStorage.getItem('todoList')) || defaultState;

const todoListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      const todoItem = action.payload;
      return { 
        ...state,
        todoList: [...state.todoList, todoItem]
      }
    case DELETE_TODO:
      const {index: deleteIndex} = action.payload;
      return { 
        ...state,
        todoList: state.todoList.filter((_, index) => {
          return deleteIndex !== index;
        })
      }
    case UPDATE_TODO_TITLE:
      const {index: updateIndex, newTitle} = action.payload;

      return {
        ...state,
        todoList: state.todoList.map(
          (todo, i) => i === updateIndex ? {...todo, title: newTitle} : todo
        )
      }
    case UPDATE_TODO_ITEM:
      const {index, key: updateKey, newName: name, finish} = action.payload;

      return Object.assign({}, state, {
        todoList: state.todoList.map((todo, i) => {
          return Object.assign({}, todo, {
            items: Object.keys(todo.items).map(key => {
              return i === index && key === updateKey ? {...todo.items[key], finish} : todo.items[key];
            })
          })
        })
      });
    default:
      return state;
  }
}

const store = configureStore({
  reducer: todoListReducer
})

store.subscribe(() => {
  localStorage.setItem('todoList', JSON.stringify(store.getState()));
});

export const addTodo = createAction(ADD_TODO, (payload) => {
  return {
    payload
  }
});

export const deleteTodo = createAction(DELETE_TODO, (payload) => {
  return {
    payload
  }
});

export const updateTodoTitle = createAction(UPDATE_TODO_TITLE, (payload) => {
  return {
    payload
  }
})

export const updateTodoItem = createAction(UPDATE_TODO_ITEM, (payload) => {
  return {
    payload
  }
});

export default store;