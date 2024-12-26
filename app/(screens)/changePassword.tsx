import PrivateContainer from '@/components/mainComponents/PrivateContainer'
import { Alert, AlertText } from '@/components/ui/alert';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Center } from '@/components/ui/center';
import { Text } from '@/components/ui/text'
import { useAuth, useMutation } from '@/hooks';
import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form';
import AnimatedLottieView from 'lottie-react-native';
import { ANIMATIONS } from '@/assets';
import AppInput from '@/components/mainComponents/AppInput';
import { Pressable } from '@/components/ui/pressable';
import { HStack } from '@/components/ui/hstack';
import { Spinner } from '@/components/ui/spinner';


type FormInput = {
  key: string;
  label: string;
  placeholder: string;
  icon: any;
  rules: Object;
  inputProps?: any;
};

type FormData = {
  [key: string]: string;
};

const changePassword = () => {

  const { mutation, isLoading } = useMutation();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { logout } = useAuth();
  const [secureTextEntryConfirm, setSecureTextEntryConfirm] = useState(true);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const formInputs: FormInput[] = useMemo(() => {
    const inputFields: FormInput[] = [
      {
        key: 'oldPassword',
        label: 'Old Password',
        placeholder: 'Enter new password',
        icon: { FeatherName: 'lock' },
        rules: {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters long',
          },
        },
        inputProps: {
          keyboardType: 'visible-password',
          autoCapitalize: 'none',
        },
      },
      {
        key: 'newPassword',
        label: 'New Password',
        placeholder: 'Enter  password again',
        icon: { FeatherName: 'lock' },
        rules: {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters long',
          },
          validate: (val: string) => {
            if (watch('oldPassword') == val) {
              return 'New Password should not be equal to old Password';
            }
          },
        },
        inputProps: {
          secureTextEntry: secureTextEntryConfirm,
          autoCapitalize: 'none',
          rightElement: (
            <Button className="text-xs color-black"
              onPress={() => setSecureTextEntry(!secureTextEntry)}>
              <ButtonText className="text-secondary-100">
                {secureTextEntry ? 'Show' : 'Hide'}
              </ButtonText>
            </Button>
          ),
        },
      },
    ];

    return inputFields;
  }, [secureTextEntry, secureTextEntryConfirm]);
  const handleChangePassword = async (data: FormData) => {
    try {
      console.log(data);
      const res = await mutation('user/change-password', {
        method: 'PUT',
        isAlert: true,
        body: {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        },
      });

      if (res?.results?.success) {
        logout();
      }
    } catch (error) {
      <Alert>
        <AlertText>{error instanceof Error ? error?.message : 'Something Went wrong'}</AlertText>
      </Alert>
    }
  };

  return (
    <PrivateContainer title="Change Password">
      <Box>
        <Center className='h-"100%" w-"full"'>
          <Box className="justify-center rounded-full">
            <Box className="self-center">
              <AnimatedLottieView
                source={ANIMATIONS.lock}
                autoPlay
                loop={true}
                style={{ height: 150, width: 150 }}
              />
            </Box>
          </Box>
          {formInputs.map(input => (
            <AppInput
              input={input}
              key={input.key}
              control={control}
              errorMessage={errors?.[input?.key]?.message}
            />
          ))}

          <Pressable
            className="w-4/5 rounded-3xl bg-primary-500 mt-4"
            onPress={handleSubmit(handleChangePassword)}
          >
            {isLoading ? (
              <HStack className="py-2 justify-center">
                <Spinner className="self-center" color="white" />
                <Text className="text-secondary-50 font-semibold text-lg">Loading...</Text>
              </HStack>
            ) : (
              <HStack className="py-2 justify-center">
                <Text className="text-secondary-50 font-semibold text-lg">Send Otp</Text>
              </HStack>
            )}
          </Pressable>
        </Center>
      </Box>
    </PrivateContainer>
  )
}

export default changePassword
