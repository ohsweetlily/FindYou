import React, { useState } from "react";
import { useRouter } from "next/router";
import useGetPostDetail from "@/hooks/useGetPostDetail";
import Item from "@/components/post/Item";
import { Title } from "@/components/register/styled";
import styled from "@emotion/styled";
import Reception from "@/components/modal/Reception";
import { ResponsiveButton } from "@/components/base/ResponsiveButton";
import { deleteItem } from "@/api/items/deleteItem";
import { useMe } from "@/hooks/useMe";

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
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const router = useRouter();
  const { id } = router.query;

  const {
    data,
    isLoading: postLoading,
    error: postError,
  } = useGetPostDetail(Number(id));
  const { me, isLoading: meLoading, error: meError } = useMe();

  if (postLoading) {
    return <></>;
  }
  if (postError) {
    return <div>해당 게시글이 존재하지 않습니다</div>;
  }
  return (
    <>
      {isShowModal && (
        <Reception onClose={() => setIsShowModal(false)} id={data?.id} />
      )}
      <Title>분실물센터</Title>
      <Container>
        <Item title="제목" desc={false} data={data?.name} />
        <Item title="카테고리" desc={false} data={data?.categoryName} />
        <Item title="습득자" desc={false} data={data?.userName} />
        <Item title="습득일" desc={false} data={data?.getDate} />
        <Item title="보관장소" desc={false} data={data?.takePlace} />
        <Item title="처리상태" desc={false} data={data?.status} />
        <Item title="작성일" desc={false} data={data?.createdAt} />
        <Item title="상세설명" desc={true} data={data?.description} />
        <Item title="사진" desc={false} data="" image={data?.imageUrl} />
        <ButtonContainer>
          {/* 유저 네임으로 일치 불일치 비교 (고유성 다소 부족) */}
          {data?.userName === me?.displayName ? (
            <>
              <ResponsiveButton
                theme="gray1-white-theme"
                size="md"
                onClick={() => {
                  if (confirm("해당 게시물을 삭제하시겠습니까?")) {
                    deleteItem({ itemId: Number(id) }).then((res) => {
                      alert("삭제되었습니다.");
                      router.push("/found");
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
                    router.push(`/register/found/${id}`);
                  }
                }}
              >
                수정
              </ResponsiveButton>
              <ResponsiveButton
                theme="gray6-gray1-theme"
                size="md"
                onClick={() => {
                  router.push("/found");
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
                  router.push("/found");
                }}
              >
                목록
              </ResponsiveButton>
              <ResponsiveButton
                theme="primary-gray1-theme"
                size="md"
                onClick={() => {
                  if (me) {
                    setIsShowModal(true);
                  } else {
                    alert("로그인이 필요한 서비스 입니다.");
                    router.push("/auth/signin");
                  }
                }}
              >
                본인수령 확인하기
              </ResponsiveButton>
            </>
          )}
        </ButtonContainer>
      </Container>
    </>
  );
};

export default Detail;
