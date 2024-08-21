import { View, Pressable, Image, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";
import { useAuth, useOAuth, useUser } from "@clerk/clerk-expo";
import * as Liking from "expo-linking";

interface HeaderProps {
  Icon?: typeof Ionicons;
  children?: string;
}

const Header = ({ Icon, children }: HeaderProps) => {
  const { user } = useUser();
  const { signOut } = useAuth();

  const googleOAuth = useOAuth({ strategy: "oauth_google" });

  async function onGoogleSignIn() {
    try {
      const redirectUrl = Liking.createURL("/");

      const oAuthFlow = await googleOAuth.startOAuthFlow({ redirectUrl });

      if (oAuthFlow.authSessionResult?.type === "success") {
        if (oAuthFlow.setActive) {
          await oAuthFlow.setActive({ session: oAuthFlow.createdSessionId });
        }
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    WebBrowser.warmUpAsync();

    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

  return (
    <View className="w-full items-center justify-between flex flex-row py-4 px-5">
      <Pressable className="w-16 h-16 bg-white items-center flex justify-center rounded-full">
        <Ionicons name="menu" size={40} color={"#121212"} />
      </Pressable>

      <Text className="text-3xl font-bold">{children}</Text>

      {user && true ? (
        <Pressable onPress={() => signOut()}>
          <View className="items-center justify-center">
            <Image
              source={{ uri: user?.imageUrl }}
              className="w-16 h-16 rounded-full"
            />
          </View>
        </Pressable>
      ) : (
        <Pressable
          className="w-16 h-16 bg-white items-center flex justify-center rounded-full"
          onPress={onGoogleSignIn}
        >
          <Ionicons name="log-in" size={40} color={"#121212"} />
        </Pressable>
      )}
    </View>
  );
};

export default Header;
