import styled, { css } from "styled-components";

const vertical = css`
  flex-direction: column;
  gap: 2rem;
`;

const horizontal = css`
  justify-content: space-between;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  ${(props) => props.type === "vertical" && vertical}
  ${(props) => props.type === "horizontal" && horizontal}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
