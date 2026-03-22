import api from "../../../shared/services/api";
import type { User } from "../../../shared/types/User";

export async function me(): Promise<User> {
  const response = await api.get("/users/profile");
  return response.data;
}
