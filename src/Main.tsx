import React, { useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/Home";
import AddTransaction from "./components/AddTransaction";
import { Alert, Text, TouchableOpacity } from "react-native";
import Details from "./components/Details";

const Stack = createNativeStackNavigator();

function Main(): React.JSX.Element {

    function detailsScreenOptions() {
        const options = {
            // title: transactionTitle,
            headerRight: () => headerRightButton("Count")
        };
        return options;
    }

    function headerRightButton(title: string): React.JSX.Element {
        return (
            <TouchableOpacity
                onPress={() => Alert.alert("About App", "Version: 0.0.1")}
            >
                <Text style={{ fontSize: 15, color: '#FFF' }}>{title}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerTitleAlign: 'center',
                    headerStyle: { backgroundColor: '#C85250' },
                    headerTitleStyle: {
                        fontSize: 30,
                        fontFamily: "Arial, sans-serif",
                        color: '#FFF',
                    },
                    headerTintColor: '#FFF',
                }}
            >
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{
                        title: "Transactions",
                    }}
                >

                </Stack.Screen>

                <Stack.Screen
                    name="AddTransaction"
                    component={AddTransaction}
                    initialParams={{ id: -1, desc: "default description", name: "Default Title" }}
                    options={({ route }) => ({ title: route.params.name })}

                >

                </Stack.Screen>

                <Stack.Screen
                    name="Details"
                    component={Details}
                    options={{
                        title: "Details",
                    }}
                >

                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer >
    );
}

export default Main;