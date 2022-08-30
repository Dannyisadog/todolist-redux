import styled from "styled-components";
import { TodoItem } from "../shared/TodoCard/constants";
import Header from "src/components/shared/Header";
import CreateButton from "src/components/shared/CreateButton";
import CreateModal from "src/components/shared/Modal/CreateModal";
import { useSelector } from "react-redux";
import TodoCard from "src/components/shared/TodoCard";
import { useState } from "react";

const Container = styled.div`
  position: relative;

  .todo-content {
    padding: 100px 100px 80px 100px;
    display: grid;
    grid-gap: 40px;
    justify-content: center;
    grid-template-columns: repeat(auto-fill, 240px);
  }
`;

interface TodoListState {
  todoList: [];
}

const TodoList = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const todoList = useSelector((state: TodoListState ) => state.todoList);
  return (
    <Container>
      <Header />
      <div className="todo-content">
        {
          todoList.map((todoItem: {title: string, items: TodoItem[]}, index) => {
            return (
              <TodoCard key={index} index={index} title={todoItem.title} items={todoItem.items} />
            )            
          })
        }
      </div>
      <CreateButton setShowCreateModal={setShowCreateModal} />
      <CreateModal show={showCreateModal} setShow={setShowCreateModal} />
    </Container>
  );
}

export default TodoList;