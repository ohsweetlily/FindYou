import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { signin } from "@/api/users/signin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/base/Input";
import styled from "@emotion/styled";
import { PageTitle } from "@/components/base/PageTitle";
import { FixedSizeButton } from "@/components/base/FixedSizeButton";
import { InputLabel } from "@/components/base/InputLabel";
import { setLocalStorageIsSignIn } from "@/utils/setLocalStorageIsSignIn";

export default function SigninPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    mutate: signinMutate,
    isLoading,
    error,
  } = useMutation(signin, {
    onSuccess: () => {
      setLocalStorageIsSignIn();
      queryClient.invalidateQueries(["users", "me"]);
      router.push("/");
    },
    onError: (err) => {
      alert("로그인 실패");
    },
  });

  // if (error) {
  //   return <h1>error</h1>;
  // }

  if (isLoading) {
    return <></>;
  }

  // 페이지 - hook - api
  function onChangeEmail(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setEmail(e.target.value);
  }

  function onChangePassword(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setPassword(e.target.value);
  }

  async function onSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await signinMutate({
      email,
      password,
    });
  }

  return (
    <>
      <Form onSubmit={onSubmitForm}>
        <PageTitle text={"로그인"} />
        <InputGroup>
          <InputLabel label="이메일" htmlFor="email" />
          <Input
            name="email"
            id="email"
            value={email}
            onChange={onChangeEmail}
            placeholder="이메일"
            type="text"
          />
        </InputGroup>
        <InputGroup>
          <InputLabel label="패스워드" htmlFor="password" />
          <Input
            name="password"
            id="password"
            value={password}
            onChange={onChangePassword}
            placeholder="패스워드"
            type="password"
          />
        </InputGroup>
        <Container>
          <FixedSizeButton
            onClick={() => {
              onSubmitForm;
            }}
            theme={"primary-gray1-theme"}
          >
            로그인
          </FixedSizeButton>
        </Container>
      </Form>
      <FixedSizeButton
        onClick={() => {
          router.push("/auth/pre-signup");
        }}
        theme={"gray6-gray1-theme"}
      >
        회원가입
      </FixedSizeButton>
    </>
  );
}

const Form = styled.form`
  margin-bottom: 8px;
`;

const Container = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
  padding-top: 8px;
`;

const InputGroup = styled.div`
  margin-bottom: 16px;
`;
