import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 50px;
  background: #27A4FF;
  display: flex;
  padding-left: 60px;
  align-items: center;
  z-index: 1;

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