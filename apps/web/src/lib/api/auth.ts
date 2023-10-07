import { makeHttpRequest } from "$lib/utils";

export const login = async (username: string, password: string) => {
  const response = await makeHttpRequest<{ username: string; password: string }, { token: string }>(
    {
      url: "/login",
      method: "POST",
      data: { username, password },
    }
  );
  // TODO: Add error handling
  return response.token;
};
