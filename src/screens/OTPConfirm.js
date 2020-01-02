import React, { Component } from 'react'
import {
    View, Text, SafeAreaView,
    TextInput, TouchableOpacity,
    Platform, Modal, FlatList,
    Image, TouchableWithoutFeedback,
    Alert, StyleSheet, Picker
} from 'react-native'
import { PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';
import { colors, dimensions } from '../styles';
import Button from '../components/Button';

export default class OTPConfirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
                <View style={{ padding: 20, }}>
                    <Text style={styles.txtLarge}> Verifycation </Text>
                    <Text style={{ alignSelf: 'center', }}> OTP is send to your number, Please enter OTP to verify </Text>
                    <TextInput style={styles.inputOtp} placeholder="Enter OTP" />
                    <Button label="Verify" onPress={() => this.props.navigation.navigate('Complete')} />

                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    btnVerify: {
        backgroundColor: colors.redOrange,
        margin: 20,
        padding: 15,
        alignItems: 'center',
        borderRadius: 10
    },
    inputOtp: {
        marginVertical: 20,
        marginHorizontal: 20,
        borderBottomColor: colors.blue,
        borderBottomWidth: 1,
        padding: 5,
    },
    txtLarge: {
        alignSelf: 'center',
        fontSize: 18,
        color: colors.blue,
        fontWeight: '700',
        padding: 10,
    }
})