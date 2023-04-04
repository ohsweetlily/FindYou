import { colors } from "@/styles/colors";
import styled from "@emotion/styled";
import { ChangeEvent, ReactNode } from "react";

// component의 colors는 자동으로 지정이 되어있어서 타입지정을 안해도 된다네!

interface InputProps {
  name: string;
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isError: boolean;
  ErrorMessage: string;
  placeholder: string;
  type: string;
}

interface SelectProps {
  name: string;
  id: string;
  value: string;
  // onSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  children: ReactNode;
  isError: boolean;
  ErrorMessage: string;
  type: string;
}

function getValidationColor(isError: boolean, value: string) {
  // 유효하지 않은 값
  if (isError) {
    return colors.systemError;
  }
  // 빈 값
  if (value.length === 0) {
    return colors.gray5;
  }
  // 유효한 값
  return colors.systemSuccess;
}

export const ValidationInput = ({
  isError,
  name,
  id,
  onChange,
  value,
  placeholder,
  ErrorMessage,
  type,
}: InputProps) => {
  return (
    <>
      <StyledInput
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        color={getValidationColor(isError, value)}
        placeholder={placeholder}
        type={type}
      />
      <Message color={getValidationColor(isError, value)}>
        {isError && ErrorMessage}
      </Message>
    </>
  );
};

export const ValidationSelect = ({
  isError,
  name,
  id,
  onChange,
  children,
  value,
  ErrorMessage,
  type,
}: SelectProps) => {
  return (
    <>
      <StyledSelect
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        color={getValidationColor(isError, value)}
      >
        {children}
      </StyledSelect>
      <Message color={getValidationColor(isError, value)}>
        {isError && ErrorMessage}
      </Message>
    </>
  );
};

const StyledInput = styled.input`
  width: 100%;
  height: 56px;
  font-size: 16px;
  color: ${colors.gray1};
  padding: 0 24px;
  background-color: ${colors.white};
  border: 1px solid ${({ color }) => color};
  border-radius: 8px;

  ::placeholder {
    color: ${colors.gray4};
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  height: 56px;
  font-size: 16px;
  color: ${colors.gray1};
  padding: 0 24px;
  background-color: ${colors.white};
  border: 1px solid ${({ color }) => color};
  border-radius: 8px;
  cursor: pointer;
  option[value=""][disabled] {
    color: ${colors.gray4};
    display: none;
  }
`;

const Message = styled.p`
  font-size: 14px;
  color: ${({ color }) => color};
  height: 16px;
  margin-top: 4px;
`;
