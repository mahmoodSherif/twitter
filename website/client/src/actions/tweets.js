import { useFetchData } from "./helper";

export function useTweetsByUser(userId) {
  const data = useFetchData(`/users/${userId}/tweets`);
  return data;
}

export function useFeed() {
  const data = useFetchData(`/feed/`);
  return data;
}
