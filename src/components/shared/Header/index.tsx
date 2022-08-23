import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 40px;
  background: #27A4FF;
  display: flex;
  justify-content: center;
  align-items: center;

  #title {
    font-size: 22px;
    color: white;
  }
`;

const Header = () => {
  return (
    <Container>
      <div id="title">Todo List</div>
    </Container>
  );
}

export default Header;