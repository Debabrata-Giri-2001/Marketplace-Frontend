import PrivateContainer from '@/components/mainComponents/PrivateContainer'
import { useLocalSearchParams, useRouter } from 'expo-router'
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
import { ANIMATIONS } from '@/assets';

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

const getHelp = () => {
    const categoriesType = useLocalSearchParams();
    const { navigate } = useRouter();
    const { mutation, isLoading } = useMutation();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const handleSend = async ({ username }: FormData) => {
        try {
            const res = await mutation('', {
                method: 'POST',
                isAlert: true,
                body: {},
            });
            console.log(res);
            if (res?.results?.success) {
                navigate('/support');
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
                key: 'title',
                label: 'Title *',
                placeholder: 'Enter title',
                icon: { MaterialCommunityIconsName: 'format-text' },
                required: 'Title is required',
                rules: {
                    required: 'Title is required',
                },
                inputProps: { keyboardType: 'text', autoCapitalize: 'none' },
            },
            {
                key: 'message',
                label: 'Message *',
                placeholder: 'Enter message',
                icon: { MaterialCommunityIconsName: 'format-text' },
                rules: {
                    required: 'Message is required',
                },
                inputProps: { keyboardType: 'text', autoCapitalize: 'none' },
            },
        ], []
    );


    return (
        <PrivateContainer title='Get Help'>
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
                                <Text className="text-secondary-50 font-semibold text-lg">Submit</Text>
                            </HStack>
                        )}
                    </Pressable>


                </Center>
            </ScrollView>
        </PrivateContainer>
    )
}

export default getHelp;
