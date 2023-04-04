import { colors } from "@/styles/colors";
import styled from "@emotion/styled";
import { ChangeEvent, forwardRef } from "react";

interface InputProps {
  name: string;
  id: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: string;
}

// forwardRef : 자식에게 물려주는 useRef
export const Input = forwardRef(
  (
    { name, id, value, onChange, placeholder, type }: InputProps,
    ref: React.LegacyRef<HTMLInputElement>
  ) => {
    return (
      <StyledInput
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        ref={ref}
      />
    );
  }
);

Input.displayName = "Input";

const StyledInput = styled.input`
  width: 100%;
  height: 56px;
  font-size: 16px;
  color: ${colors.gray1};
  padding: 0 24px;
  background-color: ${colors.white};
  border: 1px solid ${colors.gray5};
  border-radius: 8px;
  ::placeholder {
    color: ${colors.gray4};
  }
`;
