import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

export const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent", // Garante que o fundo global seja transparente
  },
};
