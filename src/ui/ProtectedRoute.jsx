import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Spinner from "./Spinner";

export const FullScreenLoader = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: var(--color-grey-0);
  align-items: center;
`;

// ${(props) =>
//   props.isDarkMode ? "var(--color-grey-0)" : "var(--color-grey-0)"}

function ProtectedRoute({ children }) {
  // 1. Load The Authenticated User
  const { isLoading, isAuthenticated } = useUser();
  const navigation = useNavigate();

  // 2. if there is not authenticated user , then redirect to the /login page
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigation("/login");
  }, [isAuthenticated, navigation, isLoading]);

  // 3. When Loading , Show A Spinner
  if (isLoading)
    return (
      <FullScreenLoader>
        <Spinner />
      </FullScreenLoader>
    );

  // 4. if there is a user render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
