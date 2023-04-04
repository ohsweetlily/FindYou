import { PageTitle } from "@/components/base/PageTitle";
import { PreSignup } from "@/components/base/PreSignup";
import styled from "@emotion/styled";
import Link from "next/link";

export default function PreSignupPage() {
  return (
    <>
      <PageTitle text={"회원가입"} />
      <Container>
        <Link href="/auth/signup/personal">
          <PreSignup text="개인회원" type="personal" />
        </Link>
        <Link href="/auth/signup/company">
          <PreSignup text="기업회원" type="company" />
        </Link>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  gap: 24px;
  flex-direction: row;
`;
