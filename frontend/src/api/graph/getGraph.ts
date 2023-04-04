import { client } from "../httpClient";

// 1 : "monthly"
// 2 : "by place"
// 3 : "by category"
// 4 : "Total"

type GraphId = 1 | 2 | 3 | 4;
export const getGraph = (id: GraphId) => client.get(`/api/main/graph/${id}`);
