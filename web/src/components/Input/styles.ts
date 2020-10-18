import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isField: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;

  border: 2px solid #232129;
  color: #666360;

  & + div {
    margin-top: 10px;
  }

  ${props =>
    props.isField &&
    css`
      color: #fe9000;
    `}

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

    ${props =>
    props.isFocused &&
    css`
      border-color: #fe9000;
      color: #fe9000;
    `}
  input {
    color: #f4ede8;
    background: transparent;
    flex: 1;
    border: 0;
    & ::placeholder {
      color: #666360;
    }
  }
  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }
  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
