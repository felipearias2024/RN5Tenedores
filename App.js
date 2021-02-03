import { StatusBar } from "expo-status-bar";
import React from "react";
import Navigation from "./app/navigations/Navigation";
import { firebaseApp } from "./app/utils/firebase";
import { LogBox } from "react-native";

export default function App() {
  return <Navigation />;
}
LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();
