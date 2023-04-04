import { colors } from "@/styles/colors";
import styled from "@emotion/styled";
import Image from "next/image";
import { ProfilePhoto } from "../base/ProfilePhoto";
import cameraImg from "../../../public/icon_camera.svg";

interface DefaultInfoProps {
  email: string | undefined;
  checkMemberType: () => string;
  company: string | undefined;
  reward: number | undefined;
}

export const DefaultInfo = ({
  email,
  checkMemberType,
  company,
  reward,
}: DefaultInfoProps) => {
  return (
    <Container>
      <StyledText>이메일</StyledText>
      <EmailText>{email}</EmailText>
      <TextsGroup>
        <div>
          <Badge>{checkMemberType()}</Badge>
          <StyledText>{company}</StyledText>
        </div>
        <div>
          <Badge>리워드</Badge>
          <StyledText>{reward}</StyledText>
        </div>
      </TextsGroup>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmailText = styled.p`
  font-weight: 700;
  font-size: 21px;
  line-height: 25px;
  color: ${colors.gray1};
  margin: 4px 0 16px;
`;

const Badge = styled.span`
  padding: 4px 8px;
  margin-right: 12px;
  width: 67px;
  background: ${colors.primary1WithOpacity20};
  border: 1px solid ${colors.primary1};
  border-radius: 26px;
  font-weight: 600;
  font-size: 14px;
  color: ${colors.primary3};
`;

const StyledText = styled.span`
  font-weight: 600;
  font-size: 16px;
  color: ${colors.gray3};
`;

const TextsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
