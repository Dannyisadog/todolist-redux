import { TodoItem } from "./constants";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodoItem, updateTodoTitle } from "src/app/store";
import EditIcon from '@mui/icons-material/Edit';
import { TextField } from '@mui/material';
import styled from "styled-components";
import CheckIcon from '@mui/icons-material/Check';
import Checkbox from '@mui/material/Checkbox';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useState } from "react";

interface styleProps {
  allFinish: boolean;
  isEdit: boolean;
}

const Container = styled.div<styleProps>`
  position: relative;
  width: 200px;
  height: 280px;
  border-radius: 8px;
  background: white;
  box-shadow: 2px 2px 10px #00000024;
  padding: 20px 20px;
  color: #333;
  transition: 0.3s;

  .finish-icon-wrapper {
    position: absolute;
    top: -15px;
    left: -15px;
    color: #62d7b4;
    transition: 0.2s;
    opacity: ${(props) => props.allFinish ? '100%' : '0'};
    transform: scale(1.2);
  }

  .close-icon-wrapper {
    position: absolute;
    right: -10px;
    top: -10px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.3s;
    opacity: 0;

    @media all and (max-width: 500px) {
      background: #ff6660;
      opacity: 100%;
    }

    :hover {
      background: #ff6660;
      opacity: 100%;
    }

    .close-icon {
      color: white;
    }
  }

  .title-container {
    display: flex;
    align-items: center;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      font-size: 1.2rem;
      font-weight: bold;
      min-width: 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .edit-icon-wrapper {
      transform: scale(0.8);
      margin-left: 8px;
      color: #444;
      cursor: pointer;
      width: 26px;
      height: 26px;
      transition: 0.3s;
      border-radius: 4px;
      display: ${(props) => props.isEdit ? 'none' : 'flex'};
      justify-content: center;
      align-items: center;
      
      :hover {
        background: #eee;
      }
    }

    .edit-container {
      display: flex;
      width: 100%;
      .update-button-wrapper {
        cursor: pointer;
        color: #0ec28c;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20px;
        margin-left: 10px;
        border-radius: 4px;
        width: 50px;
        transition: 0.3s;

        :hover {
          background: #eee;
        }
      }
    }
  }

  .items-container {
    width: 100%;
    margin-top: 12px;

    .todo-item {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
      :first-child {
        margin-top: 0;
      }

      .name.finish {
        text-decoration: line-through;
        color: #ccc;
      }
    }
  }
`;

interface TodoCardProps {
  index: number;
  title: string;
  items: TodoItem[];
}

const TodoCard = ({index, title, items}: TodoCardProps) => {
  const dispatch = useDispatch();
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const deleteTodoList = () => {
    dispatch(deleteTodo({
      index
    }));
  }
  const editCurrentTitle = (e) => {
    setCurrentTitle(e.target.value);
  }

  const updateTitle = () => {
    dispatch(updateTodoTitle({
      index,
      newTitle: currentTitle
    }));
    setIsEditTitle(false);
  }

  const toggleFinish = (e, name, index, key) => {
    const finish = e.target.checked;
    dispatch(updateTodoItem({
      newName: name,
      index,
      key,
      finish
    }));
  }

  const isAllFinish = () => {
    let allFinish = true;
    for (const key in items) {
      const item = items[key];
      if (item.name && !item.finish) {
        allFinish = false;
      }
    }
    return allFinish;
  }

  return (
    <Container allFinish={isAllFinish()} isEdit={isEditTitle} >
      { !isEditTitle && 
        <div className="close-icon-wrapper">
          <CloseIcon className="close-icon" fontSize="small" onClick={deleteTodoList} />
        </div>
      }
      <div className="finish-icon-wrapper">
        <CheckCircleOutlineIcon fontSize="large" />
      </div>
      <div className="title-container">
        <div className="title">
          {
            !isEditTitle && title
          }
          {
              isEditTitle && (
                <div className="edit-container">
                  <TextField
                    fullWidth
                    size="small"
                    value={currentTitle}
                    onChange={editCurrentTitle}
                    inputProps={{ style: { fontSize: '14px'}}}
                  />
                  <div className="update-button-wrapper" onClick={updateTitle}>
                    <CheckIcon fontSize="small" />
                  </div>
                </div>
              )
          }
        </div>
        <div className="edit-icon-wrapper">
          {!isEditTitle && <EditIcon fontSize="small" onClick={() => setIsEditTitle(true)} />}
        </div>
      </div>
      <div className="items-container">
        {
          Object.keys(items).map((key) => {
            const item = items[key];
            return (
              <div className="todo-item" key={key}>
                {
                  item.name &&
                  <>
                    <div className={`name ${item.finish && `finish`}`}>{item.name}</div>
                    <Checkbox 
                      checked={item.finish}
                      size="small"
                      style ={{
                        color: "#27A4FF",
                      }}
                      onChange={(e) => {
                        toggleFinish(e, item.name, index, key);
                      }}
                    />
                  </>
                }
              </div>
            )
          }
          )
        }
      </div>
    </Container>
  )
}

export default TodoCard;