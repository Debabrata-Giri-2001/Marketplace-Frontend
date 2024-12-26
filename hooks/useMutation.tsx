import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast, Toast,ToastTitle,ToastDescription } from "@/components/ui/toast"
import { useState } from 'react';
import { BASE_URL as baseUrl } from '../utils';

type MutationOptions = {
  method?: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  isFormData?: boolean;
  BASE_URL?: string;
  body?: any;
  isAlert?: boolean;
};

const useMutation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const mutation = async (path: string, options?: MutationOptions) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const url = options?.BASE_URL || baseUrl;
      setIsLoading(true);
      const method = options?.method || 'POST';
      const body = options?.body
        ? options?.isFormData
          ? options?.body
          : JSON.stringify(options.body)
        : `{}`;
      const headers: any = options?.isFormData
        ? {}
        : { 'Content-Type': 'application/json' };

      if (token) headers['Authorization'] = `Bearer ${token}`;
      console.log(`${url}/${path}`);
      const response = await fetch(`${url}/${path}`, {
        method,
        headers,
        body,
      });
      const status = response.status;
      const results = await response.json();

      if (options?.isAlert) {
        if (status !== 200) {
          toast.show({
            placement: 'top',
            duration: 3000,
            render: ({ id }) => (
              <Toast nativeID={`toast-${id}`} action="error" variant="solid">
                <ToastTitle>Error!</ToastTitle>
                <ToastDescription>
                  {results?.error?.msg || 'Something went wrong!'}
                </ToastDescription>
              </Toast>
            ),
          });
        } else {
          toast.show({
            placement: 'top',
            duration: 3000,
            render: ({ id }) => (
              <Toast nativeID={`toast-${id}`} action="success" variant="solid">
                <ToastTitle>Success!</ToastTitle>
                <ToastDescription>
                  {results?.msg || 'Operation successful!'}
                </ToastDescription>
              </Toast>
            ),
          });
        }
      }

      setIsLoading(false);
      return { results, status };
    } catch (error) {
      setIsLoading(false);
      const toastId = Math.random();
      toast.show({
        placement: 'top',
        duration: 3000,
        render: ({ id }) => (
          <Toast nativeID={`toast-${id}`} action="error" variant="solid">
            <ToastTitle>Error!</ToastTitle>
            <ToastDescription>
              An unexpected error occurred.
            </ToastDescription>
          </Toast>
        ),
      });
    }
  };

  return { mutation, isLoading };
};

export default useMutation;
