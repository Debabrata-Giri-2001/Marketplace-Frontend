import AnimatedLottieView, {AnimationObject} from 'lottie-react-native';
import { Center } from '../ui/center';
import { useRouter } from 'expo-router';
import { Spinner } from '../ui/spinner';
import { screenWidth } from '@/styles';
import { Heading } from '../ui/heading';
import { Text } from '../ui/text';
import { Button } from '../ui/button';
import React from 'react'

type Props = {
  title: string;
  animation?: AnimationObject;
  subtitle?: string;
  action?: {
    label: string;
    onPress?: () => void;
  };
  noLoop?: boolean;
  isLoading?: boolean;
} & React.ComponentProps<typeof Center>;

export default function Empty({
  title,
  subtitle,
  action,
  animation,
  isLoading,
  noLoop = false,
  ..._centerProps
}: Props) {
  const {back} = useRouter();
  const onPress = action?.onPress ?? back;
  return (
    <>
      <Center {..._centerProps}>
        {animation && (
          <Center className='h-96 w-full'>
            {isLoading ? (
              <Spinner size={'small'} />
            ) : (
              <AnimatedLottieView source={animation} autoPlay loop={!noLoop} />
            )}
          </Center>
        )}
        {isLoading ? (
          <></>
        ) : (
          <Center className={`px-${screenWidth * 0.05}`}>
            <Heading>{title}</Heading>
            {Boolean(subtitle) && (
              <Text className='text-center my-2' size='sm'>
                {subtitle}
              </Text>
            )}
            {Boolean(action) && (
              <Button className='my-2' onPress={onPress}>
                {`${action?.label}`}
              </Button>
            )}
          </Center>
        )}
      </Center>
    </>
  );
}
