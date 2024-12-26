import { ANIMATIONS } from "@/assets";
import AppIcon, { IconProps } from "@/components/mainComponents/AppIcon";
import AppInput from "@/components/mainComponents/AppInput";
import CountryPicker from "@/components/mainComponents/CountryPicker";
import Manufacturer from "@/components/mainComponents/Manufacturer";
import { Alert, AlertText } from "@/components/ui/alert";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { CircleIcon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel } from "@/components/ui/radio";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { useToast } from "@/components/ui/toast";
import { useMutation, useSwrApi } from "@/hooks";
import { IInputProps } from "@gluestack-ui/input/lib/types";
import { Link, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Dimensions, Image, ScrollView } from "react-native";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AnimatedLottieView from 'lottie-react-native';

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

export default function Register(): JSX.Element {
  const { data } = useSwrApi('user?role=MANUFACTURER');
  const router = useRouter();
  const result = data?.data?.data;
  const HEIGHT = Dimensions.get('window').height;
  const WIDTH = Dimensions.get('window').width;
  const { mutation, isLoading } = useMutation();
  const [selectedManufactures, setSelectedManufactures] = useState<any[]>([]);
  const [manufactureVisible, setManufactureVisible] = useState(false);

  const [isManufacturePickerOpen, setIsManufacturePickerOpen] = useState(false);

  const manufacture: any = [];
  result?.map((item: any, index: number) =>
    manufacture.push({ id: item?.id, name: `Manufacturer${index}` }),
  );
  const [selectedTab, setSelectedTab] = useState<
    'distributor' | 'representative'
  >('distributor');
  const handleRemoveManufacture = (manufactureId: any) => {
    setSelectedManufactures(prevManufactures => {
      const updatedManufactures = prevManufactures.filter(
        manufacture => manufacture.id !== manufactureId,
      );

      // Console log the selected categories after removal
      return updatedManufactures;
    });
  };
  const [selectedDate, setSelectedDate] = useState();
  const selectedManufacturesIds: string[] = [];
  selectedManufactures.map(item => selectedManufacturesIds.push(item.id));
  const handleRegistration = async (data: FormData) => {
    try {
      const res = await mutation(
        `user/add-distributor-cr?isDistributor=${selectedTab === 'distributor' ? true : false
        }`,
        {
          isAlert: true,
          body: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            manufacturerIds: selectedManufacturesIds,
            storeAddress: data.address,
            password: data.password,
          },
        },
      );
      if (res?.results?.success) {
        router.navigate('/login');
      }
      console.log('resss---', res);
    } catch (error) {
      <Alert>
        <AlertText>{error instanceof Error ? error?.message : 'Something Went wrong'}</AlertText>
      </Alert>

    }
  };
  const handleCrRegistration = async (data: FormData) => {
    try {
      const res = await mutation('user/add-distributor-cr', {
        isAlert: true,
        body: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          manufacturerIds: data.ManufacturerId,
          dob: selectedDate,
          empId: data.EmployeeId,
        },
      });
      if (res?.results?.success) {
        router.navigate('/(auth)/login');
      }
      console.log('resss---', res);
    } catch (error) {
      <Alert>
        <AlertText>{error instanceof Error ? error?.message : 'Something Went wrong'}</AlertText>
      </Alert>

    }
  };
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);

  const handleTabChange = (tab: 'distributor' | 'representative') => {
    setSelectedTab(tab);
  };

  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
  const [categoryPickerVisible, setCategoryPickerVisible] = useState(false);

  const [selectedItem, setSelectedItem] = useState<PickerItem | null>(null);
  const [isCategoryPickerOpen, setIsCategoryPickerOpen] = useState(false);

  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const [showError, setShowError] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date: any) => {
    setSelectedDate(date);
    hideDatePicker();
  };
  const handleSelect = (item: PickerItem) => {
    const isAlreadySelected = selectedManufactures.some(
      manufacture => manufacture.id === item.id,
    );
    if (!isAlreadySelected) {
      const newManufacture = {
        id: item.id,
        name: item.name,
      };
      setSelectedManufactures([...selectedManufactures, newManufacture]);
    }
    setManufactureVisible(false);
  };
  const toast = useToast();
  const [visible, setVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    code: 'IN',
    name: 'India',
    phone: '91',
  });
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntry1, setSecureTextEntry1] = useState(true);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleRemoveCategory = (categoryId: any) => {
    setSelectedCategories(prevCategories => {
      const updatedCategories = prevCategories.filter(
        category => category.id !== categoryId,
      );
      console.log('Selected Categories:', updatedCategories);
      return updatedCategories;
    });
  };

  const Distributer: InputType[] = [
    {
      key: 'name',
      label: 'Name',
      placeholder: 'Enter your full name',
      icon: { AntDesignName: 'user' },
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
      key: 'password',
      label: 'Password',
      placeholder: 'Password',
      icon: { FeatherName: 'lock' },
      rules: {
        required: 'Password is required',
        minLength: {
          value: 6,
          message: 'Password must be at least 6 characters long',
        },
      },
      inputProps: {
        secureTextEntry,
        rightElement: (
          <Button className="text-xs color-black"
            onPress={() => setSecureTextEntry(!secureTextEntry)}>
            <ButtonText className="text-secondary-100">
              {secureTextEntry ? <AppIcon IoniconsName="eye-off" size={20} /> : <AppIcon IoniconsName="eye" size={20} />}
            </ButtonText>
          </Button>
        ),
      },
    },
    {
      key: 'confirmPassword',
      label: 'Confirm Password',
      placeholder: 'Confirm Password',
      icon: { FeatherName: 'lock' },
      rules: {
        required: 'Confirm Password is required',
        validate: {
          matchesPassword: (value: any, { password }: any) => {
            return value === password || 'Passwords do not match';
          },
        },
      },
      inputProps: {
        secureTextEntry,
        rightElement: (
          <Button className="text-xs color-black"
            onPress={() => setSecureTextEntry(!secureTextEntry)}>
            <ButtonText className="text-secondary-100">
              {secureTextEntry ? <AppIcon IoniconsName="eye-off" size={20} /> : <AppIcon IoniconsName="eye" size={20} />}
            </ButtonText>
          </Button>
        ),
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
  ]

  const Representative: InputType[] = [
    {
      key: 'name',
      label: 'Name',
      placeholder: 'Enter your full name',
      icon: { AntDesignName: 'user' },
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
        required: 'Email is required',
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
      key: 'EmployeeId',
      label: 'Employee Id',
      placeholder: 'Enter Employee Id',
      icon: { AntDesignName: 'user' },
      rules: {
        required: 'Employee Id is required',
        // pattern: {
        //     value: /^[0-9]{10}$/,
        //     message: 'Invalid Employee Id',
        // },
      },
      inputProps: { autoCapitalize: 'none', marginBottom: '2' },
    },
    {
      key: 'ManufacturerId',
      label: 'Manufacturer Id',
      placeholder: 'Enter Manufacturer Id',
      icon: { FontAwesomeName: 'building-o' },
      rules: {
        required: 'Manufacturer Id is required',
      },
      inputProps: { autoCapitalize: 'none', marginBottom: '2' },
    },
  ]

  const renderInputFields = () => {
    if (selectedTab === 'distributor') {
      return (
        <>
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
            <Text className="mb-2 text-sm font-medium text-gray-700">Manufacturer</Text>
            <Box className="w-full">
              <Pressable className="rounded-md p-3 px-4 min-w-full border border-primary-50"
                onPress={() => setManufactureVisible(true)}>
                <HStack className="flex justify-between">
                  <HStack >
                    <AppIcon
                      FontAwesomeName="building-o"
                      size={20}
                      color={'gray'}
                    />
                    <Text className="text-lg text-primary-300">
                      Choose manufacturer
                    </Text>
                  </HStack>
                  <AppIcon OcticonsName="chevron-down" size={20} />
                </HStack>
              </Pressable>
            </Box>
            {selectedManufactures?.length > 0 && (
              <Heading className="text-center mt-3 mb-3 text-success-600">
                Selected Manufacturers
              </Heading>
            )}
            <Box>
              <Box className="flex-row flex-wrap max-w-full p-2 rounded-md">
                {selectedManufactures.map((manufacture, index) => (
                  <Box key={index} className="flex-row items-center bg-secondary-50 m-1 p-1 rounded-md border-2" >
                    <HStack >
                      <Text className="ml-2 text-xs">
                        {manufacture.name}
                      </Text>
                      <Pressable
                        onPress={() => handleRemoveManufacture(manufacture.id)}>
                        <AppIcon
                          EntypoName="circle-with-cross"
                          size={20}
                          key={manufacture.id}
                          color={'gray'}
                        />
                      </Pressable>
                    </HStack>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </>
      );
    } else if (selectedTab === 'representative') {
      return (
        <>
          {Representative.map(input => (
            <AppInput
              input={input}
              key={input.key}
              control={control}
              errorMessage={errors?.[input?.key]?.message}
              leftElement={
                input.key === 'phone' ? (
                  <Pressable onPress={() => setVisible(true)}>
                    <HStack className="items-center">
                      <Image
                        source={{
                          uri: `https://flagcdn.com/w160/${selectedCountry.code.toLocaleLowerCase()}.webp`,
                        }}
                        alt="IN"
                        style={{
                          height: 30,
                          width: 30,
                          alignSelf: "center",
                          resizeMode: 'contain',
                          borderRadius: 2,
                          marginLeft: 8
                        }}
                      />
                      <AppIcon
                        AntDesignName="caretdown"
                        color={'#000'}
                        size={10}
                        style={{ marginLeft: 2 }}
                      />
                    </HStack>
                  </Pressable>
                ) : undefined
              }
            />
          ))}

          <Box className="w-full mb-4 px-3 my-1">
            <Text className="mb-2 text-sm font-medium text-gray-700">
              Date of birth
            </Text>
            <Box className="max-w-full">
              <Pressable onPress={showDatePicker}>
                <Box className="border-2 rounded-md border-primary-50 p-1 py-2">
                  <HStack className="items-center">
                    <AppIcon AntDesignName="calendar" color={'gray'} />
                    <Text
                      className="text-sm pl-4 text-primary-900 ">
                      {selectedDate
                        ? new Date(selectedDate).toLocaleDateString()
                        : 'Select date of birth'}
                    </Text>
                  </HStack>
                </Box>
              </Pressable>
              {showError && (
                <Text className="font-bold text-error-500">
                  * Please select date of birth
                </Text>
              )}
            </Box>
          </Box>

          <DateTimePickerModal
            date={selectedDate}
            isVisible={datePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </>
      );
    }

    return null;
  };

  const handleRoleChange = (tab: 'distributor' | 'representative') => {
    handleTabChange(tab);
  };
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}>
        <Center className="flex-grow px-4 w-full mt-2 mb-5">
          <Heading className="text-primary-100 m-5">
            Choose type
          </Heading>
          <RadioGroup
            value={selectedTab}
            onChange={value =>
              handleRoleChange(value as 'distributor' | 'representative')
            }>
            <HStack space="sm">
              <Radio value="distributor">
                <RadioIndicator>
                  <RadioIcon as={CircleIcon} />
                </RadioIndicator>
                <RadioLabel>Distributor</RadioLabel>
              </Radio>

              <Radio value="representative">
                <RadioIndicator>
                  <RadioIcon as={CircleIcon} />
                </RadioIndicator>
                <RadioLabel>Company Representative</RadioLabel>
              </Radio>
            </HStack>
          </RadioGroup>

          {renderInputFields()}

          <Pressable
            className="w-4/5 rounded-3xl bg-primary-500"
            onPress={
              selectedTab === 'distributor'
                ? handleSubmit(handleRegistration)
                : handleSubmit(handleCrRegistration)
            }
          >
            {isLoading ? (
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
            <Text className="text-black font-normal text-sm mr-2">
              Already have an account?
            </Text>
            <Link href="/login" className="no-underline">
              <Text className="text-sm text-black underline">
                Login
              </Text>
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

      <Manufacturer
        visible={manufactureVisible}
        data={manufacture}
        onSelect={handleSelect}
        onClose={() => setManufactureVisible(false)}
        selected={selectedItem}
        placeholder="Search..."
        title="Choose manufacturer"
      />

      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}>
        <AlertDialogContent>
          <Box className="bg-secondary-50 justify-center items-center h-1/3">
            <AnimatedLottieView
              source={ANIMATIONS.success}
              autoPlay
              loop={true}
            />
          </Box>
          <Heading className="mb-8 text-center text-success-700">
            Registration Complete{' '}
          </Heading>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
