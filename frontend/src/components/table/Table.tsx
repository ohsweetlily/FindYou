import { BoardModel } from "@/models/boardModel";
import { ItemModel } from "@/models/itemModel";
import { NewItemsModel } from "@/models/newItemsModel";
import { colors } from "@/styles/colors";
import styled from "@emotion/styled";
import { ReactNode } from "react";

interface TableProps {
  children: ReactNode;
  tableHeadData?: {
    id: number;
    head: string;
  }[];
  posts: ItemModel[] | BoardModel[] | NewItemsModel[];
}

export const Table = ({ children, tableHeadData, posts }: TableProps) => {
  return (
    <StyledTable>
      {tableHeadData && (
        <TableHead>
          <tr>
            {tableHeadData.map((item, index) => (
              <th key={index}>{item.head}</th>
            ))}
          </tr>
        </TableHead>
      )}
      <TableBody>
        {children}
        {posts && posts.length === 0 && (
          <tr>
            <td colSpan={99}>게시글이 없습니다.</td>
          </tr>
        )}
      </TableBody>
    </StyledTable>
  );
};

const StyledTable = styled.table`
  width: 100%;
  font-size: 16px;
  margin-bottom: 40px;
`;

const TableHead = styled.thead`
  background-color: ${colors.gray7};
  border: 1px solid ${colors.gray2};
  border-width: 1px 0px;

  th {
    padding: 24px 32px;
    font-weight: 600;
    color: ${colors.gray2};
  }
`;

const TableBody = styled.tbody`
  tr:nth-of-type(1) {
    border-top: 1px solid ${colors.gray5};
  }
  tr {
    border-bottom: 1px solid ${colors.gray5};
    font-weight: 400;
    color: ${colors.gray3};
    cursor: pointer;

    td {
      padding: 24px 32px;
      text-align: center;
      vertical-align: middle;
    }
  }

  tr:hover {
    background-color: ${colors.gray7};
    color: ${colors.gray1};
  }
`;
