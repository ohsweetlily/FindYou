import { FixedSizeButton } from "@/components/base/FixedSizeButton";
import { PageTitle } from "@/components/base/PageTitle";
import styled from "@emotion/styled";
import Link from "next/link";

export default function CompletePage() {
  return (
    <>
      <PageTitle text={"회원가입 완료"} />
      <Container>
        <h2>환영합니다😊</h2>
        <Link href="/auth/signin">
          <FixedSizeButton onClick={() => {}} theme={"primary-gray1-theme"}>
            로그인하러 가기
          </FixedSizeButton>
        </Link>
        <Link href="/">
          <FixedSizeButton onClick={() => {}} theme={"gray6-gray1-theme"}>
            메인으로 가기
          </FixedSizeButton>
        </Link>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  h2 {
    font-size: 24px;
    text-align: center;
    margin-bottom: 32px;
  }
`;
