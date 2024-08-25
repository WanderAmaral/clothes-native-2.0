import { View, Pressable, Image, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";
import { useAuth, useOAuth, useUser } from "@clerk/clerk-expo";
import * as Liking from "expo-linking";
import { Dialog, DialogContent, DialogTrigger } from "./Dialog";
import { Button } from "./Button";
import { useNavigation } from "@react-navigation/native";
import { cn } from "@/lib/utils";

interface HeaderProps {
  MenuIcon?: JSX.Element;
  Icon?: typeof Ionicons;
  children?: string;
  className?: string;
}

const Header = ({ Icon, children, MenuIcon, className }: HeaderProps) => {
  const navigation = useNavigation();
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
    <View
      className={cn(
        "w-full items-center justify-between flex flex-row py-4 px-5",
        className
      )}
    >
      {MenuIcon ? (
        <Pressable
          onPress={navigation.goBack}
          className="w-16 h-16 bg-white items-center flex justify-center rounded-full"
        >
          {MenuIcon}
        </Pressable>
      ) : null}

      {user && true ? (
        <>
          <Dialog>
            <DialogTrigger>
              <TouchableOpacity>
                <View className="items-center justify-center">
                  <Image
                    source={{ uri: user?.imageUrl }}
                    className="w-16 h-16 rounded-full"
                  />
                </View>
              </TouchableOpacity>
            </DialogTrigger>
            <DialogContent>
              <View className="flex gap-7">
                <Text className="font-semibold text-xl text-primary">
                  Sair da conta
                </Text>
                <Text className="text-primary">
                  Tem certeza que deseja sair da conta?
                </Text>

                <Button label="Sair" onPress={() => signOut()} />
              </View>
            </DialogContent>
          </Dialog>
        </>
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
