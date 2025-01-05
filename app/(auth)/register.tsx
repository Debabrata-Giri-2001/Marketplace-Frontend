import AppIcon from "@/components/mainComponents/AppIcon";
import AppInput from "@/components/mainComponents/AppInput";
import CountryPicker from "@/components/mainComponents/CountryPicker";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { useToast } from "@/components/ui/toast";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Image, ScrollView } from "react-native";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useChange } from "@/hooks/useAPI";
import AppSelect from "@/components/mainComponents/AppSelect";
import { VStack } from "@/components/ui/vstack";
import * as ImagePicker from 'expo-image-picker';
import { Input, InputField } from "@/components/ui/input";

type InputType = {
  key: string;
  label: string;
  placeholder: string;
  icon: Record<string, string>;
  rules: Record<string, any>;
  inputProps?: Record<string, any>;
};

type FormData = {
  [key: string]: string;
};

type PickerItem = {
  id: number;
  name: string;
};
type SelectedImage = {
  uri: string;
  fileSize?: number;
};


const serviceProvider = [
  {
    id: 1,
    name: 'Gym',
  },
  {
    id: 2,
    name: 'Restaurants',
  },
  {
    id: 3,
    name: 'It Service',
  },
  {
    id: 4,
    name: 'Beauty Parlour',
  },
  {
    id: 5,
    name: 'Barber Shops ',
  },
  {
    id: 6,
    name: 'Rental Service',
  },
];


