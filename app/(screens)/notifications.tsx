import PrivateContainer from '@/components/mainComponents/PrivateContainer';
import { Text } from '@/components/ui/text';
import { FlatList, Alert, ActionSheetIOS, Platform } from 'react-native';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { HStack } from '@/components/ui/hstack';
import { Avatar, AvatarBadge, AvatarFallbackText, AvatarImage } from '@/components/ui/avatar';
import { Heading } from '@/components/ui/heading';
import { VStack } from '@/components/ui/vstack';
import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper, ActionsheetFlatList, ActionsheetItem, ActionsheetItemText } from '@/components/ui/actionsheet';
import DeleteModal from '@/components/mainComponents/DeleteModal';
import Empty from '@/components/mainComponents/Empty';
import { ANIMATIONS } from '@/assets';

const notifications = () => {

  const [deleteId, setDeleteId] = useState<string | number | any>();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const notificationsData = [
    { id: '1', message: 'Notification 1', description: "dagf sdfa sg fadfg ashfdg asfhdg ashdfg syu", read: false },
    { id: '2', message: 'Notification 2', description: "sdfh ashgf sayfgashfgas jhfaskjf", read: true },
    { id: '3', message: 'Notification 3', description: "sfgasgf yasfasyfgaehsfg ashfe kywfg ", read: false },
    { id: '4', message: 'Notification 4', description: "sfgasgf yasfasyfgaehsfg ashfe sha a", read: false },
    { id: '5', message: 'Notification 5', description: "sfgasgf yasfasyfgaehsfg ashfe wgwa ", read: true }
  ];
  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
  ]

  const handleClose = () => {
    setDeleteModal(false);
  };


  const [showActionsheet, setShowActionsheet] = React.useState(false)
  const handleCloseActionsheet = () => setShowActionsheet(false)



  const Item = React.useCallback(
    ({ title }: any) => (
      <ActionsheetItem onPress={handleClose}>
        <ActionsheetItemText>{title}</ActionsheetItemText>
      </ActionsheetItem>
    ),
    [handleClose]
  )


  const handleDeleteAll = () => {
    setShowActionsheet(true)
  };

  const renderItem = ({ item }: any) => (
    <Pressable
      onLongPress={() => {
        setDeleteModal(true);
        setDeleteId(item.id);
        item.isLongPressed = true;
      }}
      onPressOut={() => {
        item.isLongPressed = false;
      }}
      style={[
        item.isLongPressed ? { backgroundColor: '#9e2b2b' } : {},
      ]}
    >
      <HStack className={`flex-row p-2 mt-2 mx-2 items-center rounded-md ${item.read ? "bg-secondary-300" : "bg-secondary-500"}`}>
        <Avatar size="md">
          <AvatarFallbackText>Jane Doe</AvatarFallbackText>
          <AvatarImage
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
          />

        </Avatar>
        <VStack className='ml-2'>
          <Heading>{item.message}</Heading>
          <Text>{item.description}</Text>
        </VStack>
      </HStack>
    </Pressable>
  );


  return (
    <PrivateContainer
      title="Notification"
      icons={[
        {
          icon: { EntypoName: 'dots-three-vertical' },
          side: 'RIGHT',
          onPress: handleDeleteAll,
        },
      ]}
    >
      <FlatList
        data={notificationsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Empty
            title="No Notifications Found"
            subtitle="There are no notifications available!"
            animation={ANIMATIONS.notification}
            action={{ label: 'Go Back' }}
          />
        }
      />

      <DeleteModal
        isOpen={deleteModal}
        onClose={handleClose}
        url={`notifications/${deleteId}`}
        message="This notification will be deleted permanently. Do you want to proceed?"
      />
      <Actionsheet isOpen={showActionsheet} onClose={handleCloseActionsheet}>
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <ActionsheetFlatList
            data={DATA}
            renderItem={({ item }: any) => <Item title={item.title} />}
            keyExtractor={(item: any) => item.id}
          />
        </ActionsheetContent>
      </Actionsheet>
    </PrivateContainer>
  );
};

export default notifications;