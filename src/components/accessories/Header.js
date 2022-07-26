import { useNavigation } from '@react-navigation/native';
import React, { Component, useState, useEffect, useCallback } from 'react';
import { View, Alert, Dimensions, Image, StyleSheet, TouchableOpacity, Keyboard, Platform, Text } from 'react-native';
import { colorPrimario, colorQuinto, colorSecundario, colorTercero } from '../../values/colors';
import LinearGradient from 'react-native-linear-gradient';
import AntDesignIcon from 'react-native-vector-icons/AntDesign'

export default function Header({ route }) {
    const navigation = useNavigation();
    const [isloading, setLoading] = useState(false)

    const handleOnPress = () =>{
        navigation.goBack()
    }

    return (
        <LinearGradient colors={[colorPrimario, '#A569BD']} style={styles.header}>
                <TouchableOpacity onPress={handleOnPress} style={{ flex: .25,paddingHorizontal: 5, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>
                    <View>
                        <AntDesignIcon size={20} color={colorSecundario} name='arrowleft' />
                    </View>
                    <View>
                        <Text style={styles.textStyle}>Back</Text>
                    </View>
                </TouchableOpacity>
        </LinearGradient>
    );

}

const styles = StyleSheet.create({
    contain: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: 'transparent',
        paddingVertical: 10,
        paddingHorizontal: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.53,
        shadowRadius: 13.97,
        elevation: 21,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    textStyle: {
        color: colorSecundario
    }
})