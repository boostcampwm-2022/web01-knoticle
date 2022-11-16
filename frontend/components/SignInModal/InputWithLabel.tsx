import styled from 'styled-components';

import { TextSmall } from '../../styles/common';

const Wrapper = styled.div`
  /* flex-basis: 12px; */
  margin: 8px 0;
`;

const Label = styled(TextSmall)`
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  outline: none;
`;

interface InputWithLabelProps {
  title: string;
  type: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputWithLabel({
  title,
  type,
  placeholder,
  onChange,
}: InputWithLabelProps) {
  return (
    <Wrapper>
      <Label>{title}</Label>
      <Input type={type} placeholder={placeholder} onChange={onChange} />
    </Wrapper>
  );
}

InputWithLabel.defaultProps = {
  placeholder: '',
};
