import { fetchMe } from "@/api/users/fetchMe";
import { ErrorModel } from "@/models/errorResponseModel";
import {
  isSignIn,
  removeLocalStorageIsSignIn,
} from "@/utils/setLocalStorageIsSignIn";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

// 쿠키 만료 -> 토큰 쿠키 자체가 삭제됨 -> Invalid Token Error
// 토큰 만료 -> 토큰 쿠키가 존재하지만 서버에서 검증할 때 만료 쿠키라 실패함 -> Invalid Token Error

// useMe가 만약 캐싱이 없다면 -> useMe 호출할 때마다 네트워크 요청을 보냄

// useMe 캐싱 -> stale 되기 전까지 react-query 캐시가

// stale -> react-query의 캐시 만료 시간 -> 이게 만료되면 새로 요청을 보냄. useMe 등

// 1. signin -> 서버에서 token cookie발급, isSignin(localStorage) 생성, react-query state(['users', 'me']) 생성

// 2. fresh(10초) 인 상태에서는 useMe를 호출해도 캐싱된 state(['users', 'me'])에 저장된 데이터를 가져옴

// 3. token이 만료되거나 사용자가 멋대로 삭제한 경우.
// -> isSignIn이 localStorage에 남아 있음 + state(['users', 'me'])에 데이터가 남아있음(fresh)

// 그렇지만 token이 없으므로 server에서 token을 필요로 하는 요청을 보냈을 때, 오류 발생. -> Invalid Token ...
// 그 때, 우리는 isSignIn을 localStorage에서 삭제 + useMe를 null로 설정 해줘야 됨

// 로그인 여부
async function _fetchMe() {
  if (!isSignIn()) {
    return null;
  }
  return await fetchMe();
}

// react-query : 캐싱 상태관리
export function useMe() {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery(["users", "me"], _fetchMe, {
    // TODO : 캐싱 처리
    staleTime: 10 * 1000,
    onError: (e) => {
      const error = e as AxiosError<ErrorModel>;
      // 토큰이 없을 때
      if (error.response!.data.errorCode === "JSONWEBTOKEN_VALIDATION_ERROR") {
        removeLocalStorageIsSignIn();
        queryClient.setQueryData(["users", "me"], null);
      }
    },
  });
  // DOM = {
  //  html: {... body: { div: {} }}
  // }
  // useEffect는 React Component가 실제로 DOM에 최초 Mounting 될 때 실행.
  // Mounting은 반드시 browser의 DOM에 React로 만든 element가 올라가야 됨
  // 그래서 server에선 실행되지 않음.
  // server는 그냥 string HTML으로 render하기 때문
  //
  // useQuery도 내부적으로 useEffect에서 fetch 함수를 실행하는 것으로 추정
  // 그래서 잘 도는 듯

  return { me: data, error, isLoading };
}
