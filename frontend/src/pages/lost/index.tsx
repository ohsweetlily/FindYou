import { PageTitle } from "@/components/base/PageTitle";
import styled from "@emotion/styled";
import { useState, useMemo, useRef, useEffect } from "react";
import { Input } from "@/components/base/Input";
import { ResponsiveButton } from "@/components/base/ResponsiveButton";
import { CountText } from "@/components/table/CountText";
import { FloatingBar } from "@/components/base/FloatingBar";
import { useRouter } from "next/router";
import { useMe } from "@/hooks/useMe";
import { useGetBoards } from "@/hooks/useGetBoards";
import { BoardModel } from "@/models/boardModel";
import { Table } from "@/components/table/Table";
import { CategoryBadge } from "@/components/base/CategoryBadge";
import { Pagination } from "@/components/table/Pagination";
import { SearchContainer, SearchGroup } from "@/components/table/styled";

const tableHeadData = [
  { id: 0, head: "번호" },
  { id: 1, head: "카테고리" },
  { id: 2, head: "제목" },
  { id: 3, head: "작성자" },
  { id: 4, head: "작성일" },
];

export default function PreSignupPage() {
  const router = useRouter();
  const { me, error: meError, isLoading: meLoading } = useMe();
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<BoardModel[]>();
  const searchInputRef = useRef<HTMLInputElement>(null); // 인풋 입력할 때마다 불필요한 리렌더링 방지
  const [count, setCount] = useState(0);

  const {
    boards,
    error: boardsError,
    isLoading: boardsLoading,
  } = useGetBoards({ searchKeyword: searchText, page });

  useEffect(() => {
    // const reverseTempData = boards?.boards.reverse().map((data) => data);
    setPosts(boards?.boards);
    setCount(boards?.totalBoards!);
  }, [boards]);

  // * Search
  function handleSearch() {
    const searchTextValue = searchInputRef?.current?.value as string;
    if (searchTextValue.length === 0) {
      alert("검색어를 입력해주세요.");
      return;
    }
    setSearchText(searchTextValue);
    setPage(1);
  }

  function handleResetSearch() {
    setSearchText("");
    setPage(1);
    if (searchInputRef.current !== null) {
      searchInputRef.current.value = "";
    }
  }

  // * paging
  const pageList: number[] = [];
  if (boards?.totalPages) {
    for (let i = 1; i <= boards!.totalPages; i++) {
      pageList.push(i);
    }
  }

  const paginate = (num: number) => {
    setPage(num);
  };

  if (boardsLoading) {
    return <></>;
  }

  return (
    <>
      <PageTitle text={"찾아주세요"} />
      <SearchContainer>
        <CountText>{count} 건</CountText>
        <SearchGroup>
          <div>
            <Input
              name="search"
              id="search"
              placeholder="제목 검색"
              type="text"
              ref={searchInputRef}
            />
          </div>
          <ResponsiveButton
            onClick={() => {
              handleSearch();
            }}
            theme="gray1-white-theme"
          >
            검색
          </ResponsiveButton>
          <ResponsiveButton
            onClick={() => {
              handleResetSearch();
            }}
            theme="gray6-gray1-theme"
          >
            초기화
          </ResponsiveButton>
        </SearchGroup>
      </SearchContainer>

      <Table tableHeadData={tableHeadData} posts={posts!}>
        {posts &&
          posts!.map((item, index) => {
            return (
              <tr
                key={item.id}
                onClick={() => {
                  router.push(`/lost/${item.id}`);
                }}
              >
                <td>{item.id}</td>
                <td>
                  <CategoryBadge text={item.categoryName} />
                </td>
                <td width="700">{item.name}</td>
                <td>{item.userName}</td>
                <td>{item.createdAt}</td>
              </tr>
            );
          })}
      </Table>

      <Pagination
        totalPages={boards?.totalPages}
        totalPosts={boards?.totalBoards}
        page={page}
        paginate={paginate}
        pageList={pageList}
      />

      <FloatingBar>
        <div>
          <p>분실한 물건이 있으신가요? 도움을 요청해 보세요.</p>
          <ResponsiveButton
            onClick={() => {
              if (!me) {
                alert("회원만 등록이 가능합니다. 로그인 페이지로 이동합니다.");
                router.push("/auth/signin");
              } else {
                router.push("/register/lost");
              }
            }}
            theme="primary-gray1-theme"
          >
            분실물 등록
          </ResponsiveButton>
        </div>
      </FloatingBar>
    </>
  );
}
