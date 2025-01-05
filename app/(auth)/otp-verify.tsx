import { IMAGES } from "@/assets";
import { Center } from "@/components/ui/center";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import React, { useState, useRef } from "react";
import { View, TextInput, StyleSheet, Alert, Image } from "react-native";

const OtpVerify = () => {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
    const inputRefs = useRef<Array<TextInput | null>>([]);

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

    const handleSubmit = () => {
        const enteredOtp = otp.join("");
        if (enteredOtp.length === 6) {
            Alert.alert("Success", `Entered OTP: ${enteredOtp}`);
        } else {
            Alert.alert("Error", "Please enter a valid 6-digit OTP.");
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
                {false ? (
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
