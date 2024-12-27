import { ANIMATIONS } from '@/assets'
import Empty from '@/components/mainComponents/Empty'
import PrivateContainer from '@/components/mainComponents/PrivateContainer'
import { Avatar } from '@/components/ui/avatar'
import { Box } from '@/components/ui/box'
import { Button, ButtonText } from '@/components/ui/button'
import { HStack } from '@/components/ui/hstack'
import { Spinner } from '@/components/ui/spinner'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import { useRouter } from 'expo-router'
import React from 'react'
import { FlatList } from 'react-native'
import {RefreshControl} from 'react-native-gesture-handler';
import moment from "moment";
import { useFetch } from '@/hooks/useAPI'

const support = () => {

  const { navigate } = useRouter();
  const {data: supportData, isLoading, mutate} = useFetch<any>(``);

  const supportDetails:any = [];
  return (
    <PrivateContainer title="Support">

      {isLoading ? (
        <Spinner size={'large'} />
      ) : (
        <FlatList style={{padding:2}}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={mutate} />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: '15%' }}
          ListEmptyComponent={
            <Empty
              title="No support Request Yet"
              subtitle=""
              animation={ANIMATIONS.search}
              action={{ label: 'Go Back' }}
            />
          }
          data={supportDetails}
          renderItem={({ item }) => {
            return (
              <>
                <Box className='my-2 mx-2 rounded-md bg-secondary-50'>
                  <Box className='p-2 justify-center'>
                    <HStack className='items-center'>
                      <Avatar size={'md'}>
                        <Text className='uppercase' bold size="sm">
                          {item?.title?.charAt(0)}
                        </Text>
                      </Avatar>
                      <VStack>
                        <Text bold className='uppercase'>
                          {item?.title}
                        </Text>
                        <Text size="md" className='uppercase'>
                          {item?.message}
                        </Text>

                        <Text>
                          {moment(item?.createdAt).format('ll')}{' , '}{moment(item?.createdAt).format('LT')}
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                </Box>
              </>
            );
          }}
        />
      )}

      <Box className='p-3'>
        <Button className='w-full py-3 p-2' onPress={() => navigate('/getHelp')}>
          <ButtonText>Send Message</ButtonText>
        </Button>
      </Box>
    </PrivateContainer>
  )
}

export default support
