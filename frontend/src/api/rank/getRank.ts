import { client } from "../httpClient";
import { RankModel } from "@/models/rankModel";
import { AxiosResponse } from "axios";

export async function getRank() {
  const { data } = await client.get<RankModel[]>("/api/main/rank");
  return data;
}
