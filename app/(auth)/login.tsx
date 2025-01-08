// send email
import { Toast, ToastTitle, useToast } from "@/components/ui/toast";
import { useAuth } from "@/hooks";
import { useEffect, useMemo, useState } from "react";
import { Image, ScrollView, useWindowDimensions } from "react-native";
import { useForm } from 'react-hook-form';
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Center } from "@/components/ui/center";
import { IMAGES } from "@/assets";
import { Pressable } from "@/components/ui/pressable";
import { Spinner } from "@/components/ui/spinner";
import AppInput from "@/components/mainComponents/AppInput";
import { Alert, AlertText } from "@/components/ui/alert";
import { useRouter, useNavigation, useLocalSearchParams, } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Link } from 'expo-router';
import { useChange } from "@/hooks/useAPI";
import { useAuthProvider } from "@/constant/AuthContext";
import { Divider } from "@/components/ui/divider";
import AppIcon from "@/components/mainComponents/AppIcon";
import { BASE_URL } from "@/utils";

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

export default function Login(): JSX.Element {
    const toast = useToast();
    const { setLoginEmail } = useAuthProvider();
    const { type } = useLocalSearchParams();
    const { setUser } = useAuth();
    const { change, isChanging } = useChange();
    const router = useRouter();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const formInputs: FormInput[] = useMemo(
        () => [
            {
                key: 'email',
                label: 'Email',
                placeholder: 'Email',
                icon: { FeatherName: 'mail' },
                rules: {
                    required: 'Email is required',
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


    const handleLogin = async (email: FormData) => {
        try {
            const res = await change(`sendEmailOtp`, {
                body: email
            });
            console.log("res", res)
            if (res?.results?.success) {
                setLoginEmail(email);
                toast.show({
                    placement: "top",
                    render: ({ id }) => {
                        const toastId = "toast-" + id;
                        return (
                            <Toast
                                nativeID={toastId}
                                className="px-5 py-3 gap-4 shadow-soft-1 items-center flex-row"
                            >
                                <AppIcon size={12} FeatherName="send" color={'green'} />
                                <Divider
                                    orientation="vertical"
                                    className="h-[30px] bg-outline-200"
                                />
                                <ToastTitle size="sm">OTP sent successfully</ToastTitle>
                            </Toast>
                        );
                    },
                });
                router.navigate('/otp-verify');
            }
        } catch (error) {
            console.log("err->", error)
            toast.show({
                placement: "top",
                render: ({ id }) => {
                    const toastId = "toast-" + id;
                    return (
                        <Toast
                            nativeID={toastId}
                            className="px-5 py-3 gap-4 shadow-soft-1 items-center flex-row bg-red-500"
                        >
                            <Divider
                                orientation="vertical"
                                className="h-[30px] bg-outline-200"
                            />
                            <ToastTitle size="sm" className="text-white">
                                {error instanceof Error ? error.message : "Something went wrong"}
                            </ToastTitle>
                        </Toast>
                    );
                },
            });
        }
    };

    return (
        <Box className="flex-1 bg-white">
            <ScrollView showsVerticalScrollIndicator={false}>
                <HStack className="justify-end mx-4 mt-2">
                    <Button
                        className="p-2 px-4 bg-white rounded-full"
                        onPress={() => setUser({})}
                        variant={'outline'}
                        size={'sm'}
                    >
                        <ButtonText>
                            Skip
                        </ButtonText>
                    </Button>
                </HStack>
                <Center className="mt-5">
                    <Image style={{ width: "100%", height: 152, resizeMode: "contain" }}
                        source={IMAGES.LOGO}
                        alt="Logo"
                    />
                    <Text className="mt-5 text-4xl font-bold text-black">
                        Welcome Back
                    </Text>
                    <Text>
                        Login to your Account
                    </Text>
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
                        onPress={handleSubmit(handleLogin)}
                    >
                        {isChanging ? (
                            <HStack className="py-2 justify-center">
                                <Spinner className="self-center" color="white" />
                                <Text className="text-secondary-500 font-semibold text-lg">Loading...</Text>
                            </HStack>
                        ) : (
                            <HStack className="py-2 justify-center">
                                <Text className="text-secondary-500 font-semibold text-lg">Send OTP</Text>
                            </HStack>
                        )}
                    </Pressable>


                    <Box className="items-center flex-row mt-4">
                        <Text className="text-black font-normal text-sm mr-2">
                            Don't have an account?
                        </Text>
                        <Link href="/register" className="no-underline">
                            <Text className="text-sm text-black underline">
                                Sign up
                            </Text>
                        </Link>
                    </Box>
                    <Pressable onPress={() => router.push({ pathname: '/mobile-login', params: { type } })} className="mt-3">
                        <Text className="text-blue-500 text-sm font-medium underline">
                            Login with Mobile
                        </Text>
                    </Pressable>
                </Center>
            </ScrollView>
        </Box>
    );
}
