import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import perfil_setting_screen from "../../screens/TabMain/Setting_screens/perfil_setting_screen";
import SettingScreen from "../../screens/TabMain/SettingScreen";

const Stack = createStackNavigator();

export default function NavSetting() {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="Perfil"
        component={perfil_setting_screen}
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
