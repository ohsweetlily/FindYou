import { colors } from "@/styles/colors";
import styled from "@emotion/styled";
import CheckIcon from "../../../public/icon_checkbox.svg";

interface CheckBoxProps extends StyledInputProps {
  text: string;
  onChange: () => void;
}

interface StyledInputProps {
  checked: boolean;
}

export const CheckBox = ({ text, checked, onChange }: CheckBoxProps) => {
  return (
    <>
      <StyledInput
        type="checkbox"
        id={text}
        name={text}
        onChange={onChange}
        checked={checked}
      />
      <StyledLabel htmlFor={text}>
        <StyledP>{text}</StyledP>
      </StyledLabel>
    </>
  );
};

const StyledLabel = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;

  &:before {
    display: block;
    content: "";
    height: 20px;
    width: 20px;
    background-color: ${colors.white};
    border: 1px solid ${colors.gray5};
    border-radius: 4px;
  }

  &:after {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    display: block;
    opacity: 0;
    content: "";
    height: 20px;
    width: 20px;
    border: 1px solid transparent;
    border-radius: 4px;
    background-image: url(${CheckIcon.src});
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: ${colors.primary1};
    border: 1px solid ${colors.primary2};
  }
`;

const StyledInput = styled.input<StyledInputProps>`
  position: absolute;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  white-space: nowrap;
  width: 1px;

  &:checked + ${StyledLabel} {
    :after {
      opacity: ${({ checked }) => (checked ? "1" : "0")};
    }
  }
  &:checked + ${StyledLabel} p {
    :after {
      opacity: ${({ checked }) => (checked ? "1" : "0")};
    }
  }
`;

const StyledP = styled.p`
  margin-left: 12px;
  width: 80px;
  color: ${colors.gray3};
`;
