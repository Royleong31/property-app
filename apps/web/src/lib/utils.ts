import { API_URL } from "$lib/constants";
import axios, { type AxiosRequestConfig, type AxiosResponse, type Method } from "axios";

export async function makeHttpRequest<TRequest, TResponse>({
  url,
  method,
  data,
  config,
  baseUrl = API_URL,
}: {
  url: string;
  method: Method;
  data?: TRequest;
  config?: AxiosRequestConfig;
  baseUrl?: string;
}): Promise<TResponse> {
  try {
    const response: AxiosResponse<TResponse> = await axios({
      url: `${baseUrl}${url}`,
      method,
      data,
      ...config,
    });

    return response.data;
  } catch (error) {
    // Handle errors (e.g., network errors, HTTP errors)
    throw error;
  }
}
