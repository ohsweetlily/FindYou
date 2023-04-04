import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signupWithCompany } from "@/api/users/signupWithCompany";
import { validateEmail } from "@/utils/validation/validateEmail";
import { validateName } from "@/utils/validation/validateName";
import { validateDisplayName } from "@/utils/validation/validateDisplayName";
import { validatePassword } from "@/utils/validation/validatePassword";
import { validateConfirmPassword } from "@/utils/validation/validateConfirmPassword";
import {
  ValidationInput,
  ValidationSelect,
} from "@/components/base/ValidationInput";
import { PageTitle } from "@/components/base/PageTitle";
import { validateCompanyName } from "@/utils/validation/validateCompanyName";
import { FixedSizeButton } from "@/components/base/FixedSizeButton";
import { InputLabel } from "@/components/base/InputLabel";
import styled from "@emotion/styled";
import { useCompanyList } from "@/hooks/useCompanyList";

// TODO : 리팩토링
export default function SignupCompany() {
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

  const [company, setCompany] = useState("");
  const [companyErrorMessage, setCompanyErrorMessage] = useState("");
  const [isCompanyError, setIsCompanyError] = useState(false);
  const queryClient = useQueryClient();
  const {
    mutate: signupMutate,
    error: signupError,
    isLoading: signupIsLoading,
  } = useMutation(signupWithCompany, {
    onSuccess: () => {
      queryClient.invalidateQueries(["auth", "user"]);
    },
  });

  const { companyList } = useCompanyList();

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
      setNameErrorMessage("이름은 2글자 이상 15자 이하로 입력해주세요.");
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
        "닉네임은 1글자 이상 15글자 이하로 입력해주세요."
      );
      setIsDisplayNameError(true);
    }
    setDisplayName(value);
  }

  function onChangeCompanyName(e: ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    const { value } = e.target;
    const isValidate = validateCompanyName(value);
    if (isValidate) {
      setCompanyErrorMessage(
        "가입 후 소속 회사를 바꿀 수 없으니 신중히 선택해 주세요."
      );
      setIsCompanyError(false);
    } else {
      setCompanyErrorMessage("회사를 선택해주세요.");
      setIsCompanyError(true);
    }
    setCompany(value);
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
      password,
      name,
      displayName,
      company,
    });
    router.push("/auth/signup/complete");
  }

  if (signupIsLoading) {
    return <></>;
  }

  if (signupError) {
    return <h1>error</h1>;
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
          <InputLabel label="담당자 이름" htmlFor="name" />
          <ValidationInput
            name="name"
            value={name}
            id="name"
            onChange={onChangeUsername}
            isError={isNameError}
            ErrorMessage={nameErrorMessage}
            placeholder="담당자 이름"
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
        <InputGroup>
          <InputLabel label="회사명" htmlFor="company" />
          <ValidationSelect
            name="company"
            id="company"
            value={company}
            onChange={onChangeCompanyName}
            isError={isCompanyError}
            ErrorMessage={companyErrorMessage}
            type="company"
          >
            <option value="" disabled>
              회사 선택
            </option>
            {companyList.map((company, index) => {
              return (
                <option value={company.name} key={index}>
                  {company.name}
                </option>
              );
            })}
          </ValidationSelect>
        </InputGroup>
        <FixedSizeButton
          onClick={() => {}}
          isInactive={
            email === "" ||
            displayName === "" ||
            name === "" ||
            password === "" ||
            confirmPassword === "" ||
            company === "" ||
            isEmailError ||
            isDisplayNameError ||
            isNameError ||
            isPasswordError ||
            isConfirmPasswordError ||
            isCompanyError
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
