import { Stack } from 'expo-router'
import React from 'react'

const _layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName='index'>
      <Stack.Screen name='index' options={{ title: "On Boarding" }} />
      <Stack.Screen name='login' options={{ title: "Login" }} />
      <Stack.Screen name='register' options={{ title: "Register" }} />
      <Stack.Screen name='mobile-login' options={{ title: "Mobile Login" }} />
      <Stack.Screen name='otp-verify' options={{ title: "Otp Verify" }} />
      <Stack.Screen name='login-type' options={{ title: "Login Type" }} />
      <Stack.Screen name='create-profile' options={{ title: "Create Profile" }} />
    </Stack>
  )
}

export default _layout
