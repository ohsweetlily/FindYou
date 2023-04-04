import { colors } from "@/styles/colors";
import styled from "@emotion/styled";
import PrevIcon from "../../../public/icon_prev.svg";
import NextIcon from "../../../public/icon_next.svg";
import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { ResponsiveButton } from "../base/ResponsiveButton";

interface PaginationProps {
  totalPages: number | undefined;
  totalPosts: number | undefined;
  page: number;
  paginate: (num: number) => void;
  pageList: number[];
}

const chunk = <T,>(arr: T[], size: number): T[][] =>
  // acc: 반환값 누적, cur: 현재 배열, i:index
  arr.reduce(
    (acc, cur, i) => (
      i % size ? acc[acc.length - 1].push(cur) : acc.push([cur]), acc
    ),
    [] as T[][]
  );

export const Pagination = ({
  totalPages,
  totalPosts,
  page: currentPage,
  paginate,
  pageList,
}: PaginationProps) => {
  // 0 -> 1,2,3,4,5 / 1 -> 6,7,8,9,10 / ...
  const chunkSize = 5;

  // chunk 처리된 페이지 배열이 담김
  const chunkedPageNumbers = useMemo(() => {
    if (totalPosts === 0) {
      return chunk([], chunkSize);
    }
    return chunk(pageList, chunkSize);
  }, [pageList, chunkSize, totalPosts]);

  const currentChunk = useMemo(() => {
    // 로직
    //   return chunkedPageNumbers.findIndex((chunkedPageNumber) => {
    //     return chunkedPageNumber.includes(currentPage);
    //   });
    // }, [currentPage, chunkedPageNumbers]);

    // 개선로직
    return Math.floor(Math.floor(currentPage - 1 / 5) / 5);
  }, [currentPage]);

  // 이전, 다음 버튼
  function handlePrevPage() {
    const prevPage = currentPage - 1;
    paginate(prevPage);
  }

  function handleNextPage() {
    const nextPage = currentPage + 1;
    paginate(nextPage);
  }

  // 상단 이동 버튼
  function scrollToTop() {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  }

  return (
    <PaginationContainer>
      <Empty />
      <PageUl>
        {currentPage === 1 || totalPosts === 0 ? (
          ""
        ) : (
          <PageLi onClick={() => handlePrevPage()}>
            <Image src={PrevIcon} alt="이전 페이지" priority />
          </PageLi>
        )}
        {totalPosts !== 0 &&
          chunkedPageNumbers[currentChunk].map((num) => {
            return (
              <PageLi
                key={num}
                onClick={() => {
                  paginate(num);
                }}
                aria-current={currentPage === num ? "page" : undefined}
              >
                {num}
              </PageLi>
            );
          })}
        {totalPosts === 0 || currentPage === pageList.length ? (
          ""
        ) : (
          <PageLi onClick={() => handleNextPage()}>
            <Image src={NextIcon} alt="다음 페이지" priority />
          </PageLi>
        )}
      </PageUl>
      <ResponsiveButton
        onClick={() => {
          scrollToTop();
        }}
        theme="gray6-gray1-theme"
        size="sm"
      >
        ↑ 맨 위로 이동
      </ResponsiveButton>
    </PaginationContainer>
  );
};

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
`;

const PageUl = styled.ul`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

const PageLi = styled.li`
  display: inline-block;
  padding: 8px 0;
  text-align: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background: ${colors.white};
  border: 1px solid ${colors.gray5};
  color: ${colors.gray2};
  cursor: pointer;
  user-select: none;

  &:hover {
    border-color: ${colors.gray4};
  }

  &[aria-current] {
    background: ${colors.primary1WithOpacity20};
    border: 1px solid ${colors.primary2};
    color: ${colors.primary3};
  }
`;

const Empty = styled.div`
  width: 103px;
`;
