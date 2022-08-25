import AddIcon from '@mui/icons-material/Add';
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  right: 60px;
  bottom: 45px;
  width: 45px;
  height: 45px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  box-shadow: 3px 3px 10px #868686;
  background: #27A4FF;
  cursor: pointer;
  transition: 0.3s;

  :hover {
    background: #298ed6;
  }
`;

interface CreateButtonProps {
  setShowCreateModal: (show: boolean) => void
}

const CreateButton = ({setShowCreateModal}: CreateButtonProps) => {
  return (
    <Container onClick={() => setShowCreateModal(true)}>
      <AddIcon fontSize='medium' />
    </Container>
  );
}

export default CreateButton;