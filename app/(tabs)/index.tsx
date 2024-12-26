import { IMAGES } from '@/assets';
import AppIcon, { IconProps } from '@/components/mainComponents/AppIcon';
import List from '@/components/mainComponents/List';
import NotificationIcon from '@/components/mainComponents/NotificationIcon';
import { Box } from '@/components/ui/box';
import { Menu, MenuItem, MenuItemLabel } from '@/components/ui/menu';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useAuth } from '@/hooks';
import { screenHeight, screenWidth } from '@/styles';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import CategorySerice from '@/components/mainComponents/CategorySerice';
import { SettingsIcon, HelpCircleIcon, Icon } from '@/components/ui/icon';

const Home = () => {
    const { navigate, back } = useRouter();
    const { logout } = useAuth();
    const [activeIndex, setActiveIndex] = useState<any>(0);

    const carousel = [
        { id: 1, source: 'https://as2.ftcdn.net/v2/jpg/01/28/27/25/1000_F_128272591_ihpgDbs0wxhxRuvQJ8NMi1yniMhBC4wl.jpg', offerHeading: 'Get Special Offer', subHeading: 'Up to', discount: '40%' },
        { id: 2, source: 'https://as2.ftcdn.net/v2/jpg/01/28/27/25/1000_F_128272591_ihpgDbs0wxhxRuvQJ8NMi1yniMhBC4wl.jpg', offerHeading: 'Get Special Offer', subHeading: 'Up to', discount: '40%' },
        { id: 3, source: 'https://cdn1.vectorstock.com/i/1000x1000/96/35/grand-offer-sale-and-discount-banner-template-vector-14299635.jpg', offerHeading: 'Get Special Offer', subHeading: 'Up to', discount: '35%' },
        { id: 4, source: 'https://cdn1.vectorstock.com/i/1000x1000/96/35/grand-offer-sale-and-discount-banner-template-vector-14299635.jpg', offerHeading: 'Get Special Offer', subHeading: 'Up to', discount: '90%' }
    ];


    const listData: {
        title: string;
        subtitle?: string;
        avatar?: string;
        leftIcon?: IconProps;
        isHeading?: boolean;
        onPress?: () => void;
    }[] = [
            {
                title: 'Support',
                onPress: () => navigate('/support'),
            },
            {
                title: 'Logout',
                onPress: () => logout(),
            },
            {
                title: 'All Manufacturer',
                onPress: () => navigate('/manufacturers'),
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
                    height: '12%',
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
                    <HStack className='w-1/5 justify-between items-center'>
                        <Pressable
                            onPress={() => navigate('/orders')}
                        >
                            <AppIcon FeatherName="shopping-bag" size={22} />
                        </Pressable>

                        <NotificationIcon
                            isNotification
                            onPress={() => navigate('/notifications')}
                        />

                        <Menu
                            placement='left top'
                            trigger={triggerProps => {
                                return (
                                    <Pressable
                                        accessibilityLabel="More options menu"
                                        {...triggerProps}>
                                        <AppIcon EntypoName="dots-three-vertical" size={22} />
                                    </Pressable>
                                );
                            }}>
                            {listData.map((item, index) => (
                                <MenuItem
                                    key={index}
                                    textValue={item.title}
                                    className="p-2 web:min-w-[294px] min-w-[225px]"
                                    onPress={() => item?.onPress?.()}
                                >
                                    <MenuItemLabel size="sm">{item?.title}</MenuItemLabel>
                                </MenuItem>

                            ))}
                        </Menu>                        
                    </HStack>
                </HStack>
            </Box>

            <Box className='mx-0.5'>
                <TouchableOpacity style={[styles.container]} activeOpacity={0.8}>
                    <Text className='ml-2'>Search for</Text>
                    <AppIcon MaterialIconsName='search' color={'gray'} size={20} />

                    <View style={styles.divider} />
                    <AppIcon MaterialIconsName='mic' color={"#4499ca"} size={20} />
                </TouchableOpacity>
            </Box>

            <ScrollView className='mt-2 mb-20' showsVerticalScrollIndicator={false}>
                <Box>
                    <Carousel
                        loop
                        width={screenWidth}
                        height={screenHeight / 5}
                        autoPlay={true}
                        data={carousel}
                        scrollAnimationDuration={1000}
                        onSnapToItem={(index: number) => setActiveIndex(index)}
                        renderItem={({ item }: any) => (
                            <Pressable className="rounded-lg">
                                <Box className="flex justify-center items-center">
                                    <Image
                                        source={{ uri: item.source }}
                                        alt="no image"
                                        style={{
                                            width: screenWidth - 20,
                                            height: screenHeight / 5,
                                            alignSelf: 'center',
                                            borderRadius: 12,
                                        }}
                                    />
                                </Box>
                                <Box className="bg-secondary-50 rounded-lg absolute p-1 px-2 ml-3 mt-3">
                                    <Text className="text-xs">Limited time!</Text>
                                </Box>

                                <HStack className="absolute bottom-0 p-2 px-4 space-x-2">
                                    <HStack className="justify-between">
                                        <Text className="w-full text-secondary-50">*Terms and Conditions applied</Text>
                                    </HStack>
                                </HStack>

                                <HStack className="right-2 top-3 absolute self-end p-2 space-x-3">
                                    <AppIcon FeatherName="share-2" size={20} color={'#fff'} />
                                </HStack>
                                <HStack className="absolute self-end bottom-0 p-1 right-5">
                                    <Pressable onPress={() => navigate('/products')}>
                                        <Heading className="p-1 bg-info-500 rounded-md text-secondary-50">
                                            Claim Now
                                        </Heading>
                                    </Pressable>
                                </HStack>
                            </Pressable>
                        )}
                    />

                    <HStack className="self-center bottom-0 p-2 rounded-md">
                        {carousel.map((_, index) => (
                            <Box key={index}
                                className={`h-2 w-2 rounded-full m-2 ml-3' ${activeIndex === index ? 'bg-info-800 w-4' : 'bg-primary-100'}`}
                            />
                        ))}
                    </HStack>
                </Box>

                <Box>
                    <Heading className='mx-2' size={'sm'}>Categories</Heading>
                    <CategorySerice />


                    <Pressable className='rounded-md mx-3 border'>
                        <HStack className='justify-between p-2 items-center'>
                            <Heading>Grow your business</Heading>
                            <Pressable className='rounded-sm bg-info-700'>
                                <Text size='sm' className='px-6 py-2 font-bold text-secondary-100'>Click Here</Text>
                            </Pressable>
                        </HStack>
                    </Pressable>
                </Box>



                <HStack className='justify-between p-2 mb-3 mt-5 items-center mx-2'>
                    <Heading>Top Business</Heading>
                    <AppIcon MaterialIconsName='arrow-forward' size={20} color={"#121212"} />
                </HStack>


                <Pressable onPress={()=>navigate('/businessDetails')} className='border-l-2 border-r-2 py-1 rounded-md m-2 mx-3'>
                    <HStack className='p-2 justify-around'>
                        <Box >
                            <Image
                                borderRadius={10}
                                width={screenWidth * 0.33}
                                height={screenHeight * 0.11}
                                source={{
                                    uri: `https://www.coinstreet.org/sites/default/files/styles/banner_image/public/2023-06/Colombo%20centre%20gym%20weights.jpg?itok=Fh89o5ZM`,
                                }}
                                alt="logo"
                            />
                        </Box>
                        <VStack className='self-start border'>
                            <VStack>
                                <Heading size={'xs'}>Psyso pro active Gym</Heading>
                            </VStack>
                            <HStack className='items-center'>
                                <Pressable className='items-center justify-center rounded-md h-5 w-5'>
                                    <AppIcon AntDesignName='star' size={15} color={'#d49306'} />
                                </Pressable>
                                <Heading size={'xs'}>4.3</Heading>
                                <Text>105 Ratings</Text>

                            </HStack>

                            <HStack>
                                <AppIcon FeatherName='check-circle' size={18} color={'green'} />
                                <Text className='font-bold' >75 Enquries</Text>
                            </HStack>
                            <HStack>
                                <AppIcon SimpleLineIconsName='location-pin' size={12} color={'gray'} />
                                <Text className='font-bold'>3.2 km away</Text>
                            </HStack>
                        </VStack>
                        <Box>
                            <AppIcon AntDesignName='hearto' size={12} color={'black'} />
                        </Box>
                    </HStack>
                </Pressable>

                <Box>
                    <HStack className='justify-between p-2 items-center mx-2'>
                        <Heading size={'sm'}>Popular Category</Heading>
                        <AppIcon MaterialIconsName='arrow-forward' size={20} color={"#121212"} />
                    </HStack>

                </Box>
            </ScrollView>
        </Box>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
        borderWidth: 0.6,
        borderColor: "#ebf6ff4",
        marginTop: 15,
        overflow: 'hidden',
        marginHorizontal: 15,
        paddingHorizontal: 10,
        height: 35,
    },
    textContainer: {
        width: '90%',
        paddingLeft: 10,
        height: 40,
    },
    divider: {
        width: 1,
        height: 24,
        backgroundColor: '#ddd',
        marginHorizontal: 10
    }
})
