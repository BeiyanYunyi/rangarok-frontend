import axios from "axios";
import URL from "../data/URL";
const getGroupInfo = async (groupName: string) => {
  const { data }: { data: { name: string; signed: number; total: number } } =
    await axios.get(`${URL}/getInf/getGroupStatByName/${groupName}`);
  return data;
};
export default { getGroupInfo };
