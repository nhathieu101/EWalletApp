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
import Button from '../components/Button'
class Confirm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            changeMethod: false,
            methodArr: []
        }
    }
    componentDidMount() {
        const { phoneNumber, paymentMethod, cardValue } = this.props
        let invalidArr = methodArr
        const prefix = phoneNumber.substring(0, 3);
        methodArr.forEach((item, index) => {
            if (cardValue.toString() < 100000) {
                if (item === methodArr[1] || item === methodArr[2]) {
                    invalidArr = invalidArr.filter(element => element != item);
                }
            }
            if (prefix === "090" && item === methodArr[0]) {
                invalidArr = invalidArr.filter(element => element != item);
            }
        })
        this.setState({ methodArr: invalidArr })
    }
    openChangeMethod = () => {
        this.setState({ changeMethod: true })
    }
    handlePay = () => {
        const { paymentMethod } = this.props
        if (paymentMethod === methodArr[1]) {
            this.props.navigation.navigate('OTPConfirm')
        } else {
            this.props.navigation.navigate('Complete')
        }
    }
    render() {
        const { changeMethod, methodArr } = this.state
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
                <Header navigation={this.props.navigation} headerText="Confirm information" />
                <View style={styles.inforWrapper}>
                    <Text style={styles.title}>Payment method</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5, paddingVertical: 10 }}>
                        <Text style={styles.textDetail}>{this.props.paymentMethod}</Text>
                        {changeMethod ? <Picker
                            selectedValue={this.props.paymentMethod}
                            style={{ height: 40, width: 150 }}
                            onValueChange={(itemValue, itemIndex) =>
                                this.props.saveMethod(itemValue)
                            }
                        >
                            {methodArr.map((item, index) => {
                                return (
                                    <Picker.Item key={index} label={item} value={item} />
                                )
                            })}

                        </Picker> :
                            <Text onPress={() => this.openChangeMethod()} style={[styles.textDetail, { color: colors.blue }]}>Change</Text>
                        }
                    </View>
                    <Text style={styles.title}>Transaction details</Text>
                    <View style={{ backgroundColor: colors.white, flexDirection: 'row' }}>
                        <View style={{ flex: 2 }}>
                            <Text style={[styles.textDetail, { color: colors.blue }]}>Phone Number </Text>
                            <Text style={[styles.textDetail, { color: colors.blue }]}>Total </Text>
                            <Text style={[styles.textDetail, { color: colors.blue }]}>Total amount</Text>
                        </View>
                        <View style={{ flex: 3, }}>
                            <Text style={styles.textDetail}>{this.props.phoneNumber}</Text>
                            <Text style={styles.textDetail}>{parseFloat(this.props.cardValue).toLocaleString()} VND</Text>
                            <Text style={styles.textDetail}>{parseFloat(this.props.cardValue).toLocaleString()} VND</Text>
                        </View>
                    </View>
                </View>
                <Button label="Confirm" onPress={() => this.handlePay()} />
            </SafeAreaView>
        )
    }
}
function mapStateToProps(state) {
    const { phoneNumber, cardValue, paymentMethod } = state;
    return {
        phoneNumber, paymentMethod, cardValue
    };
}
export default connect(mapStateToProps, action)(Confirm);
const styles = StyleSheet.create({
    btnPay: {
        backgroundColor: colors.redOrange,
        padding: 15,
        marginHorizontal: 20,
        marginVertical: 10,
        alignItems: 'center',
        borderRadius: 10
    },
    btnPayText: {
        color: colors.white
    },
    inforWrapper: {
        flex: 1,
        margin: 5,
        // justifyContent:'space-between'
    },
    title: {
        fontSize: 20,
        padding: 5,
        fontWeight: '800'
    },
    textDetail: {
        padding: 10,
        fontSize: 15
    }
})