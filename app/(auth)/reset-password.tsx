import { ANIMATIONS } from "@/assets";
import AppIcon from "@/components/mainComponents/AppIcon";
import AppInput from "@/components/mainComponents/AppInput";
import { Alert, AlertText } from "@/components/ui/alert";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { useToast } from "@/components/ui/toast";
import { useMutation } from "@/hooks";
import { IInputProps } from "@gluestack-ui/input/lib/types";
import { useNavigation, Link } from "expo-router";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { ScrollView } from "react-native";
import { IconProps } from "react-native-vector-icons/Icon";
import AnimatedLottieView from 'lottie-react-native';


type FormInput = {
  key: string;
  label: string;
  placeholder: string;
  icon: any;
  rules: Object;
  inputProps?: any;
};

type FormData = {
  [key: string]: string;
};
export default function ForgotPassword(): JSX.Element {
  const toast = useToast();
  const { goBack, navigate } = useNavigation<any>();
  const { mutation, isLoading } = useMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleSend = async ({ username }: FormData) => {
    try {
      const res = await mutation('user/forgot-password', {
        method: 'PUT',
        isAlert: true,
        body: {
          email: username,
        },
      });
      console.log(res);
      if (res?.results?.success) {
        navigate('ResetPassword', { email: username });
      }
    } catch (error) {
      <Alert>
        <AlertText>{error instanceof Error ? error?.message : 'Something Went wrong'}</AlertText>
      </Alert>
    }
  };

  const formInputs: FormInput[] = useMemo(
    () => [
      {
        key: 'username',
        label: 'Email',
        placeholder: 'Enter registered email address',
        icon: { FeatherName: 'mail' },
        rules: {
          required: 'Email address is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        },
        inputProps: { keyboardType: 'email-address', autoCapitalize: 'none' },
      },
    ],
    [],
  );

  return (
    <Box>
      <HStack className="w-full text-center p-5 items-center">
        <Pressable onPress={() => goBack()}>
          <AppIcon
            IoniconsName={'arrow-back-circle-outline'}
            size={32}
            color={'black'}
          />
        </Pressable>
        <Heading className="justify-center">Forget Password</Heading>
      </HStack>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Center className="px-4">
          <Box className="justify-center rounded-full">
            <Box className="self-center">
              <AnimatedLottieView
                source={ANIMATIONS.lock}
                autoPlay
                loop={true}
                style={{ height: 150, width: 150 }}
              />
            </Box>
          </Box>
          {formInputs.map(input => (
            <AppInput
              input={input}
              key={input.key}
              control={control}
              errorMessage={errors?.[input?.key]?.message}
            />
          ))}


          <Pressable
            className="w-4/5 rounded-3xl bg-primary-500 mt-4"
            onPress={handleSubmit(handleSend)}
          >
            {isLoading ? (
              <HStack className="py-2 justify-center">
                <Spinner className="self-center" color="white" />
                <Text className="text-secondary-50 font-semibold text-lg">Loading...</Text>
              </HStack>
            ) : (
              <HStack className="py-2 justify-center">
                <Text className="text-secondary-50 font-semibold text-lg">Send Otp</Text>
              </HStack>
            )}
          </Pressable>


          <Box className="items-center flex-row mt-4">
            <Text className="text-black font-normal text-sm mr-2">
              Already have an account?
            </Text>
            <Link href="/login" className="no-underline">
              <Text className="text-sm text-black underline">
                Sign in
              </Text>
            </Link>
          </Box>
        </Center>
      </ScrollView>
    </Box>
  );
}
