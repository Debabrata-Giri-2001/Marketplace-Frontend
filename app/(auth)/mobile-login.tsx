import { IMAGES } from "@/assets";
import { Center } from "@/components/ui/center";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import React, { useState, useRef } from "react";
import { Image } from "react-native";
import CountryPicker from "@/components/mainComponents/CountryPicker";
import AppIcon from "@/components/mainComponents/AppIcon";
import { Input, InputField, InputIcon } from "@/components/ui/input";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useChange } from "@/hooks/useAPI";
import { useAuth } from "@/hooks";
import { Alert, AlertText } from "@/components/ui/alert";
import { useAuthProvider } from "@/constant/AuthContext";

const mobilelogin = () => {
  const router = useRouter();
  const { setLoginMobile } = useAuthProvider();
  const { setUser, getUser, setToken } = useAuth();
  const { change, isChanging } = useChange();
  const { type } = useLocalSearchParams();
  const [mobile, setMobile] = useState<any>();
  const [visible, setVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    code: 'IN',
    name: 'India',
    phone: '91',
  });



  const handleSubmit = async () => {
    router.push({ pathname: '/create-profile' })
    try {
      const res = await change(`user/login`, {
        body: {
          phoneNumber: mobile,
        },
      });

      if (res?.results?.success && res?.results?.data?.token) {
        setToken(res?.results?.data?.token);
        getUser();
        setLoginMobile(mobile);
        router.push({ pathname: '/create-profile', params: { mobile } });
      }
    } catch (error) {
      <Alert>
        <AlertText>{error instanceof Error ? error?.message : 'Something Went wrong'}</AlertText>
      </Alert>
    }
  };


  return (
    <>
      <Center className="mt-5">
        <Image style={{ width: "100%", height: 152, resizeMode: "contain" }}
          source={IMAGES.LOGO}
          alt="Logo"
        />
        <Text className="mt-5 text-4xl font-bold text-black">
          Enter Mobile
        </Text>
        <Text>
          Enter the 10-digit Mobile <Number></Number>
        </Text>


        <Input className="relative flex items-center w-full border rounded-md h-auto px-3 mx-3">
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

          <InputField
            className="flex-1 px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none"
            keyboardType="number-pad"
            value={mobile}
            onChangeText={(text) => setMobile(text)}
            placeholder="Enter Mobile Number..." />
        </Input>

        <Pressable
          className="w-4/5 rounded-3xl bg-primary-500 mt-4"
          onPress={handleSubmit}
        >
          {false ? (
            <HStack className="py-2 justify-center">
              <Spinner className="self-center" color="white" />
              <Text className="text-secondary-500 font-semibold text-lg">Loading...</Text>
            </HStack>
          ) : (
            <HStack className="py-2 justify-center">
              <Text className="text-secondary-500 font-semibold text-lg">Verify</Text>
            </HStack>
          )}
        </Pressable>
        <Pressable onPress={() => router.push({ pathname: '/login', params: { type } })} className="mt-3">
          <Text className="text-blue-500 text-sm font-medium underline">
            Login with Email
          </Text>
        </Pressable>
      </Center>

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
    </>
  )
}

export default mobilelogin;