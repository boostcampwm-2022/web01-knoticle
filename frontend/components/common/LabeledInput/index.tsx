import { TextSmall } from '@styles/common';

import { Input, LabeledInputWrapper } from './styled';

interface LabeledInputProps {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function LabeledInput({ label, type, name, placeholder, onChange }: LabeledInputProps) {
  return (
    <LabeledInputWrapper>
      <TextSmall>{label}</TextSmall>
      <Input type={type} name={name} placeholder={placeholder} onChange={onChange} />
    </LabeledInputWrapper>
  );
}

export default LabeledInput;

LabeledInput.defaultProps = {
  placeholder: '',
};
