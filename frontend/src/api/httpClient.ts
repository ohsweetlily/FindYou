import axios from "axios";
import { API_URL } from "@/config/constants";
export const client = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// 보낼때마다
client.interceptors.request.use((req) => {
  return req;
});

// 처음 설정 해주는 것
// axios.defaults.headers["Content-Type"] = "application/json"

export const multipartClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

multipartClient.interceptors.request.use((req) => {
  // req.data 추출해서 변수에 저장
  // 실제로 보낼 것이 아니기 때문에 기존 req.data는 비워줌

  const { data } = req;
  req.data = {};

  // formData에 data에 담긴 각 key, value 저장.
  // 서버에 실제로 보낼 formData 형태로 만듦
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value as string);
  });
  // Request Header에 multipart/form-data임을 명시
  req.data = formData;
  return req;
});

// 백엔드에서 데이터를 보내줄 때 data 에다가 묶어서 주는데
// 그거를 각각 통신하기 전에 먼저 묶은거 풀어주는 과정?
// 그래서 얘가 정제된 애니까 data.data 이렇게 할 필요없이 바로 쓸 수 있어요
client.interceptors.response.use((res) => {
  res.data = res.data?.data;
  return res;
});