export default function Register(): JSX.Element {
  const router = useRouter();
  const toast = useToast();
  const { change, isChanging } = useChange();

  const [manufactureVisible, setManufactureVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState<PickerItem | null>(null);
  const [showError, setShowError] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [selectService, setSelectService] = useState("")
  const [selectedCountry, setSelectedCountry] = useState({ code: 'IN', name: 'India', phone: '91' });
  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);
  const [inputServiceOffer, setInputServiceOffer] = useState("");
  const [serviceOffer, setSetServiceOffer] = useState<any>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();


  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date: any) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const handleSelect = (item: PickerItem) => {
    setSelectService(item?.name);
    setManufactureVisible(false);
  };

  const pickImages = async (setSelectedImages: React.Dispatch<React.SetStateAction<SelectedImage[]>>) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled && result.assets) {
        const validImages = result.assets.filter(
          (image: SelectedImage) => (image.fileSize || 0) / (1024 * 1024) <= 2 // Check fileSize <= 2MB
        );

        if (validImages.length < result.assets.length) {
          Alert.alert(
            'File Size Limit',
            'Some images exceeded the 2MB limit and were not added.'
          );
        }

        setSelectedImages((prev: SelectedImage[]) =>
          [...prev, ...validImages].filter(
            (item, index, arr) => arr.findIndex((img) => img.uri === item.uri) === index
          )
        );
      }
    } catch (error) {
      console.error('Error picking images:', error);
    }
  };

  const deselectImage = (uri: string) => {
    setSelectedImages((prev) => prev.filter((image) => image.uri !== uri));
  };

  const handleAddServiceOffer = () => {
    if (inputServiceOffer.trim()) {
      setSetServiceOffer((prevItems: any) => [...prevItems, inputServiceOffer]);
      setInputServiceOffer("");
    }
  };

  const handleDeselectServiceOffer = (item: any) => {
    setSetServiceOffer((prev: any) => prev.filter((service: any) => service !== item));
  };

  const Distributer: InputType[] = [
    {
      key: 'businessName',
      label: 'Business Name',
      placeholder: 'Enter your Business name',
      icon: { IoniconsName: 'business' },
      rules: {
        required: 'Fullname is required',
      },
      inputProps: { autoCapitalize: 'none', marginBottom: '2' },
    },
    {
      key: 'phone',
      label: 'Mobile number',
      placeholder: 'Enter your mobile number',
      icon: { IoniconsName: 'call', color: 'gray' },
      rules: {
        required: 'Mobile number is required',
        pattern: {
          value: /^[0-9]{10}$/,
          message: 'Invalid mobile number',
        },
      },
      inputProps: {
        keyboardType: 'numeric',
        autoCapitalize: 'none',
        variant: 'underlined',
        bg: 'white',
      },
    },
    {
      key: 'email',
      label: 'Email',
      placeholder: 'Enter Email',
      icon: { FeatherName: 'mail' },
      rules: {
        required: 'Username is required',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'Invalid email address',
        },
      },
      inputProps: {
        keyboardType: 'email-address',
        autoCapitalize: 'none',
        marginBottom: '2',
      },
    },
    {
      key: 'gst',
      label: 'GSTID',
      placeholder: 'Enter GSTIN',
      icon: { MaterialCommunityIconsName: 'numeric' },
      rules: {
        required: 'GSTIN is required',
        pattern: {
          value:
            /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{2}[0-9]{1}$/,
          message: 'Invalid GST number',
        },
      },
      inputProps: { autoCapitalize: 'none' },
    },
    {
      key: 'address',
      label: 'Address',
      placeholder: 'Enter your Address',
      icon: { IoniconsName: 'location-outline' },
      rules: {
        required: 'Address is required',
      },
      inputProps: {
        autoCapitalize: 'none',
        marginBottom: '2',
      },
    },
    {
      key: 'webSiteLink',
      label: 'Web Site Link',
      placeholder: 'Enter your Web Site Link',
      icon: { AntDesignName: 'link' },
      rules: {
        required: 'Web Site Link is required',
      },
      inputProps: {
        autoCapitalize: 'none',
        marginBottom: '2',
      },
    },
  ]

  const handleRegistration = async (data: FormData) => { };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}>
        <Center className="flex-grow px-4 w-full mt-2 mb-5">
          <Heading className="text-primary-100 m-5">Create Business Account</Heading>
          {Distributer.map(input => (
            <AppInput
              input={input}
              key={input.key}
              control={control}
              errorMessage={errors?.[input?.key]?.message}
              leftElement={input.key === 'phone' ? (
                <Pressable onPress={() => setVisible(true)}>
                  <HStack className="items-center">
                    <Image
                      style={{
                        height: 30,
                        width: 30,
                        alignSelf: "center",
                        resizeMode: 'contain',
                        borderRadius: 2,
                        marginLeft: 8
                      }}
                      source={{
                        uri: `https://flagcdn.com/w160/${selectedCountry.code.toLocaleLowerCase()}.webp`,
                      }}
                      alt="IN"
                    />
                    <AppIcon
                      AntDesignName="caretdown"
                      color={'#000'}
                      size={10}
                      style={{ marginLeft: 2 }}
                    />
                  </HStack>
                </Pressable>
              ) : undefined}
            />
          ))}

          <Box className="w-full mb-4 px-3 my-1">
            <Text className="mb-2 text-sm font-medium text-gray-700">Business Open Date</Text>
            <Box className="max-w-full">
              <Pressable onPress={() => setDatePickerVisible(true)}>
                <Box className="border rounded-md border-primary-50 py-2">
                  <HStack className="items-center">
                    <AppIcon AntDesignName="calendar" color={'gray'} />
                    <Text
                      className="text-sm pl-4 text-primary-900 ">
                      {selectedDate
                        ? new Date(selectedDate).toLocaleDateString()
                        : 'Select Business Open Date'}
                    </Text>
                  </HStack>
                </Box>
              </Pressable>
              {showError && (
                <Text className="font-bold text-error-500">* Please select Date</Text>
              )}
            </Box>
          </Box>


          <Box className="w-full mb-4 px-3 my-1">
            <Text className="mb-2 text-sm font-medium text-gray-700">Service Type</Text>
            <Box className="w-full">
              <Pressable className="rounded-md p-3 px-4 min-w-full border border-primary-50"
                onPress={() => setManufactureVisible(true)}>
                <HStack className="flex justify-between">
                  <HStack>
                    <AppIcon
                      FontAwesomeName="building-o"
                      size={20}
                      color={'gray'}
                    />
                    <Text className="text-lg ml-1 text-primary-300">{selectService === "" ? "Select Service Type" : selectService}</Text>
                  </HStack>
                  <AppIcon OcticonsName="chevron-down" size={20} />
                </HStack>
              </Pressable>
            </Box>

            {/* choes what you offer's */}
            <Input className="relative flex items-center w-full border rounded-md h-auto mt-2">
              <AppIcon
                style={{ marginLeft: 12 }}
                MaterialCommunityIconsName="offer"
                size={20}
                color={'gray'}
              />
              <InputField
                className="flex-1 px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none"
                value={inputServiceOffer}
                onChangeText={setInputServiceOffer}
                onEndEditing={handleAddServiceOffer}
                placeholder="Enter Service Offer..." />
            </Input>

            <HStack className="mx-2">
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {serviceOffer?.map((i: any, index: number) => (
                  <Pressable key={index} onPress={() => handleDeselectServiceOffer(i)} className="flex-row items-center">
                    <VStack className="p-2 border rounded-full border-info-300 flex-row items-center">
                      <Text className="mr-2">{i}</Text>
                      <AppIcon
                        EntypoName="cross"
                        size={20}
                        color={'gray'}
                      />
                    </VStack>
                  </Pressable>
                ))}
              </ScrollView>
            </HStack>

          </Box>

          {/* photo picker */}
          <Box className="w-full mb-4 px-3 my-1">
            <Pressable onPress={() => pickImages(setSelectedImages)}>
              <Box className="w-full border rounded-md border-primary-50 p-1 py-2">
                <HStack className="w-full items-center">
                  <AppIcon FontAwesomeName="photo" color={'gray'} />
                  <Text className="text-sm pl-4 text-primary-900 ">
                    Pick Images
                  </Text>
                </HStack>
              </Box>
            </Pressable>
            <HStack className="mx-2">
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {selectedImages.map((item: any, index) => (
                  <VStack key={index} className="mx-1 p-1 items-center">
                    <Image
                      source={{ uri: item.uri }}
                      style={{ width: 100, height: 100 }}
                    />
                    <Pressable
                      onPress={() => deselectImage(item.uri)}
                      className="p-1"
                    >
                      <AppIcon MaterialCommunityIconsName="delete" color={'red'} />
                    </Pressable>
                  </VStack>
                ))}
              </ScrollView>
            </HStack>
          </Box>
          <Box>

          </Box>
          <Pressable
            className="w-4/5 rounded-3xl bg-primary-500"
            onPress={() => { }}
          >
            {isChanging ? (
              <HStack className="py-2 justify-center">
                <Spinner className="self-center" color="white" />
                <Text className="text-secondary-500 font-semibold text-lg">Loading...</Text>

              </HStack>
            ) : (
              <HStack className="py-2 justify-center">
                <Text className="text-secondary-500 font-semibold text-lg">Sign Up</Text>
              </HStack>
            )}
          </Pressable>

          <Box className="items-center flex-row mt-4">
            <Text className="text-black font-normal text-sm mr-2">Already have an account?</Text>
            <Link href="/login" className="no-underline">
              <Text className="text-sm text-black underline">Login</Text>
            </Link>
          </Box>
        </Center>
      </ScrollView>

      <CountryPicker
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        onSelect={(country: any) => {
          setSelectedCountry(country);
          setVisible(false);
        }}
      />
      <DateTimePickerModal
        date={selectedDate}
        isVisible={datePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <AppSelect
        visible={manufactureVisible}
        data={serviceProvider}
        onSelect={handleSelect}
        onClose={() => setManufactureVisible(false)}
        selected={selectedItem}
        placeholder="Search..."
        title="Choose Service Type"
      />
    </>
  );
}
