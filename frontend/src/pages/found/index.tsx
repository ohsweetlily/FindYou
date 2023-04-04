import { CheckBox } from "@/components/base/Checkbox";
import { PageTitle } from "@/components/base/PageTitle";
import { colors } from "@/styles/colors";
import styled from "@emotion/styled";
import Image from "next/image";
import Thumbnail from "../../../public/img/item_thumbnail.png";
import { Radio } from "@/components/base/Radio";
import { ChangeEvent, useState, useMemo, useRef, useEffect } from "react";
import { Input } from "@/components/base/Input";
import { ResponsiveButton } from "@/components/base/ResponsiveButton";
import { CountText } from "@/components/table/CountText";
import { CategoryBadge } from "@/components/base/CategoryBadge";
import { FloatingBar } from "@/components/base/FloatingBar";
import { Pagination } from "@/components/table/Pagination";
import { Table } from "@/components/table/Table";
import { useRouter } from "next/router";
import { useMe } from "@/hooks/useMe";
import { ItemModel } from "@/models/itemModel";
import { useGetItems } from "@/hooks/useGetItems";
import {
  Filter,
  FilterButtons,
  FilterContainer,
  InputsContainer,
  InputTitle,
  ItemThumbnail,
  SearchContainer,
  SearchGroup,
} from "@/components/table/styled";
import { IMAGE_URL } from "@/config/constants";

const categoryData = [
  { id: 1, value: "핸드폰" },
  { id: 2, value: "가방" },
  { id: 3, value: "지갑" },
  { id: 4, value: "옷" },
  { id: 5, value: "쇼핑백" },
  { id: 6, value: "서류봉투" },
  { id: 7, value: "책" },
  { id: 8, value: "장난감" },
  { id: 9, value: "파일" },
  { id: 10, value: "기타" },
];
const dateData = [
  { id: 0, value: "당일" },
  { id: 1, value: "3일" },
  { id: 2, value: "1주일" },
  { id: 3, value: "1달" },
];
const tableHeadData = [
  { id: 0, head: "번호" },
  { id: 1, head: "사진" },
  { id: 2, head: "카테고리" },
  { id: 3, head: "제목" },
  { id: 4, head: "습득일" },
  { id: 5, head: "보관장소" },
];

export default function PreSignupPage() {
  const router = useRouter();
  const { me, error, isLoading } = useMe();
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<ItemModel[]>();
  const searchInputRef = useRef<HTMLInputElement>(null); // 인풋 입력할 때마다 불필요한 리렌더링 방지
  const [count, setCount] = useState(0);
  const [categoryNames, setCategoryNames] = useState("");
  const [duration, setDuration] = useState("");

  const {
    items,
    error: itemsError,
    isLoading: itemsLoading,
  } = useGetItems({ searchKeyword: searchText, page, categoryNames, duration });

  useEffect(() => {
    // const reverseTempData = items?.items.reverse().map((data) => data);
    setPosts(items?.items);
    setCount(items?.totalItems!);
  }, [items]);

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
  if (items?.totalPages) {
    for (let i = 1; i <= items!.totalPages; i++) {
      pageList.push(i);
    }
  }

  const paginate = (num: number) => {
    setPage(num);
  };

  // * Filter
  function handleResetFilter() {
    setPage(1);
    setPosts(items?.items);
    setSelectedDuration("");
    setCheckedCategoryNames([]);
    setDuration("");
    setCategoryNames("");
  }
  function handleSearchFilter() {
    setPage(1);
    setDuration(selectedDuration);
    setCategoryNames(joinCategory);
  }

  // * Checkbox
  const checkedList: string[] = [];
  const [checkedCategoryNames, setCheckedCategoryNames] = useState(checkedList);

  function handleCheck(value: string) {
    const old = [...checkedCategoryNames];
    if (!old.includes(value)) {
      old.push(value);
    } else {
      old.splice(old.indexOf(value), 1);
    }
    setCheckedCategoryNames(old);
  }

  function isCheckedCategoryName(categoryName: string) {
    for (let i = 0; i < checkedCategoryNames.length; i++) {
      if (checkedCategoryNames[i] === categoryName) {
        return true;
      }
    }
    return false;
  }

  const joinCategory = checkedCategoryNames.join(",");

  // * Radio
  const [selectedDuration, setSelectedDuration] = useState("");
  const handleSelectChange =
    (selectedValue: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setSelectedDuration(selectedValue);
    };

  if (itemsLoading) {
    return <></>;
  }

  return (
    <>
      <PageTitle text={"분실물센터"} />
      <FilterContainer>
        <Filter>
          <InputTitle>카테고리</InputTitle>
          <InputsContainer>
            {categoryData.map((item, index) => (
              <CheckBox
                key={index}
                text={item.value}
                checked={isCheckedCategoryName(item.value)}
                onChange={() => {
                  handleCheck(item.value);
                }}
              />
            ))}
          </InputsContainer>
        </Filter>
        <Filter>
          <InputTitle>습득일</InputTitle>
          <InputsContainer>
            {dateData.map((item, index) => (
              <Radio
                key={index}
                text={item.value}
                value={index}
                name="date"
                onChange={handleSelectChange(item.value)}
                checked={selectedDuration === item.value}
              />
            ))}
          </InputsContainer>
        </Filter>
        <FilterButtons>
          <ResponsiveButton
            onClick={() => {
              handleResetFilter();
            }}
            theme="gray6-gray1-theme"
            size="sm"
          >
            필터 초기화
          </ResponsiveButton>
          <ResponsiveButton
            onClick={() => {
              handleSearchFilter();
            }}
            theme="primary-gray1-theme"
            size="sm"
          >
            필터 검색
          </ResponsiveButton>
        </FilterButtons>
      </FilterContainer>

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
                  router.push(`/found/${item.id}`);
                }}
              >
                <td>{item.id}</td>
                <td>
                  <ItemThumbnail>
                    <Image
                      src={`${IMAGE_URL}/${item.imageUrl}`}
                      alt="사진"
                      width="96"
                      height="96"
                      priority
                    />
                  </ItemThumbnail>
                </td>
                <td>
                  <CategoryBadge text={item.categoryName} />
                </td>
                <td width="400">{item.name}</td>
                <td>{item.getDate}</td>
                <td>{item.takePlace}</td>
              </tr>
            );
          })}
      </Table>

      <Pagination
        totalPages={items?.totalPages}
        totalPosts={items?.totalItems}
        page={page}
        paginate={paginate}
        pageList={pageList}
      />

      <FloatingBar>
        <div>
          <p>습득한 물건이 있으신가요? 주인을 찾을 수 있도록 도와주세요.</p>
          <ResponsiveButton
            onClick={() => {
              if (!me) {
                alert("회원만 등록이 가능합니다. 로그인 페이지로 이동합니다.");
                router.push("/auth/signin");
              } else {
                router.push("/register/found");
              }
            }}
            theme="primary-gray1-theme"
          >
            습득물 등록
          </ResponsiveButton>
        </div>
      </FloatingBar>
    </>
  );
}
