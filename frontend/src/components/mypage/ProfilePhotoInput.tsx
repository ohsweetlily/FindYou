import { colors } from "@/styles/colors";
import styled from "@emotion/styled";
import Image from "next/image";
import { ProfilePhoto } from "../base/ProfilePhoto";
import cameraImg from "../../../public/icon_camera.svg";
import { ChangeEvent } from "react";

interface ProfilePhotoInputProps {
  imageUrl: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const ProfilePhotoInput = ({
  imageUrl,
  onChange,
}: ProfilePhotoInputProps) => {
  return (
    <>
      <InputContainer>
        <FileInput type="file" onChange={onChange} />
        <PhotoContainer>
          <CameraBadge>
            <Image src={cameraImg} alt="사진등록" />
          </CameraBadge>
          <ProfilePhoto src={imageUrl} />
        </PhotoContainer>
      </InputContainer>
    </>
  );
};

const InputContainer = styled.div`
  width: 120px;
  height: 120px;

  position: relative;
`;

const FileInput = styled.input`
  width: 120px;
  height: 120px;
  background-color: salmon;
  position: relative;
  z-index: 1;
  opacity: 0;
  cursor: pointer;
`;

const PhotoContainer = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
`;

const CameraBadge = styled.div`
  width: 32px;
  height: 32px;
  background: ${colors.gray4};
  border: 3px solid ${colors.white};
  border-radius: 32px;
  position: absolute;
  right: 0px;
  bottom: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
