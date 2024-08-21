import "@/styles/global.css";
import Header from "@/components/Header";

import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { tokenCache } from "@/storage/tokenCache";

import Constants from "expo-constants";
import { MyTabs } from "@/app/Screens";

const statusBarHeight = Constants.statusBarHeight;

const PUBLIC_CLERK_PUBLISHABLE_KEY = process.env
  .EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

function InitialLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;
  }, [isSignedIn]);

  return isLoaded ? (
    <></>
  ) : (
    <ActivityIndicator
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    />
  );
}

export default function App() {
  return (
    <>
      <ClerkProvider
        publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY}
        tokenCache={tokenCache}
      >
        <LinearGradient
          colors={["#e5c3bf", "#dddddd", "#FFFFFF"]}
          style={{ flex: 1 }}
        >
          <SafeAreaView style={{ flex: 1, marginTop: statusBarHeight + 8 }}>
            <InitialLayout />
            <StatusBar style="auto" />
            

            <MyTabs />
          </SafeAreaView>
        </LinearGradient>
      </ClerkProvider>
    </>
  );
}
