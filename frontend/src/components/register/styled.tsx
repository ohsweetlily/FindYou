import styled from "@emotion/styled";
import { colors } from "@/styles/colors";

export const Container = styled.div`
  width: 1300px;
  justify-content: center;
  margin: auto;
`;

export const Bar = styled.div`
  width: 1200px;
  border: 1px solid ${colors.gray5};
  margin: 40px auto;
`;

export const Title = styled.h1`
  width: 250px;
  margin: 40px auto;
  font-size: 40px;
  font-weight: 700;
`;

export const Label = styled.label`
  display: inline-block;
  width: 120px;
  font-weight: 700;
  font-size: 16px;
  color: ${colors.gray3};
  vertical-align: center;
`;

export const RequiredLabel = styled(Label)`
  ::after {
    content: "*";
    color: red;
  }
`;

export const TextAreaLabel = styled(RequiredLabel)`
  vertical-align: top;
  margin-top: 12px;
`;

export const Input = styled.input`
  width: 1036px;
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

export const FileInput = styled(Input)`
  padding-top: 12px;
  ::file-selector-button {
    display: inline-block;
    width: 78px;
    height: 32px;
    background: ${colors.gray6};
    border: 1px solid ${colors.gray5};
    border-radius: 8px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 600px;
  }
`;

export const InputDate = styled(Input)`
  width: 200px;
`;

export const Select = styled.select`
  width: 200px;
  height: 56px;
  background-color: ${colors.white};
  border: 1px solid ${colors.gray5};
  border-radius: 8px;
  padding: 0 24px;
`;

export const TextArea = styled.textarea`
  width: 1036px;
  height: 200px;
  font-size: 16px;
  color: ${colors.gray1};
  padding: 0 24px;
  background-color: ${colors.white};
  border: 1px solid ${colors.gray5};
  border-radius: 8px;
  ::placeholder {
    color: ${colors.gray4};
  }
  resize: none;
`;

export const PlaceholderOption = styled.option`
  display: none;
  color: ${colors.gray4};
`;

export const InputContainer = styled.div`
  width: 1200px;
  margin: 20px auto;
`;

const Button = styled.button`
  width: 76px;
  height: 56px;
  text-align: center;
  color: ${colors.gray1};
  border-radius: 8px;
  margin: 4px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
`;
export const RegisterButton = styled(Button)`
  background-color: ${colors.primary1};
  border: 1px solid ${colors.primary2};
`;

export const CancelButton = styled(Button)`
  background-color: ${colors.gray6};
  border: 1px solid ${colors.gray5};
`;

export const ButtonContainer = styled.div`
  width: 200px;
  margin: auto;
`;
