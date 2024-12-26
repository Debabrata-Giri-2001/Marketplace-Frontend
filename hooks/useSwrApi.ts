import AsyncStorage from '@react-native-async-storage/async-storage';
import useSWR, {SWRConfiguration} from 'swr';
import {BASE_URL} from '../utils';

const useSwrApi = (url: string | null, options?: SWRConfiguration) => {
  const fetcher = async (url: string) => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const headers: {
      Authorization?: string;
      'Content-Type'?: string;
    } = {};
    accessToken && (headers['Authorization'] = `Bearer ${accessToken}`);
    headers['Content-Type'] = 'application/json';
    const res = await fetch(url, {
      method: 'GET',
      headers,
    });
    const data = await res.json();
    return {data, res};
  };
  const {data, error, mutate, isValidating} = useSWR(
    url ? [`${BASE_URL}/${url}`] : null,
    fetcher,
    {
      ...options,
      revalidateOnFocus: false,
    },
  );
  return {
    data,
    error,
    isValidating,
    mutate,
  };
};
export default useSwrApi;
