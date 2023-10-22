import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";

import HomeScreen from "./Screens/HomeScreen";
import HiveScreen from "./Screens/HiveScreen";
import MapScreen from "./Screens/MapScreen";
import TasksScreen from "./Screens/TasksScreen";
import PriorityScreen from "./Screens/PriorityScreen";
import PriorityMappingScreen from "./Screens/PriorityMappingScreen";

import { HiveProvider } from "./HiveProvider";

const Tab = createBottomTabNavigator();

function    MainTabNavigator() {
  return (
    <HiveProvider>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
          tabBarIcon: ({ color, size }) => {
            let iconName;
            switch (route.name) {
              case "Home":
                iconName = "home";
                break;
              case "Hive":
                iconName = "hive";
                break;
              case "Map":
                iconName = "map";
                break;
              case "Assign":
                iconName = "tasks";
                break;
              case "Priority":
                iconName = "exclamation-triangle";
                break;
              case "PriorityMapping":
                iconName = "star"; 
                break;
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Hive" component={HiveScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Assign" component={TasksScreen} />
        <Tab.Screen name="Priority" component={PriorityScreen} />
        <Tab.Screen
          name="PriorityMapping"
          component={PriorityMappingScreen}
          options={{ tabBarLabel: "Priority Map" }}
        />
      </Tab.Navigator>
    </HiveProvider>
  );
}


export default function App() {
    return (
      <NavigationContainer>
        <HiveProvider>
          <MainTabNavigator />
        </HiveProvider>
      </NavigationContainer>
    );
  }