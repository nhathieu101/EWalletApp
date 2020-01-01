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
import Icon from 'react-native-vector-icons/dist/Feather';
import Header from '../components/Header';
import * as action from '../actions';
import { connect } from 'react-redux'
import { methodArr } from '../utils/Text';

class CompleteTransaction extends Component {

    render() {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent:'center' }}>

                <Text style={{ alignSelf: 'center', }}> Complete Transaction </Text>
                <TouchableOpacity onPress={() => {
                    this.props.clearState();
                    this.props.navigation.navigate('EnterNumber', { clearState: true })
                }} style={{ backgroundColor: colors.redOrange, padding: 10, marginHorizontal: 40,marginVertical: 20, borderRadius: 10, alignItems: 'center', }} >
                    <Text style={{color:colors.white}}>Back to home</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}
function mapStateToProps(state) {
    return {
    };
}
export default connect(mapStateToProps, action)(CompleteTransaction);