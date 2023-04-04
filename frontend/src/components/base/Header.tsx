import { useMe } from "@/hooks/useMe";
import { ReactNode } from "react";
import styled from "@emotion/styled";
import LogoImg from "../../../public/img/logo.svg";
import Link from "next/link";
import Image from "next/image";
import { colors } from "@/styles/colors";
import { signout } from "@/api/users/signout";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { removeLocalStorageIsSignIn } from "@/utils/setLocalStorageIsSignIn";
import { useRouter } from "next/router";

export const Header = () => {
  const router = useRouter();
  const { me, error, isLoading } = useMe();
  const queryClient = useQueryClient();

  // 로그아웃
  const { mutate } = useMutation(signout, {
    onSuccess: () => {
      router.push("/");
      removeLocalStorageIsSignIn();
      queryClient.invalidateQueries(["users", "me"]);
    },
  });

  // if (isLoading) {
  //   return <h1>loading</h1>;
  // }

  if (error) {
    return <h1>error</h1>;
  }

  return (
    <Nav>
      <Menu>
        <Link href="/found">
          <p>분실물센터</p>
        </Link>
        <Link href="/lost">
          <p>찾아주세요</p>
        </Link>
      </Menu>
      <Logo>
        <Link href="/">
          <Image
            src={LogoImg}
            alt="찾아줄게!"
            width="131"
            height="66"
            priority
          />
        </Link>
      </Logo>
      {!me ? (
        <Util>
          <Link href="/auth/signin">
            <p>로그인</p>
          </Link>
          <Link href="/auth/pre-signup">
            <p>회원가입</p>
          </Link>
        </Util>
      ) : (
        <Util>
          <span>
            <span>{me.name}</span>님 환영합니다.
          </span>
          <Link href="/mypage">
            <p>마이페이지</p>
          </Link>
          <p onClick={() => mutate()}>로그아웃</p>
        </Util>
      )}
    </Nav>
  );
};

const Nav = styled.div`
  height: 120px;
  background-color: ${colors.white};
  border-bottom: 1px solid ${colors.gray5};
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.03);
  padding: 0 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
`;

const Logo = styled.div`
  text-align: center;
  user-select: none;
`;

const Menu = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 40%;
  flex-wrap: wrap;
  gap: 48px;

  p {
    font-weight: 700;
    font-size: 21px;
    line-height: 25px;
    color: ${colors.gray3};
  }

  p:hover {
    color: ${colors.gray1};
  }
`;

const Util = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 40%;
  flex-wrap: wrap;
  gap: 32px;

  p,
  span {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: ${colors.gray3};
    text-decoration: inherit;
  }

  p:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  span {
    span {
      color: ${colors.gray1};
    }
  }
`;
