import React from "react";
import styled from "@emotion/styled";
import { colors } from "@/styles/colors";
import Modal from "../base/Modal";
import { client } from "@/api/httpClient";
import { useRouter } from "next/router";

const Mention = styled.div`
  color: ${colors.gray2};
  text-align: center;
  margin: 30px 0;
  font-weight: 500;
  line-height: 150%;
`;

interface Props {
  onClose: () => void;
  id: number | undefined;
}

const Reception = ({ onClose, id }: Props) => {
  const router = useRouter();
  const pickup = client
    .patch(`/api/items/pickup/${id}`, {
      status: "pickup",
      pickupDate: new Date().toISOString().slice(0, 10),
    })
    .then(() => {
      onClose();
      alert("본인수령 완료되었습니다.");
      router.push("/");
    });
  return (
    <Modal
      onClick={() => pickup}
      crying={false}
      theme={"primary-gray1-theme"}
      gray1-white-theme
      buttonText="동의 후 수령 신청"
      onClose={onClose}
    >
      <Mention>
        본인의 분실물이 확실하신가요?
        <br />
        신청 후 별도의 본인 확인 과정이 있을 수 있습니다.
      </Mention>
    </Modal>
  );
};

export default Reception;
