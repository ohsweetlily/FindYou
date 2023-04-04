import { BoardModel } from "./boardModel";

export interface BoardDetailModel extends BoardModel{
    description: string;
    lostPlace: string;
    imageUrl: string;
    lostDate: string;
}