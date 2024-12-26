import React from 'react';
import AnimatedLottieView, { AnimationObject } from 'lottie-react-native';
import { Heading } from '../ui/heading';
import { Box } from '../ui/box';
import { Image } from 'react-native';
import { Center } from '../ui/center';

type Props = {
    item: {
        title: string;
        subtitle: string;
        src?: string;
        animation?: AnimationObject;
    };
} & React.ComponentProps<typeof Box>;

export default function OnboardingSlide({
    item: { subtitle, title, src, animation },
}: Props): JSX.Element {
    return (
        <Box>
            <Heading className="text-3xl font-bold px-3">{title}</Heading>
            <Center>
                {animation ? (
                    <AnimatedLottieView
                        source={animation}
                        autoPlay
                        style={{ height: 300, width: 300 }}
                        loop
                    />
                ) : (
                    <Image
                        src={src}
                        alt={title}
                        style={{ height: 200, width: 200, resizeMode: 'contain' }}
                    />
                )}
                <Heading className="my-5 text-center text-gray-600 ">{subtitle}</Heading>
            </Center>
        </Box>
    );
}
