import { useRouter } from 'expo-router';
import React, { useState } from 'react'
import { Image, ScrollView } from 'react-native';
import { Box } from '../ui/box';
import { Pressable } from '../ui/pressable';
import { Text } from '../ui/text';
import { VStack } from '../ui/vstack';
import { LinearGradient } from '../ui/LinearGradient';

const CategorySerice = () => {
    const [pressedBox, setPressedBox] = useState<number | null>(null);

    const { navigate } = useRouter();
    const router = useRouter();

    const iconData = [
        {
            id: 1,
            imageUrl: 'https://cdn-icons-png.flaticon.com/512/6054/6054843.png',
            label: 'Tech Shop',
        },
        {
            id: 2,
            imageUrl: 'https://yard-ecommerce-web.vercel.app/asset/category/Laboratory_icon.png',
            label: 'Beauty',
        },
        {
            id: 3,
            imageUrl: 'https://yard-ecommerce-web.vercel.app/asset/category/Laboratory_icon.png',
            label: 'Food',
        },
        {
            id: 4,
            imageUrl: 'https://yard-ecommerce-web.vercel.app/asset/category/Monitoring_icon.png',
            label: 'Hotel',
        },
        {
            id: 5,
            imageUrl: 'https://cdn-icons-png.flaticon.com/512/5996/5996405.png',
            label: 'Gym',
        },
        {
            id: 6,
            imageUrl: 'https://yard-ecommerce-web.vercel.app/asset/category/Laboratory_icon.png',
            label: 'Barbor',
        },
        {
            id: 7,
            imageUrl: 'https://yard-ecommerce-web.vercel.app/asset/category/Monitoring_icon.png',
            label: 'Grosory',
        },
        {
            id: 8,
            imageUrl: 'https://cdn-icons-png.flaticon.com/512/6054/6054843.png',
            label: 'Medicines',
        },
        {
            id: 9,
            imageUrl: 'https://yard-ecommerce-web.vercel.app/asset/category/Laboratory_icon.png',
            label: 'Clinic',
        },
        {
            id: 10,
            imageUrl: 'https://cdn-icons-png.flaticon.com/512/5996/5996405.png',
            label: 'Garage',
        },
        {
            id: 11,
            imageUrl: 'https://yard-ecommerce-web.vercel.app/asset/category/Laboratory_icon.png',
            label: 'Garments',
        },
        {
            id: 12,
            imageUrl: 'https://cdn-icons-png.flaticon.com/512/5996/5996405.png',
            label: 'More',
        },

    ];

    return (
        <Box className='flex-row flex-wrap w-full ml-1'>
            {iconData.map((item) => (
                <Box className='w-1/4 px-4 py-6' key={item?.id}>
                    <Pressable className='w-[90%] h-12 rounded-sm justify-center items-center'
                        onPressIn={() => setPressedBox(item.id)}
                        onPressOut={() => setPressedBox(null)}
                        onPress={() => {
                            navigate({ pathname: `/categories`, params: { "categoriesType": item?.label } })
                        }}
                    >
                        <LinearGradient
                            colors={pressedBox === item.id ? ['teal', 'mediumseagreen'] : ['white', 'white']}
                            start={{ x: 1.5, y: 1.1 }}
                            end={{ x: 0.4, y: 0.5 }}
                            style={{
                                height: '100%',
                                width: '100%',
                                borderRadius: 10,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 3,
                            }}
                        >
                            <VStack className='items-center justify-center'>
                                <Image
                                    source={{ uri: item.imageUrl }}
                                    alt={item.label}
                                    style={{ height: 25, width: 25, marginTop: 2 }}
                                />
                            </VStack>
                        </LinearGradient>
                        <Text className={`font-bold text-sm self-center mt-2 text-${pressedBox === item.id ? 'red' : 'grey'}`} >{item.label}</Text>
                    </Pressable>
                </Box>
            ))}
        </Box>
    );
}

export default CategorySerice
