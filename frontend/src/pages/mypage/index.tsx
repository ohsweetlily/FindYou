import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { validateName } from "@/utils/validation/validateName";
import { validateDisplayName } from "@/utils/validation/validateDisplayName";
import { validatePassword } from "@/utils/validation/validatePassword";
import { validateConfirmPassword } from "@/utils/validation/validateConfirmPassword";
import { ValidationInput } from "@/components/base/ValidationInput";
import { PageTitle } from "@/components/base/PageTitle";
import { InputLabel } from "@/components/base/InputLabel";
import { ResponsiveButton } from "@/components/base/ResponsiveButton";
import Withdrawal from "@/components/modal/Withdrawal";
import { useMe } from "@/hooks/useMe";
import { patchMyInfo } from "@/api/mypage/patchMyInfo";
import {
  isSignIn,
  removeLocalStorageIsSignIn,
} from "@/utils/setLocalStorageIsSignIn";
import { ProfilePhotoInput } from "@/components/mypage/ProfilePhotoInput";
import { DefaultInfo } from "@/components/mypage/DefaultInfo";
import { withdrawal } from "@/api/users/withdrawal";
import {
  ButtonsContainer,
  ConfirmWithdrawal,
  DivisionLine,
  InputGroup,
  ProfileContainer,
} from "@/components/mypage/styled";
import { IMAGE_URL } from "@/config/constants";

export default function MyInfoPage() {
  const router = useRouter();
  const { me, error: meError, isLoading: meLoading } = useMe();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isSignIn()) {
      router.push("/");
    }
  }, [me]);

  useEffect(() => {
    if (!me) {
      return;
    }
    setImageUrl(`${IMAGE_URL}/${me.imageUrl}`);
    setName(me.name);
    setDisplayName(me.displayName);
  }, [me]);

  function checkMemberType() {
    if (me?.company) {
      return "기업회원";
    }
    return "개인회원";
  }

  // Modal
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  // Inputs
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState<File>();

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

  // 프로필 사진
  const encodeFileToBase64 = (fileBlob: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);

    return new Promise((resolve) => {
      reader.onload = () => {
        setImageUrl(reader!.result!.toString());
        resolve(null);
      };
    });
  };
  // 회원정보 수정
  const {
    mutate: patchMyInfoMutate,
    error: patchError,
    isLoading: patchLoading,
  } = useMutation(patchMyInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries(["mypage", "myinfo"]);
    },
  });

  // 탈퇴
  const { mutate: withdrawalMutate } = useMutation(withdrawal, {
    onSuccess: () => {
      alert("탈퇴 되었습니다.");
      removeLocalStorageIsSignIn();
      queryClient.removeQueries(["users", "me"]);
    },
  });

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

    await patchMyInfoMutate({
      image,
      email: me!.email,
      password,
      name,
      displayName,
    });
    alert("정보가 수정 되었습니다.");
  }

  async function handleWithdrawal() {
    await withdrawalMutate();
  }

  if (patchLoading || meLoading) {
    return <></>;
  }
  if (patchError || meError) {
    return <div>Something Wrong</div>;
  }

  return (
    <>
      {isShowModal && (
        <Withdrawal
          onClose={() => setIsShowModal(false)}
          onClick={() => handleWithdrawal()}
          reward={me?.reward}
        />
      )}
      <PageTitle text={"마이페이지"} />
      <ProfileContainer>
        <ProfilePhotoInput
          imageUrl={imageUrl}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            encodeFileToBase64(e.target.files![0]);
            setImage(e.target.files![0]);
          }}
        />
        <DefaultInfo
          email={me?.email}
          checkMemberType={checkMemberType}
          company={me?.company}
          reward={me?.reward}
        />
      </ProfileContainer>
      <form onSubmit={onSubmitForm}>
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
        <ButtonsContainer>
          <ResponsiveButton
            onClick={(e) => {
              e.preventDefault();
              router.push("/");
            }}
            theme={"gray6-gray1-theme"}
          >
            취소
          </ResponsiveButton>
          <ResponsiveButton
            onClick={() => {}}
            isInactive={
              displayName === "" ||
              name === "" ||
              password === "" ||
              confirmPassword === "" ||
              isDisplayNameError ||
              isNameError ||
              isPasswordError ||
              isConfirmPasswordError
            }
            theme={"primary-gray1-theme"}
          >
            수정
          </ResponsiveButton>
        </ButtonsContainer>
      </form>
      <DivisionLine />
      <ConfirmWithdrawal>
        <h6>회원탈퇴</h6>
        <p>탈퇴 후 복구할 수 없습니다. 신중하게 결정해주세요.</p>
      </ConfirmWithdrawal>
      <ButtonsContainer>
        <ResponsiveButton
          onClick={() => {
            setIsShowModal(true);
          }}
          theme={"gray1-white-theme"}
        >
          탈퇴
        </ResponsiveButton>
      </ButtonsContainer>
    </>
  );
}
