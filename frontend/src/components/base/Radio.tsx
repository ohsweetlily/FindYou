import { colors } from "@/styles/colors";
import styled from "@emotion/styled";
import { ChangeEvent } from "react";

interface RadioProps {
  text: string;
  value: number;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}

export const Radio = ({ text, value, name, checked, onChange }: RadioProps) => {
  return (
    <StyledRadio>
      <StyledInput
        type="radio"
        id={text}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <StyledLabel htmlFor={text}></StyledLabel>
      <StyledP htmlFor={text}>{text}</StyledP>
    </StyledRadio>
  );
};

const StyledRadio = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  user-select: none;
  cursor: pointer;
`;

const StyledLabel = styled.label`
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  border: 1px solid ${colors.gray5};
  background-color: ${colors.white};
`;

const StyledInput = styled.input`
  opacity: 0;
  z-index: 1;
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin-right: 7px;

  &:checked + ${StyledRadio} {
    background-color: ${colors.primary1};
    border: 1px solid ${colors.primary2};
  }

  &:checked + ${StyledLabel} {
    background-color: ${colors.primary1};
    border: 1px solid ${colors.primary2};
    &::after {
      color: ${colors.gray1};
      content: "●";
      font-size: 2pt;
      width: 6px;
      height: 6px;
      margin: 2px 0 0 5px;
    }
  }
`;

const StyledP = styled.label`
  width: 80px;
  color: ${colors.gray3};
  cursor: pointer;
`;
