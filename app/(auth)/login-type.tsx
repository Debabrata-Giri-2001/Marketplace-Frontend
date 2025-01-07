import React, { useEffect } from 'react';
import { Box } from '@/components/ui/box';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';
import AppIcon from '@/components/mainComponents/AppIcon';
import { Center } from '@/components/ui/center';
import { Image } from 'react-native';
import { IMAGES } from '@/assets';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import { HStack } from '@/components/ui/hstack';
import { useRouter } from 'expo-router';
import { useAuthProvider } from '@/constant/AuthContext';

const UserLoginType: React.FC = () => {
  const router = useRouter();
  const { updateLoginType } = useAuthProvider();
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(10, { duration: 500 }),
      -1,
      true
    );
  }, [translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const handleLoginTypeSelection = (type: string) => {
    updateLoginType(type);
    router.push('/login'); 
  };

  return (
    <Box>
      <Center className="mt-5">
        <Image
          style={{ width: '100%', height: 152, resizeMode: 'contain' }}
          source={IMAGES.LOGO}
          alt="Logo"
        />
        <Text className="mt-5 text-4xl font-bold text-black">Welcome Back</Text>
        <Text>Choose Your Login Process</Text>
      </Center>

      <HStack className="w-full mt-8 px-2 justify-between">
        <Pressable
          onPress={() => handleLoginTypeSelection('User')}
          className="w-[48%] p-3 bg-primary-50 rounded-lg"
        >
          <Image
            style={{ width: '100%', height: 82, resizeMode: 'contain' }}
            alt="user"
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4140/4140037.png' }}
          />
          <HStack className="items-center self-center mt-2">
            <Text className="ml-3 text-secondary-50" bold size="md">
              User Login
            </Text>
            <Animated.View style={animatedStyle}>
              <AppIcon AntDesignName="arrowright" color="#ffffff" size={20} />
            </Animated.View>
          </HStack>
        </Pressable>

        <Pressable
          onPress={() => handleLoginTypeSelection('BusinessOwner')}
          className="w-[48%] p-3 bg-primary-50 rounded-lg"
        >
          <Image
            style={{ width: '100%', height: 82, resizeMode: 'contain' }}
            alt="business owner"
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2760/2760980.png' }}
          />
          <HStack className="items-center self-center mt-2">
            <Text className="ml-3 text-secondary-50" bold size="md">
              Business Owner Login
            </Text>
            <Animated.View style={animatedStyle}>
              <AppIcon AntDesignName="arrowright" color="#ffffff" size={20} />
            </Animated.View>
          </HStack>
        </Pressable>
      </HStack>
    </Box>
  );
};

export default UserLoginType;
