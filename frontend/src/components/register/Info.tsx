import React from "react";
import medium from "../../../public/medium.svg";
import Image from "next/image";
import styled from "@emotion/styled";
import { colors } from "@/styles/colors";
interface Props {
  children: string;
}

const Container = styled.div`
  display: flex;
  width: 1200px;
  height: 104px;
  align-items: center;
  justify-content: space-evenly;
  background-color: ${colors.gray7};
  margin: auto;
`;

const Info = ({ children }: Props) => {
  return (
    <>
      <Container>
        <Image src={medium} alt="logo" width={40} height={40} />
        <p>{children}</p>
      </Container>
    </>
  );
};

export default Info;
