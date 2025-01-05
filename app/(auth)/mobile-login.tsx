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

const mobilelogin = () => {

  const [mobile, setMobile] = useState();

  const [visible, setVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    code: 'IN',
    name: 'India',
    phone: '91',
  });

  const handleChange = (text: string) => {

  };


  const handleSubmit = () => {

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


        <Input className="relative flex items-center w-full border rounded-md h-auto">
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
            onChangeText={(text) => handleChange(text)}
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