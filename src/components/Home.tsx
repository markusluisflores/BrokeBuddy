import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getInitialData, TransactionEntry, TransactionType_bgColor } from "../utility";

function Home({ navigation }: { navigation: any }): React.JSX.Element {

    const [transactions, setTransactions] = useState<TransactionEntry[]>([]);

    useEffect(() => {
        setTransactions([...getInitialData()]);
    }, [])

    return (
        <View style={[styles.container, transactions.length == 0 && styles.emptyContainer]}>

            {transactions.length > 0 ?

                transactions.map((transaction) =>
                    <TouchableOpacity
                        key={transaction.id}
                        style={[
                            styles.transaction,
                            { backgroundColor: TransactionType_bgColor[transaction.type] }]
                        }
                        onPress={() => {
                            navigation.navigate("Details", {
                                transaction: transaction,
                                setTransactions: setTransactions
                            })
                        }}
                    >
                        <Text style={styles.transactionText}>
                            {transaction.title}
                        </Text>
                        <Text style={styles.transactionText}>
                            $ {transaction.amount}
                        </Text>
                    </TouchableOpacity>
                )
                :
                <Text style={styles.emptyTxt}>Add Transaction To See Entry Here.</Text>
            }

            <TouchableOpacity
                style={styles.fab}
                onPress={() => {
                    navigation.navigate("AddTransaction", {
                        name: 'Add Transaction',
                        setTransactions: setTransactions
                    });
                }}
            >
                <Text style={styles.buttonTxt}>+</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },

    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    emptyTxt: {
        fontSize: 30,
        color: "#818589",
        fontWeight: '600',
        textAlign: 'center',
        marginHorizontal: '5%'
    },

    transaction: {
        flex: 1,
        flexDirection: "row",
        maxHeight: 60,
        justifyContent: "space-between",
        padding: 10,
        marginVertical: 5,
    },

    transactionText: {
        color: "#36454F",
        fontSize: 23
    },

    fab: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#C85250',
        position: 'absolute',
        bottom: 20,
        right: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonTxt: {
        fontSize: 25,
        color: '#FFF',
    }
});

export default Home;