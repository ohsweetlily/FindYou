import { IMAGE_URL } from "@/config/constants";
import { colors } from "@/styles/colors";
import styled from "@emotion/styled";
import Image from "next/image";

interface Props {
  title: string;
  data: string | undefined;
  image?: string | undefined;
  desc: boolean;
}

const Container = styled.div<{ image: string | undefined; desc: boolean }>`
  height: ${(props) => (props.desc ? "150px" : props.image ? "260px" : "72px")};
  border-bottom: 1px solid ${colors.gray5};
  &:first-child {
    border-top: 1px solid ${colors.gray5};
  }
`;

const Title = styled.h2<{ image: string | undefined }>`
  display: inline-block;
  color: ${colors.gray2};
  font-weight: 700;
  width: 120px;
  line-height: ${(props) => (props.image ? "260px" : "72px")};
  vertical-align: ${(props) => props.image && "top"};
`;
const Data = styled.span<{ desc: boolean }>`
  color: ${colors.gray3};
  font-weight: 500;
  display: ${(props) => (props.desc ? "inline-block" : "inline")};
  width: ${(props) => (props.desc ? "900px" : "auto")};
  margin-top: ${(props) => (props.desc ? "40px" : "auto")};
  line-height: ${(props) => (props.desc ? "1.5" : "auto")};
`;

const Item = ({ title, data, image, desc }: Props) => {
  return (
    <Container image={image} desc={desc}>
      <Title image={image}>{title}</Title>
      {image ? (
        <Image
          src={`${IMAGE_URL}/${image}`}
          alt="test"
          width={240}
          height={240}
          style={{ display: "inline-block", marginTop: "10px" }}
        />
      ) : (
        <Data desc={desc}>{data}</Data>
      )}
    </Container>
  );
};

export default Item;
