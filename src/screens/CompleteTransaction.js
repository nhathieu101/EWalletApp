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
import Button from '../components/Button';

class CompleteTransaction extends Component {

    render() {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent:'center' }}>

                <Text style={{ alignSelf: 'center', fontSize:18 }}> Complete Transaction </Text>

                <Button label="Back to home" onPress={() => {
                    this.props.clearState();
                    this.props.navigation.navigate('EnterNumber', { clearState: true })
                }} />
            </SafeAreaView>
        );
    }
}
function mapStateToProps(state) {
    return {
    };
}
export default connect(mapStateToProps, action)(CompleteTransaction);