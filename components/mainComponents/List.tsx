import React from 'react';
import { Image } from 'react-native';
import { Pressable } from '../ui/pressable';
import { Avatar, AvatarFallbackText, AvatarImage } from '../ui/avatar';
import AppIcon from './AppIcon';
import { Heading } from '../ui/heading';
import { Divider } from '../ui/divider';
import { Center } from '../ui/center';
import { VStack } from '../ui/vstack';
import { Box } from '../ui/box';
import { HStack } from '../ui/hstack';

type PressableProps = React.ComponentProps<typeof Pressable>;
type AvatarProps = React.ComponentProps<typeof Avatar>;
type IconProps = React.ComponentProps<typeof AppIcon>;
type HeadingProps = React.ComponentProps<typeof Heading>;

type Props = {
    title: string;
    _title?: HeadingProps;
    subtitle?: string;
    _subtitle?: HeadingProps;
    avatar?: string;
    _avatar?: AvatarProps;
    rightIcon?: IconProps;
    leftIcon?: IconProps;
    noDivider?: boolean;
    hasSharedElement?: boolean;
} & PressableProps;

export default function List({
    title,
    _title,
    subtitle,
    _subtitle,
    avatar,
    _avatar,
    rightIcon = { FeatherName: 'chevron-right' },
    leftIcon,
    noDivider,
    ..._pressableProps
}: Props) {
    return (
        <>
            <Pressable className='flex-row items-center w-full py-3'
                {..._pressableProps}>
                <Center className={`w-${avatar || leftIcon ? '1/6' : '0'}`}>
                    {avatar ? (
                        <Avatar size="md" {..._avatar}>
                            <AvatarFallbackText>{title[0]}</AvatarFallbackText>
                            <AvatarImage
                                source={{ uri: avatar }}
                            />
                        </Avatar>
                    ) : (
                        <AppIcon {...leftIcon} />
                    )}
                </Center>
                <HStack className={`items-center ${avatar || leftIcon ? 'w-1/2' : 'w-full'} border justify-between`}>
                    <Box>
                        <Heading size="sm" {..._title}>{title}</Heading>
                        {subtitle && (<Heading className="text-primary-500" size="xs" {..._subtitle}>{subtitle}</Heading>)}
                    </Box>
                    <Box>
                        <AppIcon {...rightIcon} />
                    </Box>
                </HStack>
            </Pressable>

            {!noDivider && <Divider />}
        </>
    );
}
