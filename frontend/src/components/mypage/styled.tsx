import styled from "@emotion/styled";
import { colors } from "@/styles/colors";

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 32px;
  margin-bottom: 48px;
  background-color: ${colors.gray7};
  border-radius: 8px;
`;

export const InputGroup = styled.div`
  margin-bottom: 16px;
`;

export const ButtonsContainer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
  gap: 8px;
`;

export const DivisionLine = styled.div`
  border-bottom: 1px solid ${colors.gray5};
  margin: 64px 0;
`;

export const ConfirmWithdrawal = styled.div`
  margin-bottom: 32px;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: ${colors.gray3};

  h6 {
    color: ${colors.gray1};
    font-weight: 700;
    margin-bottom: 16px;
  }
`;
