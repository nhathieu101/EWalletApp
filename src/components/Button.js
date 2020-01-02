import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { colors } from '../styles'
export default class Button extends Component {
    render() {
        const { label, onPress }=this.props;
        return (
            <TouchableOpacity onPress={onPress} style={styles.buttonPayWrapper}>
                <Text style={styles.buttonText}>{label}</Text>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    buttonText: {
        color: colors.white,
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttonPayWrapper: {
        backgroundColor: colors.redOrange,
        padding: 10,
        margin: 5,
        borderRadius: 10,
        alignItems: 'center',
    },
})