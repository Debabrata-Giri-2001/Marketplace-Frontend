import AppIcon from '@/components/mainComponents/AppIcon';
import PrivateContainer from '@/components/mainComponents/PrivateContainer';
import { Box } from '@/components/ui/box';
import { Divider } from '@/components/ui/divider';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack';
import { screenHeight, screenWidth } from '@/styles';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';


const businessDetails = () => {

  const carousel = [
    { id: 1, source: 'https://png.pngtree.com/thumb_back/fh260/background/20210910/pngtree-resort-hotel-swimming-pool-morning-swimming-pool-outdoor-photography-photographs-image_840138.jpg', offerHeading: 'Get Special Offer', subHeading: 'Up to', discount: '40%' },
    { id: 2, source: 'https://thumbs.dreamstime.com/b/tropical-waterfall-landscape-spa-resort-relaxing-37178211.jpg', offerHeading: 'Get Special Offer', subHeading: 'Up to', discount: '40%' },
    { id: 3, source: 'https://plus.unsplash.com/premium_photo-1687960116497-0dc41e1808a2?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHJlc29ydHxlbnwwfHwwfHx8MA%3D%3D', offerHeading: 'Get Special Offer', subHeading: 'Up to', discount: '35%' },
  ];

  const [activeIndex, setActiveIndex] = useState<any>(0);
  const { navigate } = useRouter();
  const [pressedBox, setPressedBox] = useState<number | null>(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const translateX = useSharedValue(0);

  const tabs = ['Overview', 'Review', 'Services', 'Gallery', 'Offers'];

  const handleTabChange = (index: number) => {
    if (index >= 0 && index < tabs.length) {
      setSelectedTab(index);
      translateX.value = withTiming(-screenWidth * index, { duration: 300 });
    }
  };

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = -selectedTab * screenWidth + event.translationX;
    },
    onEnd: (event) => {
      const threshold = 50;

      if (event.translationX < -threshold && selectedTab < tabs.length - 1) {
        // Swipe left
        runOnJS(handleTabChange)(selectedTab + 1);
      } else if (event.translationX > threshold && selectedTab > 0) {
        // Swipe right
        runOnJS(handleTabChange)(selectedTab - 1);
      } else {
        // Reset to current tab
        translateX.value = withTiming(-selectedTab * screenWidth, { duration: 300 });
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
  const iconData = [
    {
      id: 1,
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/4213/4213204.png',
      label: 'Mobile',
    },
    {
      id: 2,
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/1001/1001022.png',
      label: 'Location',
    },
    {
      id: 3,
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/18272/18272776.png',
      label: 'Website',
    },
    {
      id: 4,
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/9449/9449286.png',
      label: 'Enquery',
    },

  ];

  return (
    <PrivateContainer title='Business Details'>
      <ScrollView style={{ backgroundColor: '#FFF' }}>
        <Box className={`mb-4 h-${screenHeight / 4.5}`}>
          <Carousel
            loop
            width={screenWidth}
            height={screenHeight / 5}
            autoPlay={true}
            data={carousel}
            scrollAnimationDuration={2000}
            onSnapToItem={(index: number) => setActiveIndex(index)}
            renderItem={({ item }) => (
              <Pressable>
                <Image source={{ uri: item.source }} alt="no image" style={{ height: screenHeight / 5 }} />
              </Pressable>
            )}
          />
        </Box>
        <Box style={{ marginTop: -80 }}>
          <Box
            style={{
              shadowColor: '#000',
              backgroundColor: "#FFF",
              shadowOffset: { width: 4, height: 2 },
              shadowOpacity: 1.25,
              shadowRadius: 3.84,
              elevation: 2,
            }} className='mx-4 rounded-md'>
            <VStack className='mx-4 '>
              <HStack className='justify-between mt-2'>
                <Heading size={'lg'}>Arnapurna Resort</Heading>
                <HStack>
                  <Pressable className='ml-2'>
                    <AppIcon FeatherName="heart" size={18} color={'black'} />
                  </Pressable>

                  <Pressable className='ml-2'>
                    <AppIcon FeatherName="share-2" size={18} color={'black'} />
                  </Pressable>
                </HStack>

              </HStack>

              <VStack>
                <HStack className='items-center'>
                  <Text size={'md'} bold >4.8</Text>
                  <AppIcon FeatherName="star" size={12} color={'black'} />
                  <Text className='ml-2' size={"md"}>Ratings</Text>
                  <Text size={"sm"} className='mr-2 text-secondary-300'>(123 customer reviewed)</Text>
                </HStack>
                <Text className='text-secondary-300' size={'md'} >Nayapalli, Bhubaneswar</Text>
              </VStack>
            </VStack>

            <Box className='flex-row flex-wrap w-full ml-2'>
              {iconData.map((item) => (
                <Box key={item?.id} className='px-2 py-6 w-1/4'>
                  <Pressable className='w-[90%] h-12 rounded-md justify-center items-center'
                    onPressIn={() => setPressedBox(item.id)}
                    onPressOut={() => setPressedBox(null)}
                    onPress={() => {
                      if (item.label === 'Others') {
                        navigate('/categories');
                      } else {
                        navigate('/products');
                      }
                    }}
                  >
                    <LinearGradient
                      colors={pressedBox === item.id ? ['teal', 'mediumseagreen'] : ['white', 'white']}
                      start={{ x: 1.5, y: 1.1 }}
                      end={{ x: 0.4, y: 0.5 }}
                      style={{
                        height: '100%',
                        width: '100%',
                        borderRadius: 5,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 1,
                      }}
                    >
                      <VStack className='items-center justify-center'>
                        <Image
                          source={{ uri: item.imageUrl }}
                          alt={item.label}
                          style={{ marginTop: 2, height: 30, width: 30 }}
                        />
                      </VStack>
                    </LinearGradient>
                    <Text bold size={'xs'} className='self-center mt-2'>{item.label}</Text>
                  </Pressable>
                </Box>
              ))}
            </Box>
          </Box>

          <VStack className='m-4 ml-2 p-2' >
            <HStack className='items-center py-1' >
              <AppIcon IoniconsName="location-outline" size={16} color={'blue'} />
              <Text bold size={'md'} className='ml-2'>4 years in business</Text>
            </HStack>
            <HStack className='items-center py-1' >
              <AppIcon OcticonsName="verified" size={16} color={'green'} />
              <Text bold size={'md'} className='ml-2'>Verified business</Text>
            </HStack>
            <HStack className='items-center py-1' >
              <AppIcon FeatherName="send" size={16} color={'black'} />
              <Text bold size={'md'} className='ml-2'>58 enquiries</Text>
            </HStack>
          </VStack>

          {/* side component */}
          <HStack style={{borderColor:"#018f9c",borderWidth:0.5}} className="mt-4 p-1 mx-2 justify-around rounded-md border">
            {tabs.map((tab, index) => (
              <Pressable className={`bg-${selectedTab === index ? "info-700" : ""} rounded-md`} key={tab} onPress={() => handleTabChange(index)}>
                <Text className={`p-1 px-3  text-${selectedTab === index ? "secondary-100" : "secondary-900"}`}>
                  {tab}
                </Text>
              </Pressable>
            ))}
          </HStack>

          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={{ overflow: 'hidden', width: screenWidth }}>
              <Animated.View
                style={[
                  animatedStyle,
                  { flexDirection: 'row', width: screenWidth * tabs.length },
                ]}
              >
                {tabs.map((tab, index) => (
                  <Box key={index} style={{ width: screenWidth }}>
                    {selectedTab === index && (
                      <Text>{`${tab} content goes here`}</Text>
                    )}
                  </Box>
                ))}
              </Animated.View>
            </Animated.View>
          </PanGestureHandler>
        </Box>
      </ScrollView>
    </PrivateContainer>
  )
}

export default businessDetails;
