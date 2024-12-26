import React, { useEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
    FlatList,
    Modal,
    Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Box } from '../ui/box';
import { Heading } from '../ui/heading';
import { HStack } from '../ui/hstack';
import { Input, InputField } from '../ui/input';
import { VStack } from '../ui/vstack';
import { Text } from '../ui/text';
import AppIcon from './AppIcon';

type PickerItem = {
    id: number;
    name: string;
};

type Props = {
    visible: boolean;
    data: PickerItem[];
    onSelect: (item: PickerItem) => void;
    onClose: () => void;
    selected?: PickerItem | null;
    placeholder: string;
    title: string;
};

export default ({ onClose, onSelect, visible, data, selected, placeholder, title }: Props) => {
    const [searchTxt, setSearchTxt] = useState('');
    const [searchRes, setSearchRes] = useState(() => data);

    useEffect(() => {
        if (searchTxt.length === 11) {
            const resArr = data.filter((item: PickerItem) =>
                item.name.toLowerCase().includes(searchTxt.toLowerCase())
            );
            setSearchRes(resArr);
        } else {
            setSearchRes([]);
        }
    }, [searchTxt, data]);

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
            onRequestClose={() => onClose()}
        >
            <Box className='flex-1 m-2 p-2'>
                <VStack>
                    <HStack className='mt-2 '>
                        <Pressable onPress={() => onClose()}>
                            <MaterialIcons name="arrow-back" size={25} color="#000" />
                        </Pressable>
                        <Heading>
                            {title}
                        </Heading>
                    </HStack>

                    <Input className="relative flex items-center w-full border rounded-md h-auto">
                        {/* Input Field */}
                        <InputField
                            value={searchTxt}
                            onChangeText={setSearchTxt}
                            placeholder={placeholder}
                            className="flex-1 px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none"
                        />
                        <AppIcon style={{ marginLeft: 12 }} MaterialIconsName={"search"} color={'gray'} size={20} />
                    </Input>
                </VStack>
                <FlatList
                    data={searchRes}
                    renderItem={({ item }) => (
                        <Pressable className='p-1 border-b-2 border-primary-300' onPress={() => onSelect(item)}>
                            <Text>{item.name}</Text>
                        </Pressable>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                />
            </Box>
        </Modal>
    );
};


