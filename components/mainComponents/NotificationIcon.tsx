import React from 'react';
import AppIcon from './AppIcon';
import { Pressable } from '../ui/pressable';
import { Box } from '../ui/box';
import { useRouter } from 'expo-router';

const NotificationIcon = ({
    onPress,
    isNotification,
}: {
    onPress?: () => void;
    isNotification?: boolean;
}) => {
    const { navigate} = useRouter();
    return (
        <Pressable
            onPress={onPress ? onPress : () => navigate('/notifications')}
        >
            <AppIcon size={22} color={'black'} FeatherName={'bell'} />
            {isNotification && (
                <Box className='bg-error-500 h-2 w-2 rounded-full absolute top-0 left-1' />
            )}
        </Pressable>
    );
};

export default NotificationIcon;