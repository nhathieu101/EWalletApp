import React, { Component } from 'react'
import {
    View, Text, SafeAreaView,
    TextInput, TouchableOpacity,
    Platform, Modal, FlatList,
    Image, TouchableWithoutFeedback,
    Alert, StyleSheet, StatusBar
} from 'react-native'
import { PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';
import { colors, dimensions } from '../styles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import IconFeather from 'react-native-vector-icons/dist/Feather';
import ButtonGroup from '../components/ButtonGroup';
import * as action from '../actions';
import Header from '../components/Header';
import { denominationArr } from '../utils/Text';
import { connect } from 'react-redux'

class EnterNumber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            contacts: [],
            phoneNumbers: null,
            cardValue: "",
            disable: true,
            validateNumber: false
        }
    }
    componentDidMount() {
        this.checkPermission();
        this.focusListener = this.props.navigation.addListener("didFocus", () => {
            if (this.props.navigation.getParam('clearState', false)) {
                this.setState({
                    modalVisible: false,
                    contacts: [],
                    phoneNumbers: null,
                    cardValue: "",
                    disable: true
                })
            }
        });
    }
    componentWillUnmount() {
        this.focusListener.remove();
    }

    async checkPermission(
        permissions = [
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        ]
    ) {
        if (Platform.OS === 'android') {
            await PermissionsAndroid.requestMultiple(permissions);
        }
    }
    handleNext = () => {
        if (this.state.cardValue) {
            this.props.savePhoneNumber(this.state.phoneNumbers)
            this.props.saveCardValue(this.state.cardValue)
            this.props.navigation.navigate('SelectPayment')
        } else {
            alert('fail')
        }
    }
    openContact = () => {
        Contacts.getAll((err, contacts) => {
            console.log(err);
            if (err === "denied") {
                console.warn("Permission to access contacts was denied");
            } else {
                this.setState({ modalVisible: true, contacts: contacts });
                console.log(contacts);
            }
        })
    }
    onChangeText = (number) => {
        this.setState({ phoneNumbers: number, validateNumber: this.validatePhone(number) })
    }
    validatePhone = (number) => {
        var re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
        return re.test(number);
    };
    render() {
        console.log(this.props.phoneNumber)
        const { contacts, modalVisible, phoneNumbers, cardValue, validateNumber } = this.state
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'space-between', backgroundColor: colors.lightGray }}>
                <StatusBar backgroundColor={colors.blue} barStyle="light-content" />
                <View>
                    <Header headerText="Mobile Top-up" goBack={false} />
                    <View style={styles.inputWrapper}>
                        <TextInput value={phoneNumbers !== null ? phoneNumbers : ""}
                            autoFocus={false} keyboardType="phone-pad"
                            placeholder="Enter Mobile phone number"
                            onChangeText={(text) => this.onChangeText(text)} />
                        <TouchableOpacity style={{ padding: 10, }} onPress={() => this.openContact()} >
                            <Icon name="address-book" size={20} color={colors.redOrange} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{ marginLeft: 10, fontSize: 18 }}>Select card price(VNĐ)</Text>
                        <ButtonGroup value={denominationArr} onChange={(cardValue) => {
                            this.setState({ cardValue: cardValue })
                        }} />

                    </View>
                </View>
                <View style={styles.bottomView}>
                    <Text style={{ padding: 20 }}>Total: {cardValue}</Text>
                    <TouchableOpacity onPress={() => phoneNumbers && cardValue&&validateNumber ? this.handleNext() : null} style={[styles.buttonNext, phoneNumbers && cardValue&&validateNumber ? { backgroundColor: colors.redOrange } : { backgroundColor: colors.gray }]}>
                        <Text style={styles.buttonNextText}>CONTINUE</Text>
                    </TouchableOpacity>
                </View>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => {
                        this.setState({ modalVisible: false });
                    }}>
                    <View  >
                        <Header headerText="Select contact" goBack={false} />
                        <TouchableOpacity style={{ position: 'absolute', left: 0, padding: 11 }}
                            onPress={() => {
                                this.setState({ modalVisible: false });
                            }}>
                            <IconFeather name="arrow-left" size={25} color={colors.white} />
                        </TouchableOpacity>
                        <FlatList
                            data={contacts}
                            renderItem={({ item }) => <ContactItem item={item} selectContact={() => this.setState({ modalVisible: false }, () => this.onChangeText(item.phoneNumbers[0].number))} />}
                            keyExtractor={(item, key) => key}
                        />
                    </View>
                </Modal>
            </SafeAreaView>
        )
    }
}


class ContactItem extends Component {
    render() {
        console.log(this.props.item)
        const { item, selectContact } = this.props
        if (item.phoneNumbers.length > 0) {
            return (
                <TouchableWithoutFeedback onPress={selectContact}>
                    <View style={styles.itemContactWrapper}>
                        {item.thumbnailPath != "" ?
                            <Image style={styles.image} source={{ uri: item.thumbnailPath }} /> :
                            <Image style={styles.image} source={require('../images/ic-user.png')} />
                        }
                        <View style={{ paddingLeft: 10 }}>
                            <Text>{item.displayName}</Text>
                            <Text>{item.phoneNumbers[0].number}</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>

            )
        } else { return null; }

    }
}

function mapStateToProps(state) {
    const { phoneNumber } = state;
    return {
        phoneNumber
    };
}
export default connect(mapStateToProps, action)(EnterNumber);

const styles = StyleSheet.create({
    itemContactWrapper: {
        flexDirection: 'row',
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        backgroundColor: colors.white,
        alignItems: 'center'
    },
    image: {
        width: dimensions.fullWidth / 7,
        height: dimensions.fullWidth / 7,
        borderRadius: (dimensions.fullWidth / 7) / 2
    },
    inputWrapper: {
        flexDirection: 'row',
        // backgroundColor: colors.lightGray,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        margin: 10,
        borderBottomColor: colors.blue,
        borderBottomWidth: 1,
    },
    buttonNext: {
        position: 'absolute',
        top: -15, right: 10,
        paddingHorizontal: 30,
        backgroundColor: colors.blue,
        borderRadius: 10,
        paddingVertical: 10
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    buttonNextText: {
        color: colors.white,
        fontWeight: 'bold'
    },
    bottomView: {
        backgroundColor: colors.white, shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})