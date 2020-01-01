import React, { Component } from 'react';
import {
    Text, View, StyleSheet, TouchableWithoutFeedback, FlatList
} from 'react-native'
import { colors, dimensions } from '../styles'
import { methodArr } from '../utils/Text';

import { connect } from 'react-redux'

export default class PaymentMethod extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeOption: this.props.defaultOption
        };
    }
    updateActiveOption = (activeOption) => {
        this.setState({
            activeOption,
        });
    };


    render() {
        const { value, cardValue, phoneNumber } = this.props
    
        return (
            <View style={styles.container}>
                <FlatList data={value}
                    renderItem={({ item }) => <Button cardValue={cardValue} phoneNumber={phoneNumber} activeOption={this.state.activeOption} item={item}
                        onSelect={() => {
                            this.props.onChange(item);
                            this.updateActiveOption(item)
                        }}
                    />}
                    keyExtractor={(item, key) => key.toString()}
                    numColumns={1} />
            </View>
        );
    }
}
class Button extends Component {
    render() {
        const { item, activeOption, onSelect, cardValue, phoneNumber } = this.props
        let disable = false;
        let prefix ;
        if (phoneNumber) {
            prefix=phoneNumber.substring(0,3);
        }
        if (cardValue.toString() < 100000) {
            if (item === methodArr[1] || item === methodArr[2]) {
                disable = true;
            }
        }
        if (prefix==="090"&&item === methodArr[0] ) {
            disable = true;
        }
        return (
            <TouchableWithoutFeedback onPress={!disable?onSelect:null} >
                <View style={styles.methodItem}>
                    <View style={styles.circleCheckWrapper}>
                        <View style={activeOption === item ? styles.circleCheck : styles.circleUnCheck} />
                    </View>
                    <Text style={[styles.methodText,disable?{color:colors.gray}:{}]} >{item}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 5,
        marginTop: 20
    },
    btnOption: {
        width: (dimensions.fullWidth - 40) / 3,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.black,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        margin: 5
    },
    txtOption: {
        fontSize: 12
    },
    methodItem: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        paddingHorizontal: 10,
        paddingVertical: 20,
        marginVertical: 5,
        marginHorizontal: 10,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        borderRadius: 5
    },

    circleCheckWrapper: {
        width: 18, height: 18,
        backgroundColor: colors.gray,
        borderRadius: 9, justifyContent: 'center'
    },
    circleCheck: {
        width: 10, height: 10,
        backgroundColor: colors.redOrange,
        borderRadius: 5,
        alignSelf: 'center'
    },
    circleUnCheck: {
        width: 7, height: 7,
        backgroundColor: colors.lightGray,
        borderRadius: 4,
        alignSelf: 'center'
    },
    methodText: {
        paddingLeft: 20,
        fontSize: 20
    },
})