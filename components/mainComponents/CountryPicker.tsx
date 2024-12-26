import { Countries } from '@/constant';
import React, { useEffect, useState } from 'react'
import {
    Actionsheet,
    ActionsheetBackdrop,
    ActionsheetContent,
    ActionsheetDragIndicator,
    ActionsheetDragIndicatorWrapper,
    ActionsheetItem,
    ActionsheetItemText,
    ActionsheetIcon,
} from '@/components/ui/actionsheet';
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native';
import { Image } from 'react-native';
import { Heading } from '../ui/heading';
import { VStack } from '../ui/vstack';
import { HStack } from '../ui/hstack';
import { Pressable } from '../ui/pressable';
import { MaterialIcons } from '@expo/vector-icons';
import { Icon } from '../ui/icon';
import AppIcon from './AppIcon';
import { Input, InputField } from '../ui/input';

type Props = {
    visible: boolean;
    onSelect: (country: any) => void;
    onClose: () => void;
    selectedCountry?: any;
};

const CountryPicker = ({ onClose, onSelect, visible }: Props) => {

    const [searchTxt, setSearchTxt] = useState('');
    const [searchRes, setSearchRes] = useState(() => Countries);
    useEffect(() => {
        if (searchTxt) {
            const resArr = Countries?.filter((item: any) =>
                item?.name?.toLowerCase().includes(searchTxt.toLowerCase()),
            );
            setSearchRes(resArr);
        } else {
            setSearchRes(Countries);
        }
    }, [searchTxt]);

    return (
        <Actionsheet
            className='bg-secondary-50'
            animationPreset='slide'
            isOpen={visible}
            onClose={onClose}
            snapPoints={[36]}
        >
            <TouchableWithoutFeedback onPress={() => onClose()}>
                <SafeAreaView style={styles.container}>
                    <VStack className='w-full self-center'>
                        <HStack className='mt-2' >
                            <Pressable onPress={() => onClose()}>
                                <MaterialIcons name="arrow-back" size={25} color="#000" />
                            </Pressable>
                            <Heading className='self-center text-lg'>
                                Select Your Country
                            </Heading>
                        </HStack>


                        <Input className="relative flex items-center w-full border rounded-md h-auto">
                            {/* Input Field */}
                            <InputField
                                value={searchTxt}
                                onChangeText={setSearchTxt}
                                placeholder={"Search by country name"}
                                className="flex-1 px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none"
                            />
                            <AppIcon style={{ marginLeft: 12 }} MaterialIconsName={"search"} color={'gray'} size={20} />

                        </Input>


                    </VStack>

                    <FlatList
                        keyboardShouldPersistTaps="always"
                        data={searchRes}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.flagWrapper}
                                onPress={() => onSelect(item)}>
                                <Image
                                    source={{
                                        uri: `https://flagcdn.com/w20/${item.code.toLowerCase()}.png`,
                                    }}
                                    alt="country"
                                    style={styles.flag}
                                />
                                <Heading>{item.name}</Heading>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.code}
                        showsVerticalScrollIndicator={false}
                    />
                </SafeAreaView>
            </TouchableWithoutFeedback>

        </Actionsheet>
    )
}

export default CountryPicker;

const styles = StyleSheet.create({
    flag: {
        width: 20,
        height: 20,
        marginRight: 10,
        resizeMode: 'contain',
    },
    flagWrapper: { padding: 10, flexDirection: 'row' },
    container: {
        flex: 1,
        padding: 10,
    },
});