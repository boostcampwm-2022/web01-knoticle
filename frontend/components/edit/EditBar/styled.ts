import styled from 'styled-components';

export const Bar = styled.div`
  padding: 16px 50px;
  background-color: var(--light-yellow-color);
  border-bottom: 1px solid var(--title-active-color);
  display: flex;
  justify-content: space-between;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 10px;
`;

export const ExitButton = styled(Button)`
  color: var(--title-active-color);
  background-color: var(--light-orange-color);
  border: 1px solid var(--grey-01-color);
`;

export const TemporaryButton = styled(Button)`
  color: var(--title-active-color);
  background-color: transparent;
  border: 1px solid var(--grey-01-color);
`;

export const PublishButton = styled(Button)`
  color: var(--white-color);
  background-color: var(--primary-color);
  border: 1px solid #8f4c26;
`;
