import React from 'react'
import { Box } from '../ui/box';
import { Pressable } from '../ui/pressable';
import { useRouter } from 'expo-router';

import AppIcon, { IconProps } from './AppIcon';
import { Image, ImageSourcePropType } from 'react-native';
import { Text } from '../ui/text';
import { StatusBar } from 'expo-status-bar';
import { VStack } from '../ui/vstack';
import { screenWidth } from '@/styles';
import { HStack } from '../ui/hstack';
import { LinearGradient } from 'expo-linear-gradient';


type Props = {
    title?: string;
    color?: string;
    statusColor?: string;
    image?: {
        source: ImageSourcePropType;
        height?: number;
        width?: number;
    };
    icons?: {
        icon?: IconProps;
        iconColor?: string;
        onPress?: () => void;
        side: 'LEFT' | 'RIGHT';
    }[];
    search?: boolean;
    placeHolder?: string;
    isNotification?: boolean;
} & React.ComponentProps<typeof Box>;


const PrivateContainer = ({
    title,
    color,
    statusColor,
    image,
    children,
    icons,
    search,
    placeHolder,
    isNotification,
    ..._box
}: Props) => {

    const { canGoBack, navigate, back } = useRouter();
    const leftIcon = icons?.find(_ => _.side === 'LEFT');
    const rightIcons = icons?.filter(_ => _.side === 'RIGHT');
    const bg = 'white';
    const text = 'black';

    const renderLeftIcon = () => (
        <Pressable className='bg-transparent ml-2 mr-2'
            onPress={() => leftIcon?.onPress?.() || (canGoBack() ? back() : null)}>
            <AppIcon
                size={22}
                color={text}
                {...(leftIcon?.icon || { OcticonsName: 'arrow-left' })}
            />
        </Pressable>
    );

    const renderTitleOrImage = () =>
        image ? (
            <Pressable>
                <Image
                    source={image.source}
                    alt="image"
                    style={{ height: image.height || 40, width: image.width || 40 }}
                    resizeMode="contain"
                />
            </Pressable>
        ) : (
            <Text className='text-lg font-bold'>
                {title}
            </Text>
        );

    return (
        <>
            <Box {..._box}>
                <LinearGradient
                    colors={["#a9f5ff", "#fff",]}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1.5 }}
                    style={{
                        borderRadius: 10,
                        top: 0,
                        left: 0,
                        right: 0,
                    }}
                >
                    <HStack className={`px-${screenWidth * 0.02} py-${search ? screenWidth * 0.02 : 3} items-center justify-between`}>
                        <HStack className='items-center space-y-2'>
                            {!image && renderLeftIcon()}
                            {renderTitleOrImage()}
                        </HStack>

                        <VStack className='items-center space-x-3'>
                            {rightIcons?.map((_, i) => (
                                <React.Fragment key={i}>
                                    <Pressable
                                        onPress={() => {
                                            if (_?.onPress) return _.onPress();
                                        }}>
                                        <AppIcon
                                            size={22}
                                            color={_?.iconColor ? _?.iconColor : text}
                                            {..._?.icon}
                                        />
                                    </Pressable>
                                </React.Fragment>
                            ))}
                            {isNotification && <Pressable onPress={() => navigate('/notifications')}>
                                <AppIcon MaterialIconsName="notifications" size={22} />
                            </Pressable>}
                        </VStack>
                    </HStack>
                </LinearGradient>
                {children}
            </Box >
        </>
    )
}

export default PrivateContainer
