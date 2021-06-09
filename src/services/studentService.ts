import axios from "axios";
import URL from "../data/URL";
let token = "";
const setToken = (tokentoSet: string | null) => {
  token = `bearer ${tokentoSet}`;
};
const studentSignById = async (id: string) => {
  const res = await axios.get(`${URL}/signService/signaStudentById/${id}`, {
    headers: { Authorization: token },
  });
  return res.data.id;
};
const studentUnsignById = async (id: string) => {
  const res = await axios.get(
    `${URL}/signService/unsignaStudentById/${id}`,
    {
      headers: { Authorization: token },
    }
  );
  return res.data.id;
};
export default { setToken, studentSignById, studentUnsignById };
