import styled from "styled-components";
import { TextField } from '@mui/material';
import { useDispatch } from "react-redux";
import { addTodo } from "src/app/store";
import { useEffect, useMemo, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useCallback } from "react";

interface styleProps {
  show: boolean;
}

const Container = styled.div<styleProps>`
  display: flex;
  visibility: ${(props) => props.show ? 'visible' : 'hidden'};
  transition: 0.3s;
  opacity: ${(props) => props.show ? '100%' : '0'};
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #0000006c;
  justify-content: center;
  align-items: center;

  .modal {
    width: 400px;
    height: 500px;
    background: white;
    border-radius: 8px;
    position: relative;

    .title-container {
      position: relative;

      .title {
        height: 42px;
        width: 100%;
        border-bottom: 1px solid #cccccc;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #333;
      }

      .close-icon-wrapper {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        position: absolute;
        top: 8px;
        right: 12px;
        transition: 0.3s;
        display: flex;
        justify-content: center;
        align-items: center;

        :hover {
          background: #eeeeee;
        }

        .close-icon {
          color: #666;
          cursor: pointer;
        }
      }
    }

    .content {
      width: 90%;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .title-container, .items-container {
        width: 100%;

        #title-input {
          width: 100%;
        }
      }

      .items-container {
        margin-top: 40px;

        .item-input {
          margin-top: 15px;
        }
      
        .item-input:first {
          margin-top: 0;
        }
      }
    }

    .footer {
      width: 100%;
      height: 42px;
      position: absolute;
      bottom: 0;
      left: 0;
      display: flex;

      .action-button {
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: 0.3s;
      }
      .cancel-button {
        color: #ff7777;
        border-bottom-left-radius: 8px;
        :hover {
          background: #ff7777;
          color: white;
        }
      }
      .create-button {
        border-bottom-right-radius: 8px;
        color: #27A4FF;
        :hover {
          background: #27A4FF;
          color: white;
        }
      }
    }
  }
`;

interface CreateModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const CreateModal = ({show, setShow}: CreateModalProps) => {
  const defaultItems = useMemo(() => {
    return {
      1: {
        name: "",
        finish: false
      },
      2: {
        name: "",
        finish: false
      },
      3: {
        name: "",
        finish: false
      },
      4: {
        name: "",
        finish: false
      },
      5: {
        name: "",
        finish: false
      },
    }
  }, []);
  
  const [title, setTitle] = useState('');
  const [items, setItems] = useState(defaultItems);

  const reset = useCallback(() => {
    setTitle('');
    setItems(defaultItems);
  }, [defaultItems]);

  const dispatch = useDispatch();

  const updateTitle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  }

  const updateItems = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: string) => {
    const value =  e.target.value;
    setItems(prevState => {
      prevState[id] = {
        name: value,
        finish: false
      };
      return {...prevState};
    });
  }

  const keyPress = useCallback((e) => {
    if (e.key === 'Escape' && show) {
      console.log("close");
      setShow(false);
    }
  }, [setShow, show]);

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  useEffect(() => {
    if (!show) {
      reset();
    }
  }, [show, reset]);

  const create = () => {
    const data = {
      title,
      items
    }
    dispatch(addTodo(data));
    setShow(false);
  }

  return (
    <Container show={show}>
      <div className="modal">
        <div className="title-container">
          <div className="title">Create</div>
          <div className="close-icon-wrapper">
            <CloseIcon className="close-icon" fontSize="small" onClick={() => setShow(false)} />
          </div>
        </div>
        <div className="content">
          <div className="title-container">
            <TextField
              id="title-input"
              required
              label="title"
              fullWidth
              size="small"
              onChange={updateTitle}
              value={title}
            />
          </div>
          <div className="items-container">
            {
              Object.keys(items).map((id) => {
                const item = items[id];
                return (
                  <TextField 
                    key={id}
                    fullWidth
                    className="item-input"
                    label="create item"
                    size="small"
                    value={item.name}
                    onChange={(e) => {
                      updateItems(e, id);
                    }}
                  />
                );
              })
            }
          </div>
        </div>
        <div className="footer">
          <div className="action-button cancel-button" onClick={() => setShow(false)}>cancel</div>
          <div className="action-button create-button" onClick={create}>create</div>
        </div>
      </div>
    </Container>
  );
}

export default CreateModal;