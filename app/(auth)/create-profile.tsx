import { Box } from '@/components/ui/box';
import React, { useState } from 'react';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Alert, Image, ScrollView } from 'react-native';
import { Button } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import AppIcon from '@/components/mainComponents/AppIcon';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams } from 'expo-router';
import { useAuthProvider } from '@/constant/AuthContext';

const createprofile = () => {
    const { loginType,loginEmail,loginMobile } = useAuthProvider();
    const [formData, setFormData] = useState<any>({
        name: '',
        email: loginEmail || '',
        phoneNumber: loginMobile || '',
        avatarUrl: 'https://cdn-icons-png.flaticon.com/512/9131/9131529.png',
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

    const handleSubmit = () => {
        Alert.alert('Profile Created', 'Your profile has been successfully created.');
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
                            editable={!loginEmail} // Make editable only if not pre-filled
                            onChangeText={(value) => handleInputChange('email', value)}
                            className={`flex-1 px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none ${loginEmail ? 'bg-gray-200' : ''
                                }`}
                        />
                    </Input>

                    {/* Phone Number Input */}
                    <Input className="relative flex items-center w-full border rounded-md h-auto my-2">
                        <AppIcon style={{ marginLeft: 12 }} FeatherName="smartphone" color={'gray'} size={20} />
                        <InputField
                            placeholder="Phone Number"
                            value={formData.phoneNumber}
                            editable={!loginMobile} // Make editable only if not pre-filled
                            onChangeText={(value) => handleInputChange('phoneNumber', value)}
                            className={`flex-1 px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none ${loginMobile ? 'bg-gray-200' : ''
                            }`}
                        />
                    </Input>
                </VStack>
            </ScrollView>

            {/* Submit Button */}
            <Box className="p-4">
                <Button className="bg-primary-50 px-4 py-2 rounded-lg w-full" onPress={handleSubmit}>
                    <Text className="text-white text-center">Create Profile</Text>
                </Button>
            </Box>
        </Box>
    );
};

export default createprofile;
