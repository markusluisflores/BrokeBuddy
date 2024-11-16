import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LogBox } from 'react-native';

function Details({ route, navigation }: { route: any, navigation: any }): React.JSX.Element {
    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    const params = route.params;

    const transaction = params.transaction;
    const setTransactions = params.setTransactions;

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("AddTransaction", {
                                name: "Update Transaction",
                                transaction: transaction,
                                setTransactions: setTransactions
                            })
                        }}
                    >
                        <Text style={{ fontSize: 20, color: '#FFFFFF' }}>Edit</Text>
                    </TouchableOpacity>
                )
            }
        })
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.infoBox}>
                <View style={styles.title}>
                    <Text style={styles.titleTxt}>{transaction.title}</Text>
                </View>
                <View style={styles.desc}>
                    <Text style={styles.descTxt}>{transaction.desc}</Text>
                </View>
                <View style={styles.price}>
                    <Text style={styles.descTxt}>$ {transaction.amount}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    infoBox: {
        backgroundColor: "#4E4F50",
        height: "40%",
        width: "80%",
        borderRadius: 10,
        borderWidth: 1,
    },

    title: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: "#d9d7b6",
        width: "100%",
        padding: 15,
    },

    titleTxt: {
        fontSize: 22,
        fontWeight: "600",
        textAlign: "center",
    },

    desc: {
        padding: 10,
    },

    descTxt: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "500",
    },

    price: {
        height: "auto",
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        padding: 20,
    }
})

export default Details;