import { useRouter } from "next/router";
import useGetPostDetail from "@/hooks/useGetPostDetail";
import Item from "@/components/post/Item";
import { Title } from "@/components/register/styled";
import styled from "@emotion/styled";
import { ResponsiveButton } from "@/components/base/ResponsiveButton";
import { deleteItem } from "@/api/items/deleteItem";
import { useMe } from "@/hooks/useMe";
import { useEffect } from "react";
import useGetBoardDetail from "@/hooks/useGetBoard";

const Container = styled.div`
  width: 1200px;
  margin: auto;
`;

const ButtonContainer = styled.div`
  width: 280px;
  display: flex;
  justify-content: space-around;
  margin: 40px auto;
`;

const Detail = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data,
    isLoading: postLoading,
    error: postError,
  } = useGetBoardDetail(Number(id));
  const { me, isLoading: meLoading, error: meError } = useMe();

  if (postLoading || meLoading) {
    return <></>;
  }
  if (postError) {
    return <div>해당 게시글이 존재하지 않습니다</div>;
  }

  return (
    <>
      <Title>찾아주세요</Title>
      <Container>
        <Item desc={false} title="제목" data={data?.name} />
        <Item desc={false} title="카테고리" data={data?.categoryName} />
        <Item desc={false} title="분실자" data={data?.userName} />
        <Item desc={false} title="분실일" data={data?.lostDate} />
        <Item desc={false} title="분실장소" data={data?.lostPlace} />
        <Item desc={false} title="작성일" data={data?.createdAt} />
        <Item desc={true} title="상세설명" data={data?.description} />
        <Item desc={false} title="사진" data="" image={data?.imageUrl} />
        <ButtonContainer>
          {me && data?.userName === me?.name ? (
            <>
              <ResponsiveButton
                theme="gray1-white-theme"
                size="md"
                onClick={() => {
                  if (confirm("해당 게시물을 삭제하시겠습니까?")) {
                    deleteItem({ itemId: Number(id) }).then((res) => {
                      alert("삭제되었습니다.");
                      router.push("/lost");
                    });
                  }
                }}
              >
                삭제
              </ResponsiveButton>
              <ResponsiveButton
                theme="gray1-white-theme"
                size="md"
                onClick={() => {
                  if (confirm("게시물을 수정하시겠습니까")) {
                    router.push(`/register/lost/${id}`);
                  }
                }}
              >
                수정
              </ResponsiveButton>
              <ResponsiveButton
                theme="gray6-gray1-theme"
                size="md"
                onClick={() => {
                  router.push("/lost");
                }}
              >
                목록
              </ResponsiveButton>
            </>
          ) : (
            <>
              <ResponsiveButton
                theme="gray6-gray1-theme"
                size="md"
                onClick={() => {
                  router.push("/lost");
                }}
              >
                목록
              </ResponsiveButton>
            </>
          )}
        </ButtonContainer>
      </Container>
    </>
  );
};

export default Detail;
