import { useToast } from "@/components/ui/toast";
import { useAuth, useMutation } from "@/hooks";
import { useMemo, useState } from "react";
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
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Link } from 'expo-router';

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
    const { setUser, getUser, setToken } = useAuth();
    const { mutation: login, isLoading } = useMutation();
    const router = useRouter();
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const { height } = useWindowDimensions();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const handleLogin = async ({ username, password }: FormData) => {
        try {
            const res = await login(`user/login`, {
                isAlert: true,
                body: {
                    email: username,
                    password: password,
                },
            });
            if (res?.results?.success && res?.results?.data?.token) {
                setToken(res?.results?.data?.token);
                getUser();
            }
            console.log(res);
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
                placeholder: 'Username',
                icon: { FeatherName: 'mail' },
                rules: {
                    required: 'Username is required',
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                    },
                },
                inputProps: { keyboardType: 'email-address', autoCapitalize: 'none' },
            },
            {
                key: 'password',
                label: 'Password',
                placeholder: 'Password',
                icon: { FeatherName: 'lock' },
                rules: {
                    required: 'Password is required',
                    minLength: {
                        value: 6,
                        message: 'Password must be at least 8 characters long',
                    },
                },
                inputProps: {
                    secureTextEntry,
                    rightElement: (
                        <Button className="text-xs color-black"
                            onPress={() => setSecureTextEntry(!secureTextEntry)}>
                            <ButtonText className="text-secondary-100">
                                {secureTextEntry ? 'Show' : 'Hide'}
                            </ButtonText>
                        </Button>
                    ),
                },
            },
        ],
        [secureTextEntry],
    );

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
                    <HStack className="w-full flex justify-end ">
                        <Pressable className="text-black px-4 my-3 text-sm "
                            onPress={() => router.navigate("/reset-password")}
                        >
                            <Text>Forgot Password?</Text>
                        </Pressable>
                    </HStack>

                    <Pressable
                        className="w-4/5 rounded-3xl bg-primary-500"
                        onPress={handleSubmit(handleLogin)}
                    >
                        {isLoading ? (
                            <HStack className="py-2 justify-center">
                                <Spinner className="self-center" color="white" />
                                <Text className="text-secondary-500 font-semibold text-lg">Loading...</Text>
                            </HStack>
                        ) : (
                            <HStack className="py-2 justify-center">
                                <Text className="text-secondary-500 font-semibold text-lg">Sign In</Text>
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
                </Center>
            </ScrollView>
        </Box>
    );
}
