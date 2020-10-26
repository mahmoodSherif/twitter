import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { useFetchData } from "./helper";

export function useUserData(userId) {
  const data = useFetchData(`/users/${userId}`);
  return data;
}

export function useUserFollowed(userId) {
  const data = useFetchData(`/users/${userId}/followers`);
  const { currentUser } = useContext(AuthContext);
  return data.includes(currentUser.user.id);
}
