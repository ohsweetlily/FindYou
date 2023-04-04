import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "@/api/users/signup";
import { validateEmail } from "@/utils/validation/validateEmail";
import { validateName } from "@/utils/validation/validateName";
import { validateDisplayName } from "@/utils/validation/validateDisplayName";
import { validatePassword } from "@/utils/validation/validatePassword";
import { validateConfirmPassword } from "@/utils/validation/validateConfirmPassword";
import { ValidationInput } from "@/components/base/ValidationInput";
import { PageTitle } from "@/components/base/PageTitle";
import { FixedSizeButton } from "@/components/base/FixedSizeButton";
import { InputLabel } from "@/components/base/InputLabel";
import styled from "@emotion/styled";

// TODO : 리팩토링
export default function SignupPersonal() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [isEmailError, setIsEmailError] = useState(false);

  const [name, setName] = useState("");
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [isNameError, setIsNameError] = useState(false);

  const [displayName, setDisplayName] = useState("");
  const [displayNameErrorMessage, setDisplayNameErrorMessage] = useState("");
  const [isDisplayNameError, setIsDisplayNameError] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [isPasswordError, setIsPasswordError] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState("");
  const [isConfirmPasswordError, setIsConfirmPasswordError] = useState(false);

  const queryClient = useQueryClient();
  const {
    mutate: signupMutate,
    isLoading,
    error,
  } = useMutation(signup, {
    onSuccess: () => {
      queryClient.invalidateQueries(["auth", "user"]);
    },
  });

  function onChangeEmail(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { value } = e.target;
    const isValidate = validateEmail(value);
    if (isValidate) {
      setEmailErrorMessage("");
      setIsEmailError(false);
    } else {
      setEmailErrorMessage("올바른 이메일 형식을 입력해주세요.");
      setIsEmailError(true);
    }
    setEmail(value);
  }

  function onChangeUsername(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { value } = e.target;
    const isValidate = validateName(value);
    if (isValidate) {
      setNameErrorMessage("");
      setIsNameError(false);
    } else {
      setNameErrorMessage("이름을 2글자 이상 15글자 이하로 입력해주세요.");
      setIsNameError(true);
    }
    setName(value);
  }
  function onChangeDisplayName(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { value } = e.target;
    const isValidate = validateDisplayName(value);
    if (isValidate) {
      setDisplayNameErrorMessage("");
      setIsDisplayNameError(false);
    } else {
      setDisplayNameErrorMessage(
        "닉네임을 1글자 이상 15글자 이하로 입력해주세요."
      );
      setIsDisplayNameError(true);
    }
    setDisplayName(value);
  }

  function onChangePassword(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { value } = e.target;
    const isPasswordValidate = validatePassword(value);
    const isConfirmPasswordValidate = validateConfirmPassword(
      value,
      confirmPassword
    );
    if (isPasswordValidate) {
      setPasswordErrorMessage("");
      setIsPasswordError(false);
    } else {
      setPasswordErrorMessage(
        "8~20글자, 대소문자+숫자+특수문자 조합이어야 합니다."
      );
      setIsPasswordError(true);
    }

    if (isConfirmPasswordValidate) {
      setConfirmPasswordErrorMessage("");
      setIsConfirmPasswordError(false);
    } else {
      setConfirmPasswordErrorMessage("패스워드 확인이 맞지 않습니다.");
      setIsConfirmPasswordError(true);
    }

    setPassword(value);
  }

  function onChangeConfirmPassword(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { value } = e.target;
    const isValidate = validateConfirmPassword(password, value);
    if (isValidate) {
      setConfirmPasswordErrorMessage("");
      setIsConfirmPasswordError(false);
    } else {
      setConfirmPasswordErrorMessage("비밀번호가 달라요");
      setIsConfirmPasswordError(true);
    }
    setConfirmPassword(value);
  }

  async function onSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await signupMutate({
      email,
      name,
      displayName,
      password,
    });
    router.push("/auth/signup/complete");
  }

  if (isLoading) {
    return <></>;
  }

  if (error) {
    return <h1>err</h1>;
  }

  return (
    <>
      <PageTitle text={"회원가입"} />
      <form onSubmit={onSubmitForm}>
        <InputGroup>
          <InputLabel label="이메일" htmlFor="email" />
          <ValidationInput
            name="email"
            id="email"
            value={email}
            onChange={onChangeEmail}
            isError={isEmailError}
            ErrorMessage={emailErrorMessage}
            placeholder="이메일 주소"
            type="text"
          />
        </InputGroup>
        <InputGroup>
          <InputLabel label="패스워드" htmlFor="password" />
          <ValidationInput
            name="password"
            id="password"
            value={password}
            onChange={onChangePassword}
            isError={isPasswordError}
            ErrorMessage={passwordErrorMessage}
            placeholder="패스워드"
            type="password"
          />
        </InputGroup>
        <InputGroup>
          <InputLabel label="패스워드 확인" htmlFor="confirmPassword" />
          <ValidationInput
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
            isError={isConfirmPasswordError}
            ErrorMessage={confirmPasswordErrorMessage}
            placeholder="패스워드 확인"
            type="password"
          />
        </InputGroup>
        <InputGroup>
          <InputLabel label="이름" htmlFor="name" />
          <ValidationInput
            name="name"
            id="name"
            value={name}
            onChange={onChangeUsername}
            isError={isNameError}
            ErrorMessage={nameErrorMessage}
            placeholder="이름"
            type="text"
          />
        </InputGroup>
        <InputGroup>
          <InputLabel label="닉네임" htmlFor="displayName" />
          <ValidationInput
            name="displayName"
            id="displayName"
            value={displayName}
            onChange={onChangeDisplayName}
            isError={isDisplayNameError}
            ErrorMessage={displayNameErrorMessage}
            placeholder="사이트 이용시 사용할 닉네임"
            type="text"
          />
        </InputGroup>
        <FixedSizeButton
          onClick={() => {}}
          isInactive={
            email === "" ||
            displayName === "" ||
            name === "" ||
            password === "" ||
            confirmPassword === "" ||
            isEmailError ||
            isDisplayNameError ||
            isNameError ||
            isPasswordError ||
            isConfirmPasswordError
          }
          theme={"primary-gray1-theme"}
        >
          회원가입 완료
        </FixedSizeButton>
      </form>
    </>
  );
}

const InputGroup = styled.div`
  margin-bottom: 16px;
`;
