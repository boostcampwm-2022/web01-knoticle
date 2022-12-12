import styled from 'styled-components';

export const LabeledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Input = styled.input`
  padding: 16px;
  width: 100%;
  box-sizing: border-box;
  font-size: 16px;
  border: 1px solid var(--grey-02-color);
  border-radius: 10px;

  @media ${(props) => props.theme.mobile} {
    ::placeholder {
      font-size: 12px;
    }
  }
`;
