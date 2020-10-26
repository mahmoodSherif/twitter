import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/auth";

export function useFetchData(url) {
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetch() {
      const config = {
        method: "get",
        url: "http://localhost:3000" + url,
        headers: {
          Authorization: "Bearer " + currentUser.token,
        },
      };
      const ret = await Axios(config);
      setData(ret.data);
    }
    fetch();
  }, [currentUser.token, url]);

  return data;
}
