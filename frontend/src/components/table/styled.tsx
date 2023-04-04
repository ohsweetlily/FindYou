import { colors } from "@/styles/colors";
import styled from "@emotion/styled";

//  Filter
export const FilterContainer = styled.div`
  width: 1200px;
  background-color: ${colors.gray7};
  border-radius: 8px;
  padding: 40px 80px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const Filter = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
`;

export const InputsContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-grow: 1;
  flex-wrap: wrap;
`;

export const InputTitle = styled.div`
  flex-shrink: 0;
  width: 60px;
  margin-right: 80px;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  color: ${colors.gray2};
`;

export const FilterButtons = styled.div`
  position: absolute;
  display: flex;
  right: 32px;
  bottom: 32px;
  gap: 8px;
`;

// 검색
export const SearchContainer = styled.div`
  width: 1200px;
  margin: 32px 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const SearchGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const ItemThumbnail = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 16px;
  overflow: hidden;
`;
