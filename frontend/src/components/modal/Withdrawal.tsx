import React, { MouseEventHandler } from "react";
import styled from "@emotion/styled";
import { colors } from "@/styles/colors";
import Modal from "../base/Modal";

const Mention = styled.div`
  color: ${colors.gray2};
  text-align: center;
  margin: 30px 0;
  font-weight: 500;
  line-height: 150%;
`;

const Reword = styled.div`
  color: ${colors.gray1};
  font-size: 19px;
  font-weight: 600;
  margin-bottom: 20px;
`;

interface Props {
  onClose: () => void;
  // onClick: MouseEventHandler<HTMLButtonElement>;
  onClick: () => Promise<void>;
  reward: number | undefined;
}

const Withdrawal = ({ onClose, onClick, reward }: Props) => {
  return (
    <Modal
      crying={true}
      theme={"gray1-white-theme"}
      buttonText="동의 후 탈퇴"
      onClose={onClose}
      onClick={onClick}
    >
      <Mention>
        정말 탈퇴하시겠습니까? <br /> 적립된 리워드가 소멸됩니다.
      </Mention>
      <Reword>내 리워드 {reward}</Reword>
    </Modal>
  );
};

export default Withdrawal;
