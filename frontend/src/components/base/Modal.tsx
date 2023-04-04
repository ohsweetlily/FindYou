import React, { MouseEventHandler, ReactNode } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { colors, ButtonTheme } from "@/styles/colors";
import { FixedSizeButton } from "./FixedSizeButton";
import Close from "../../../public/close.svg";
import CryingIcon from "../../../public/crying_icon_in_modal.svg";
import Icon from "../../../public/icon_in_modal.svg";
import Image from "next/image";
import { useRouter } from "next/router";

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0% 0% 0% / 0.3);
  z-index: 2;
`;

const ImageWrapper = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;
`;

const Container = styled.div`
  position: fixed;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: auto;
  background-color: ${colors.white};
  border-radius: 8px;
  border: 1px solid black;
  text-align: center;
  padding-top: 40px;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const ModalPortal = ({ children }: { children: ReactNode }) => {
  const existingContainerDiv = document.querySelector(`#modal-container`);

  return createPortal(children, existingContainerDiv as Element);
};

interface Props {
  crying: boolean;
  theme: ButtonTheme;
  children: ReactNode;
  buttonText: string;
  onClose: () => void;
  // onClick: MouseEventHandler<HTMLButtonElement>;
  onClick: () => Promise<any>;
}

const Modal = ({
  crying,
  theme,
  children,
  buttonText,
  onClose,
  onClick,
}: Props) => {
  const router = useRouter();
  return (
    <ModalPortal>
      <Background onClick={() => onClose()}>
        <Container onClick={(e) => e.stopPropagation()}>
          <ImageWrapper onClick={() => onClose()}>
            <Image src={Close} alt="cancel" />
          </ImageWrapper>
          {crying ? (
            <Image src={CryingIcon} alt="crying icon" />
          ) : (
            <Image src={Icon} alt="icon" />
          )}
          {children}
          <ButtonContainer>
            <FixedSizeButton
              theme="gray6-gray1-theme"
              onClick={() => onClose()}
            >
              취소
            </FixedSizeButton>
            <FixedSizeButton theme={theme} onClick={onClick}>
              {buttonText}
            </FixedSizeButton>
          </ButtonContainer>
        </Container>
      </Background>
    </ModalPortal>
  );
};

export default Modal;
