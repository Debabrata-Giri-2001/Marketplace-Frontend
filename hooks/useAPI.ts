import { BASE_URL } from "@/utils";
import localStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import useSWR from "swr";

export const getAccessToken = async () => {
  const accessToken = await localStorage.getItem("accessToken");
  return accessToken ? accessToken : null;
};

type useFetchOptions = {
  BASE_URL: typeof BASE_URL | "/api";
};

type MutationOptions = {
  method?: "POST" | "PUT" | "PATCH" | "DELETE" | "GET";
  isFormData?: boolean;
  BASE_URL?: string;
  body?: any;
};

export const useFetch = <T>(path: string, options?: useFetchOptions) => {
  const url = options?.BASE_URL || BASE_URL;
  const data = useSWR<{
    avatar: any;
    data?: any;
    user?:any;
    success: boolean;
    msg: string;
    pagination?: {
      totalCount: any;
      total: number;
      page?: string | any;
      limit?: string | any;
    };
  }>(
    path?.includes("undefined") ? null : `${url}/${path}`,
    async (args: any) => {
      const headers: HeadersInit_ = {};
      const token = await getAccessToken();
      if (token) headers["Authorization"] = `Bearer ${token}`;
      const response = await fetch(args, { headers });
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    }
  );
  return {
    ...data,
    response: data,
    success: data.data?.success,
    msg: data.data?.msg,
    data: data.data,
    pagination: data?.data?.pagination,
  };
};

export const useChange = () => {
  const [isChanging, setIsChanging] = useState(false);
  const change = async (path: string, options?: MutationOptions) => {
    try {
      const token = await getAccessToken();
      const url = options?.BASE_URL || BASE_URL;
      setIsChanging(true);
      const method = options?.method || "POST";
      const body = options?.body
        ? options?.isFormData
          ? options?.body
          : JSON.stringify(options.body)
        : `{}`;
      const headers: HeadersInit_ = options?.isFormData
        ? {}
        : { "Content-Type": "application/json" };
      if (token) headers["Bearer"] = token;
      const fetchOptions = {
        method,
        headers,
        body,
      };
      if (options?.method === "GET") delete fetchOptions.body;
      const response = await fetch(`${url}/${path}`, fetchOptions);

      const status = response.status;
      const results = await response.json();
      setIsChanging(false);
      return { results, status };
    } catch (error) {
      console.log("error on  ch", error);
      setIsChanging(false);
      throw new Error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };
  return { change, isChanging };
};
