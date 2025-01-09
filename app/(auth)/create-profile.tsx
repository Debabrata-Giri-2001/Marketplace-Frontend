import { Box } from '@/components/ui/box';
import React, { useState } from 'react';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Alert, Image, Pressable, ScrollView } from 'react-native';
import { Button } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import AppIcon from '@/components/mainComponents/AppIcon';
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from 'expo-router';
import { useAuthProvider } from '@/constant/AuthContext';
import { Toast, ToastTitle, useToast } from '@/components/ui/toast';
import { Divider } from '@/components/ui/divider';
import { useChange } from '@/hooks/useAPI';
import { HStack } from '@/components/ui/hstack';
import { Spinner } from '@/components/ui/spinner';

const CreateProfile = () => {
    const toast = useToast();
    const { userID } = useLocalSearchParams();
    const { change, isChanging } = useChange();
    const { loginType, loginEmail, loginMobile } = useAuthProvider();
    
    // Destructuring loginEmail and loginMobile to get their values
    const { email } = loginEmail || {};
    const { phoneNumber } = loginMobile || {};

    const [formData, setFormData] = useState<any>({
        name: '',
        email: email || '',
        phoneNumber: phoneNumber || '',
        avatar: {
            public_id: 'cdn-icons-png.flaticon.com/512/9131/9131529.png',
            url: 'https://cdn-icons-png.flaticon.com/512/9131/9131529.png'
        },
        role: loginType,
    });

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });

            if (!result.canceled && result.assets && result.assets[0].uri) {
                setFormData((prev: any) => ({ ...prev, avatarUrl: result.assets[0].uri }));
            }
        } catch (error) {
            console.error('Error picking image:', error);
        }
    };

    const handleInputChange = (key: string, value: string) => {
        setFormData((prev: any) => ({ ...prev, [key]: value }));
    };

    const formDataFn = new FormData();

    const handleSubmit = async () => {
        formDataFn.append('email', formData.email);
        formDataFn.append('name', formData.name);
        formDataFn.append('role', formData.role);
        formDataFn.append('avatar', formData.avatarUrl || formData.avatar.url);
        try {
            const res = await change(`update-profile/${userID}`, {
                isFormData: true,
                body: formDataFn,
            });

            if (res?.results?.success) {
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
                                <ToastTitle size="sm">Account Created Successfully</ToastTitle>
                            </Toast>
                        );
                    },
                });
                if (loginType === "BusinessOwner") {
                    router.navigate('/register')
                } else {
                    router.navigate('/(tabs)')
                }
            }
        } catch (error: any) {
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
        <Box className="flex-1 bg-gray-100">
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
                <VStack className="space-y-6">
                    {/* Profile Type Heading */}
                    <Text className="text-xl font-semibold text-center text-gray-700">
                        {loginType ? `${loginType} Profile` : 'Profile'}
                    </Text>

                    <Text className="text-2xl font-bold text-center">Create Profile</Text>

                    {/* Avatar Upload */}
                    <Box className="items-center">
                        <Box className="w-32 h-32 rounded-full overflow-hidden border-2 border-primary-50">
                            {formData.avatarUrl ? (
                                <Image
                                    source={{ uri: formData.avatarUrl }}
                                    alt="Avatar Preview"
                                    className="w-full h-full"
                                    resizeMode="cover"
                                />
                            ) : (
                                <Text className="text-center text-gray-500">No Avatar</Text>
                            )}
                        </Box>
                        <Button className="bg-primary-50 px-4 py-2 rounded-lg mt-4" onPress={pickImage}>
                            <Text className="text-white">Upload Avatar</Text>
                        </Button>
                    </Box>

                    {/* Name Input */}
                    <Input className="relative flex items-center w-full border rounded-md h-auto my-2">
                        <AppIcon style={{ marginLeft: 12 }} AntDesignName="user" color={'gray'} size={20} />
                        <InputField
                            placeholder="Name"
                            value={formData.name}
                            onChangeText={(value) => handleInputChange('name', value)}
                            className="flex-1 px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none"
                        />
                    </Input>

                    {/* Email Input */}
                    <Input className="relative flex items-center w-full border rounded-md h-auto my-2">
                        <AppIcon style={{ marginLeft: 12 }} MaterialCommunityIconsName="email" color={'gray'} size={20} />
                        <InputField
                            placeholder="Email"
                            value={formData.email}
                            editable={!email} // Make editable only if not pre-filled
                            onChangeText={(value) => handleInputChange('email', value)}
                            className={`flex-1 px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none ${email ? 'bg-gray-200' : ''
                                }`}
                        />
                    </Input>

                    {/* Phone Number Input */}
                    <Input className="relative flex items-center w-full border rounded-md h-auto my-2">
                        <AppIcon style={{ marginLeft: 12 }} FeatherName="smartphone" color={'gray'} size={20} />
                        <InputField
                            placeholder="Phone Number"
                            value={formData.phoneNumber}
                            editable={!phoneNumber} // Make editable only if not pre-filled
                            onChangeText={(value) => handleInputChange('phoneNumber', value)}
                            className={`flex-1 px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none ${phoneNumber ? 'bg-gray-200' : ''
                                }`}
                        />
                    </Input>
                </VStack>
            </ScrollView>

            {/* Submit Button */}
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
        </Box>
    );
};

export default CreateProfile;
