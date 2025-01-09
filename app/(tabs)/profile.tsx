import { IMAGES } from '@/assets';
import AppIcon, { IconProps } from '@/components/mainComponents/AppIcon';
import NotificationIcon from '@/components/mainComponents/NotificationIcon';
import { Box } from '@/components/ui/box'
import { Center } from '@/components/ui/center';
import { HStack } from '@/components/ui/hstack';
import { Menu, MenuItem, MenuItemLabel } from '@/components/ui/menu';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack';
import { useAuth } from '@/hooks';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react'
import { Image } from 'react-native';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Heading } from '@/components/ui/heading';
import { useFetch } from '@/hooks/useAPI';

const Profile = () => {

    const { logout, user } = useAuth();
    const { navigate } = useRouter();

    const { data, isLoading, mutate } = useFetch<any>(`get-profile`);

    const listData: {
        title: string;
        subtitle?: string;
        avatar?: string;
        leftIcon?: IconProps;
        isHeading?: boolean;
        onPress?: () => void;
    }[] = [
            {
                title: 'Account Settings',
                isHeading: true,
            },
            {
                title: 'Edit Profile',
                leftIcon: { FeatherName: 'user' },
                onPress: () => navigate('/profileEdit'),
            },

            {
                title: 'Notifications',
                leftIcon: { FeatherName: 'bell' },
                onPress: () => navigate('/notifications'),
            },
            {
                title: 'Support',
                isHeading: true,
            },
            {
                title: 'Get Help',
                leftIcon: { FeatherName: 'help-circle' },
                onPress: () => navigate('/support'),
            },

            {
                title: 'Account Actions',
                isHeading: true,
            },
            {
                title: 'Logout',
                leftIcon: { FeatherName: 'log-out' },
                onPress: () => logout(),
            },
            {
                title: 'Change Password',
                leftIcon: { FeatherName: 'key' },
                onPress: () => navigate('/changePassword'),
            },
        ];
    type optionProp = {
        id: number;
        name: string;
        onPress: () => void;
    };
    const options: optionProp[] = [
        {
            id: 1,
            name: 'Your Order',
            onPress: () => {
                navigate('/orders');
            },
        },
    ];

    return (
        <Box className='flex-1'>
            <LinearGradient
                colors={["#a9f5ff", "#fff",]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1.5 }}
                style={{
                    borderRadius: 10,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '14%',
                }}
            />

            {/* Main content */}
            <Box className='px-3 pt-3'>
                <HStack className='w-full justify-between'>
                    <HStack className='items-center'>
                        <Box>
                            <Image
                                source={IMAGES.LOGO2}
                                style={{ height: 30, width: 30 }}
                                resizeMode="contain"
                                alt={'logo'}
                            />
                        </Box>
                        <Box>
                            <Text bold size='sm'>Viloop</Text>
                            <Text size='xs'>We Loop-In The World</Text>
                        </Box>
                    </HStack>
                    <HStack className='justify-between items-center'>
                        <NotificationIcon
                            isNotification
                            onPress={() => navigate('/notifications')}
                        />
                    </HStack>
                </HStack>
            </Box>

            {/* profile */}
            <Pressable className='flex-row items-center w-full py-3'>
                <Box className='w-1/6 ml-2'>
                    <Avatar size="md">
                        <AvatarImage
                            source={{
                                uri: data?.user?.avatar
                                    ? data?.avatar?.url
                                    : 'https://png.pngtree.com/png-vector/20220607/ourmid/pngtree-person-gray-photo-placeholder-man-silhouette-on-white-background-png-image_4853539.png',
                            }}
                        />
                    </Avatar>
                </Box>
                <VStack className='items-center justify-between'>
                    <VStack>
                        <VStack>
                            <Text size={'lg'}>Hello,<Text bold size={'lg'}>{data?.user?.name}</Text></Text>
                        </VStack>
                        <Text size={'sm'}>{data?.user?.email}</Text>
                        <Text size={'sm'}>{data?.user?.phoneNumber ? `Phone number: ${data?.user.phoneNumber}` : 'Phone number: not available'}</Text>
                    </VStack>
                </VStack>
            </Pressable>

            <Box className='p-3'>
                {listData.map((item, index) => (
                    <React.Fragment key={index}>
                        {item.isHeading ? (
                            <Heading size="lg" bold className='text-primary-600 mt-3 mb-2'>
                                {item.title}
                            </Heading>
                        ) : (
                            <Pressable onPress={() => item?.onPress?.()}>
                                <Box style={{ borderColor: "#919191", borderWidth: 0.5 }} className='flex-row border my-1 rounded-md items-center w-full py-2 justify-between'>
                                    <HStack>
                                        <AppIcon {...item.leftIcon} />
                                        <Heading className='ml-2' size="sm">{item?.title}</Heading>
                                    </HStack>
                                    <AppIcon FeatherName='chevron-right' />
                                </Box>
                            </Pressable>
                        )}
                    </React.Fragment>
                ))}
            </Box>
        </Box>
    )
}

export default Profile
