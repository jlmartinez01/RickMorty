import { useNavigation } from '@react-navigation/native';
import React, { Component, useState, useEffect, useCallback } from 'react';
import { View, Alert, Dimensions, Image, StyleSheet, Text, Keyboard, Platform } from 'react-native';
import { colorPrimario, colorQuinto, colorSecundario, colorTercero } from '../../values/colors';
import { ActivityIndicator } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import ProgressiveFastImage from "@freakycoder/react-native-progressive-fast-image";
import { ScreenHeight } from 'react-native-elements/dist/helpers';
import ReactNativePinchable from 'react-native-pinchable';

export default function InfoComponent({ props }) {
    const navigation = useNavigation();

    return (
        <View
            style={styles.contain}>
            <View style={styles.nameCharacterView}>
                <View style={{marginBottom:10}}>
                    <Text style={styles.textTitleStyle}>{props.name}</Text>
                </View>
                <View>
                    <Text style={styles.textStyle}>{'Status: ' + props.status}</Text>
                    <Text style={styles.textStyle}>{'Species: ' + props.species}</Text>
                    <Text style={styles.textStyle}>{'Type: ' + props.type}</Text>
                    <Text style={styles.textStyle}>{'Gender: ' + props.gender}</Text>
                    <Text style={styles.textStyle}>{'Origin: ' + props.origin.name}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contain: {
        flex: 1,
        position: 'absolute',
        bottom: '5%',
        paddingHorizontal: 10
    },
    nameCharacterView: {

    },
    textTitleStyle: {
        color: colorSecundario,
        fontSize: 20,
        fontWeight: 'bold'
    },
    textStyle: {
        color: colorSecundario,
        fontWeight: 'bold',
        fontSize:16
    }
})