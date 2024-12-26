import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import '../reanimatedConfig'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loginStatus = await AsyncStorage.getItem("isLoggedIn");
        setIsLoggedIn(loginStatus === "true");
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (isLoggedIn !== null) {
      if (isLoggedIn) {
        router.replace("/(tabs)");
      } else {
        router.replace("/(tabs)");
      }
    }
  }, [isLoggedIn]);


  if (isLoggedIn === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' }}>
        <ActivityIndicator size="large" color="#32A873" />
        <Text style={{ color: '#FFFFFF', marginTop: 10 }}>Checking login status...</Text>
      </View>
    );
  }

  return (
    <GluestackUIProvider>
      <GestureHandlerRootView>
        <Stack screenOptions={{ headerShown: false }} />
      </GestureHandlerRootView>
    </GluestackUIProvider>
  );
}
