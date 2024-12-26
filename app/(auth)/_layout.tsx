import { Stack } from 'expo-router'
import React from 'react'

const _layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName='index'>
      <Stack.Screen name='cr-register' options={{ title: "Cr Register" }} />
      <Stack.Screen name='index' options={{ title: "On Boarding" }} />
      <Stack.Screen name='login' options={{ title: "Login" }} />
      <Stack.Screen name='register' options={{ title: "Register" }} />
      <Stack.Screen name='reset-password' options={{ title: "Reset Password" }} />
    </Stack>
  )
}

export default _layout
