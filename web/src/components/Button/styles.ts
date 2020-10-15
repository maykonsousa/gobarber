import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #fe9000;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  width: 100%;
  height: 56px;
  margin-top: 16px;
  color: #312e38;
  font-weight: 500;
  transition: background-color 0.2s;
  &:hover {
    background-color: ${shade(0.2, '#fe9000')};
  }
`;
