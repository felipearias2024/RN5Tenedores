import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Account from "../screens/Account/Account";
import Login from "../screens/Account/Login";
import Register from "../screens/Account/Register";

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="account"
        component={Account}
        options={{ title: "Cuenta" }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        opciones={{ title: "Iniciar sesión" }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        opciones={{ title: "Registrarse" }}
      />
    </Stack.Navigator>
  );
}
