import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RadioButton } from 'react-native-paper';
import { addEditTransaction, getInitialData, getNewID, TransactionEntry } from "../utility";
import { LogBox } from 'react-native';

function AddTransaction({ route, navigation }: { route: any, navigation: any }): React.JSX.Element {
    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    const params = route.params;
    const transaction = params.transaction;
    const setTransactions = params.setTransactions;

    console.log(`params is : ${params}`);

    const [transactionTitle, setTransactionTitle] = useState("");

    const [description, setDescription] = useState("");

    const [amount, setAmount] = useState("0");

    const [category, setCategory] = useState(0);

    const [titleError, setTitleError] = useState(false);
    const [descError, setDescError] = useState(false);
    const [amountError, setAmountError] = useState(false);

    useEffect(() => {
        if (transaction) {
            setTransactionTitle(transaction.title);
            setDescription(transaction.desc);
            setAmount(transaction.amount.toString());
            setCategory(transaction.type)
        }
    }, []);

    const submitTransaction = () => {
        let error = false;
        setTitleError(false);
        setDescError(false);
        setAmountError(false);

        if (transactionTitle == "") {
            setTitleError(true);
            error = true;
        }

        if (description == "") {
            setDescError(true);
            error = true;
        }

        if (amount == "") {
            setAmountError(true);
            error = true;
        }

        if (!error) {
            const newTransaction: TransactionEntry = {
                id: transaction ? transaction.id : getNewID(),
                title: transactionTitle,
                amount: Number(amount),
                desc: description,
                type: category
            }

            addEditTransaction(newTransaction);
            setTransactions([...getInitialData()]);
            navigation.navigate("Home");
        }
    }

    return (
        <View style={styles.formView}>
            <TextInput
                inputMode="text"
                style={styles.txtInput}
                maxLength={50}
                value={transactionTitle}
                onChangeText={setTransactionTitle}
                placeholder="Title"
                placeholderTextColor="#818589"
            />
            {titleError &&
                <Text style={styles.errorMsg}>Title Cannot be empty</Text>
            }
            <TextInput
                inputMode="text"
                style={[
                    styles.txtInput,
                    styles.description
                ]}
                value={description}
                onChangeText={setDescription}
                placeholder="Add Some Description.."
                placeholderTextColor="#818589"
            />
            {descError &&
                <Text style={styles.errorMsg}>Description Cannot be empty</Text>
            }
            <TextInput
                inputMode="text"
                style={styles.txtInput}
                value={amount}
                onChangeText={setAmount}
                placeholder="Amount in CAD.."
                placeholderTextColor="#818589"
            />
            {amountError &&
                <Text style={styles.errorMsg}>Amount Cannot be empty</Text>
            }
            <View style={styles.radioButtons}>
                <View style={styles.radioItems}>
                    <RadioButton
                        value="0"
                        status={category === 0 ? 'checked' : 'unchecked'}
                        onPress={() => setCategory(0)}
                    />
                    <Text style={styles.txtLabel}>Essential</Text>
                </View>
                <View style={styles.radioItems}>
                    <RadioButton
                        value="1"
                        status={category === 1 ? 'checked' : 'unchecked'}
                        onPress={() => setCategory(1)}
                    />
                    <Text style={styles.txtLabel}>Leisure</Text>
                </View>
                <View style={styles.radioItems}>
                    <RadioButton
                        value="2"
                        status={category === 2 ? 'checked' : 'unchecked'}
                        onPress={() => setCategory(2)}
                    />
                    <Text style={styles.txtLabel}>Others</Text>
                </View>
            </View>
            <TouchableOpacity
                style={styles.submit}
                onPress={submitTransaction}
            >
                <Text style={styles.submitTxt}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    formView: {
        alignItems: 'center',
    },

    txtInput: {
        borderWidth: 2,
        borderColor: "#818589",
        borderRadius: 10,
        color: "#36454F",
        fontSize: 25,
        fontWeight: '400',
        width: '90%',
        marginVertical: 10,
        paddingLeft: 10,
        marginTop: 20,
    },

    description: {
        height: 120
    },

    txtLabel: {
        color: "#36454F",
        fontSize: 25,
        fontWeight: '400',
    },

    radioButtons: {
        alignSelf: "flex-start",
        marginLeft: 30,
        marginTop: 20,
    },

    radioItems: {
        display: "flex",
        flexDirection: "row",
        marginTop: 15,
    },

    submit: {
        backgroundColor: "#007FFF",
        paddingVertical: 10,
        paddingHorizontal: 25,
        marginTop: 30,
        borderRadius: 10,
    },

    submitTxt: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: '600'
    },

    errorMsg: {
        alignSelf: "flex-start",
        marginLeft: 25,
        color: "#FF0000"
    }
});

export default AddTransaction;