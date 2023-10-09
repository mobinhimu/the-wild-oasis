import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import SideBar from "./SideBar";
import Uploader from "../data/Uploader";

const StyledApp = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 22rem auto;
  grid-template-rows: auto 1fr;
`;

const Main = styled.main`
  padding: 3rem;
  background-color: var(--color-grey-50);
  overflow: auto;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  return (
    <StyledApp>
      <SideBar />
      <Header />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledApp>
  );
}

export default AppLayout;
