import { colors } from "@/styles/colors";
import styled from "@emotion/styled";
import Image from "next/image";
import defaultProfile from "../../../public/profile.svg";

interface ProfilePhotoProps {
  src: string;
}

export const ProfilePhoto = ({ src }: ProfilePhotoProps) => {
  return (
    <HiddenContainer>
      <Image src={src} alt="프로필" width="120" height="120" />
      {/* `${IMAGE_URL}/${src}` */}
    </HiddenContainer>
  );
};

const HiddenContainer = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 120px;
  overflow: hidden;
`;
