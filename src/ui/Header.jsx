import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";
import DarkModeToggle from "./DarkModeToggle";

const StyledHeader = styled.header`
  padding: 2rem;
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 2.6rem;
`;

function Header() {
  return (
    <StyledHeader>
      <UserAvatar />
      <DarkModeToggle />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
