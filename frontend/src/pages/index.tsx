import Head from "next/head";
import ChartBox from "@/components/charts/ChartBox";
import RankBox from "@/components/rank/RankBox";
import styled from "@emotion/styled";
import Image from "next/image";
import { colors } from "@/styles/colors";
import { Title } from "@/components/base/TitlesInMain";
import { Table } from "@/components/table/Table";
import { useNewItems } from "@/hooks/useNewItems";
import { useRouter } from "next/router";
import { CategoryBadge } from "@/components/base/CategoryBadge";
import { ResponsiveButton } from "@/components/base/ResponsiveButton";
import { Notice } from "@/components/notice/Notice";
import { useNoticeItem } from "@/hooks/useNoticeItem";
import { IMAGE_URL } from "@/config/constants";
import { ItemThumbnail } from "@/components/table/styled";

const RankBackground = styled.div`
  width: 100vw;
  padding: 64px 0;
  margin: 64px 0;
  background-color: ${colors.gray7};
`;

const TableContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
  margin-top: 24px;
  text-align: center;
`;

export default function Home() {
  const router = useRouter();
  const {
    newItems,
    error: newItemError,
    isLoading: newItemIsLoading,
  } = useNewItems();
  const {
    noticeItem,
    error: noticeError,
    isLoading: noticeIsLoading,
  } = useNoticeItem();

  if (newItemError || noticeError) {
    return <h1>error</h1>;
  }

  if (newItemIsLoading || noticeIsLoading) {
    return <></>;
  }

  return (
    <>
      <Head>
        <title>찾아줄게</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Notice
        storeItems={noticeItem!.storeItems}
        pickupItems={noticeItem!.pickupItems}
      />
      <ChartBox />
      <RankBackground>
        <RankBox />
      </RankBackground>
      <Title>새로 등록된 분실물</Title>
      <TableContainer>
        <Table posts={newItems}>
          {newItems.map((item, index) => {
            return (
              <tr
                key={index}
                onClick={() => {
                  router.push(`/found/${item.id}`);
                }}
              >
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
                <td width="500">{item.name}</td>
                <td>{item.createdAt}</td>
                <td>{item.lostPlace}</td>
              </tr>
            );
          })}
        </Table>
        <ResponsiveButton
          theme="gray1-white-theme"
          size="md"
          onClick={() => {
            router.push("/found");
          }}
        >
          전체 분실물 보러가기 →
        </ResponsiveButton>
      </TableContainer>
    </>
  );
}
