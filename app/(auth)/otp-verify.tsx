import { IMAGES } from "@/assets";
import AppIcon from "@/components/mainComponents/AppIcon";
import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { Toast, ToastTitle, useToast } from "@/components/ui/toast";
import { useAuthProvider } from "@/constant/AuthContext";
import { useAuth } from "@/hooks";
import { useChange, useFetch } from "@/hooks/useAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useState, useRef } from "react";
import { View, TextInput, StyleSheet, Alert, Image } from "react-native";

const OtpVerify = () => {
    const { setToken, setUser, user } = useAuth();
    const { loginMobile, loginEmail, loginType } = useAuthProvider();
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
    const inputRefs = useRef<Array<TextInput | null>>([]);
    const toast = useToast();
    const { change, isChanging } = useChange();

    const { email } = loginEmail || {};
    const { phoneNumber } = loginMobile || {};


    const handleChange = (text: string, index: number) => {
        if (text.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = text;
            setOtp(newOtp);

            if (text && index < otp.length - 1) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleBackspace = (text: string, index: number) => {
        if (!text && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async () => {
        if (loginMobile) {
            console.log(loginMobile)
            await handleSubmitWithMobile();
        } else if (loginEmail) {
            console.log(loginEmail)
            await handleSubmitWithEmail();
        } else {
            toast.show({
                placement: "top",
                render: () => (
                    <Toast className="bg-red-500">
                        <ToastTitle size="sm">Login type is not specified. Please try again.</ToastTitle>
                    </Toast>
                ),
            });
        }
    };


    const handleSubmitWithEmail = async () => {
        const Otp = otp.join("");
        try {
            const res = await change(`verifyEmailOtp`, {
                body: {
                    email,
                    otp: Number(Otp),
                    role: loginType,
                },
            });
            if (res?.results?.success) {
                await AsyncStorage.setItem('isUserEnter', 'true');
                const accessToken = res?.results?.token;
                await setToken(accessToken);
                const checkUserExists = await change(`check-user-exists`, {
                    method: 'GET',
                    body: { email, phoneNumber }
                });
                if (checkUserExists) {
                    toast.show({
                        placement: "top",
                        render: () => (
                            <Toast className="bg-green-500">
                                <ToastTitle size="sm">Welcome back! Redirecting to home...</ToastTitle>
                            </Toast>
                        ),
                    });
                    router.push("/(tabs)");
                } else {
                    toast.show({
                        placement: "top",
                        render: () => (
                            <Toast className="bg-yellow-500">
                                <ToastTitle size="sm">Account not found. Redirecting to registration...</ToastTitle>
                            </Toast>
                        ),
                    });
                    router.push("/create-profile");
                }
            } else {
                toast.show({
                    placement: "top",
                    render: () => (
                        <Toast className="bg-yellow-500">
                            <ToastTitle size="sm">{res?.results?.message}</ToastTitle>
                        </Toast>
                    ),
                });
            }
        } catch (error) {
            toast.show({
                placement: "top",
                render: () => (
                    <Toast className="bg-red-500">
                        <ToastTitle size="sm">Invalid OTP. Please try again.</ToastTitle>
                    </Toast>
                ),
            });
        }
    };

    const handleSubmitWithMobile = async () => {
        const Otp = otp.join("");
        try {
            const res = await change(`verifyOtp`, {
                body: {
                    phoneNumber,
                    otp: Number(Otp),
                    role: loginType,
                },
            });
            if (res?.results?.success) {
                // Check if user exists
                const {
                    data: checkUserExists,
                    mutate: checkUserExistsMutate,
                    isLoading
                } = useFetch(`check-user-exists`);

                if (checkUserExists) {
                    toast.show({
                        placement: "top",
                        render: () => (
                            <Toast className="bg-green-500">
                                <ToastTitle size="sm">Welcome back! Redirecting to home...</ToastTitle>
                            </Toast>
                        ),
                    });
                    router.push("/(tabs)");
                } else {
                    toast.show({
                        placement: "top",
                        render: () => (
                            <Toast className="bg-yellow-500">
                                <ToastTitle size="sm">Account not found. Redirecting to registration...</ToastTitle>
                            </Toast>
                        ),
                    });
                    router.push("/create-profile");
                }
            } else {
                toast.show({
                    placement: "top",
                    render: () => (
                        <Toast className="bg-yellow-500">
                            <ToastTitle size="sm">{res?.results?.message}</ToastTitle>
                        </Toast>
                    ),
                });
            }
        } catch (error) {
            toast.show({
                placement: "top",
                render: () => (
                    <Toast className="bg-red-500">
                        <ToastTitle size="sm">Invalid OTP. Please try again.</ToastTitle>
                    </Toast>
                ),
            });
        }
    };

    return (
        <Center className="mt-5">
            <Image style={{ width: "100%", height: 152, resizeMode: "contain" }}
                source={IMAGES.LOGO}
                alt="Logo"
            />
            <Text className="mt-5 text-4xl font-bold text-black">
                Verify OTP
            </Text>
            <Text>
                Enter the 6-digit code sent to your phone
            </Text>
            <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        style={styles.input}
                        maxLength={1}
                        keyboardType="number-pad"
                        value={digit}
                        onChangeText={(text) => handleChange(text, index)}
                        onKeyPress={({ nativeEvent }) =>
                            nativeEvent.key === "Backspace" && handleBackspace(digit, index)
                        }
                        ref={(ref) => (inputRefs.current[index] = ref)}
                    />
                ))}
            </View>

            <Pressable
                className="w-4/5 rounded-3xl bg-primary-500 mt-4"
                onPress={handleSubmit}
            >
                {isChanging ? (
                    <HStack className="py-2 justify-center">
                        <Spinner className="self-center" color="white" />
                        <Text className="text-secondary-500 font-semibold text-lg">Loading...</Text>
                    </HStack>
                ) : (
                    <HStack className="py-2 justify-center">
                        <Text className="text-secondary-500 font-semibold text-lg">Verify</Text>
                    </HStack>
                )}
            </Pressable>
        </Center>

    );
};

export default OtpVerify;

const styles = StyleSheet.create({
    otpContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
        marginBottom: 20,
    },
    input: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        textAlign: "center",
        fontSize: 18,
        backgroundColor: "#fff",
        color: "#333",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
});
