import Axios from "axios";
import { useCallback, useContext, useState } from "react";
import { AuthContext } from "../contexts/auth";

export function useFetchData() {
  const { currentUser } = useContext(AuthContext);
  const [res, setRes] = useState({ data: null, error: null, isLoading: false });

  const end = useCallback(() => {
    setRes({ data: null, error: null, isLoading: false });
  }, []);

  const fetch = useCallback(
    async ({
      postData = {},
      headers = {},
      url,
      method,
      callback = () => {},
    }) => {
      setRes((prev) => ({ ...prev, isLoading: true }));

      if (method === "post") {
        headers["Content-Type"] = "application/json";
      }

      const config = {
        method: method,
        url: "http://localhost:3000" + url,
        headers: {
          ...headers,
          Authorization: "Bearer " + currentUser.token,
        },
        data: {
          ...postData,
        },
      };

      try {
        const ret = await Axios(config);
        setRes({ data: ret.data, error: null });
      } catch (err) {
        setRes({ data: null, error: err });
      } finally {
        setRes((prev) => ({ ...prev, isLoading: false }));
        callback();
      }
    },
    [currentUser.token]
  );

  return [res, fetch, end];
}

export async function fetch({ url, token, method, postData }) {
  const config = {
    method,
    url: "http://localhost:3000" + url,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: {
      ...postData,
    },
  };
  return (await Axios(config)).data;
}
