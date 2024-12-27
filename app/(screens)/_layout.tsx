import { Stack } from 'expo-router'
import React from 'react'

const _layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='businessDetails' options={{ title: "Business Details" }} />
      <Stack.Screen name='manufacturers' options={{ title: "Manufacturers" }} />
      <Stack.Screen name='categories' options={{ title: "categories" }} />
      <Stack.Screen name='notifications' options={{ title: "Notifications" }} />
      <Stack.Screen name='orders' options={{ title: "orders" }} />
      <Stack.Screen name='products' options={{ title: "products" }} />
      <Stack.Screen name='support' options={{ title: "support" }} />
      <Stack.Screen name='changePassword' options={{ title: "Change Password" }} />
      <Stack.Screen name='profileEdit' options={{ title: "Profile Edit" }} />
      <Stack.Screen name='getHelp' options={{ title: "Get Help" }} />
    </Stack>
  )
}

export default _layout
