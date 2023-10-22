import HiveScreen from "./Screens/HiveScreen"; // Assume you have this
import HomeScreen from "./Screens/HomeScreen";
import Icon from "react-native-vector-icons/FontAwesome5";
import MapScreen from "./Screens/MapScreen"; // Assume you have this
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import TasksScreen from "./Screens/TasksScreen"; // Assume you have this
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Import your screens

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarActiveTintColor: "blue",
                    tabBarInactiveTintColor: "gray",
                    tabBarStyle: [
                        {
                            display: "flex",
                        },
                        null,
                    ],
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        switch (route.name) {
                            case "Home":
                                iconName = "home";
                                break;
                            case "Notes":
                                iconName = "sticky-note";
                                break;
                            case "Assign":
                                iconName = "tasks";
                                break;
                            case "Map":
                                iconName = "map";
                                break;
                            case "Hive":
                                iconName = "hive";
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
            </Tab.Navigator>
        </NavigationContainer>
    );
}
