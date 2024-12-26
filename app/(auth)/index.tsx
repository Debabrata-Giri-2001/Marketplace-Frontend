import { ANIMATIONS } from '@/assets';
import { useRouter } from 'expo-router';
import { Box } from '@/components/ui/box'
import React, { useRef, useState } from 'react';
import { HStack } from '@/components/ui/hstack';
import { Center } from '@/components/ui/center';
import { Pressable } from '@/components/ui/pressable';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { FlatList, ViewToken, useWindowDimensions } from 'react-native';
import OnboardingSlide from '@/components/mainComponents/OnboardingSlide';

const OnboardingScreens = [
  {
    id: 1,
    animation: ANIMATIONS.onBoardingOne,
    title: 'Welcome to Viloop!',
    subtitle: 'Ignite Your Enterprise Synergy with Effortless Collaboration.',
  },
  {
    id: 2,
    animation: ANIMATIONS.b2b,
    title: 'Seamless Networking Magic',
    subtitle: 'Elevating Your Corporate Connections for Peak Productivity.',
  },
  {
    id: 3,
    animation: ANIMATIONS.onBoardingThree,
    title: 'Unleash Business Brilliance.',
    subtitle: 'Your Gateway to Amplified Enterprise Engagement.',
  },
];

const OnBoarding = () => {
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const windowDimensions = useWindowDimensions();

  const onViewableItemsChanged = useRef<
    (info: { viewableItems: Array<ViewToken> }) => void
  >(({ viewableItems }) => {
    if (typeof viewableItems?.[0]?.index !== 'number') return;
    setCurrentPage(viewableItems?.[0]?.index);
  });


  return (
    <Box className='h-full bg-white'>
      <HStack className="justify-end p-2">
        <Pressable className="p-2"
          onPress={() =>
            currentPage === OnboardingScreens.length - 1
              ? router.replace('/login')
              : flatListRef.current?.scrollToIndex({
                animated: true,
                index: OnboardingScreens.length - 1,
              })
          }>
          <Heading>
            {currentPage == OnboardingScreens.length - 1 ? 'Done' : 'Skip'}
          </Heading>
        </Pressable>
      </HStack>
      <FlatList
        data={OnboardingScreens}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        initialNumToRender={1}
        extraData={windowDimensions}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 100 }}
        renderItem={({ item }) => (
          <Box style={{ width: windowDimensions.width }}>
            <OnboardingSlide item={item} />
          </Box>
        )}
      />
      {/* The Dots */}
      <Center className='pb-16'>
        <HStack className="space-x-2">
          {[...Array(OnboardingScreens.length)].map((_, index) => (
            <Pressable
              onPress={() =>
                flatListRef.current?.scrollToIndex({ animated: true, index })
              }
              key={index}
              style={{
                width: index === currentPage ? 24 : 8,
                height: 8,
                backgroundColor: index === currentPage ? 'rgba(59, 130, 246, 1)' : 'rgba(96, 165, 250, 1)',
                borderRadius: 4,
                marginHorizontal: 4,
              }}
              className="bg-primary-500"
            >
            </Pressable>
          ))}
        </HStack>
      </Center>
    </Box>
  )
}

export default OnBoarding
