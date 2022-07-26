
import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import ProgressiveFastImage from "@freakycoder/react-native-progressive-fast-image";
import { colorCuarto, colorPrimario, colorSecundario, colorTercero } from '../../values/colors';
import { TextInput } from 'react-native-gesture-handler';
import AntDesignIcon from 'react-native-vector-icons/AntDesign'

export default function SearchBar({onChangeText,value,onClearPress}) {

    return (
        <View style={styles.viewPrincipal}>
                <View style={styles.inputBarView}>
                    <TextInput
                        placeholder='Search'
                        placeholderTextColor={colorCuarto}
                        style={styles.inputBarComponent}
                        onChangeText={onChangeText}
                        value={value}
                        maxLength={15}
                    />

                </View>
                <View style={styles.viewIcon}>
                    {
                        value==''
                        ?
                        <AntDesignIcon size={30} color={colorCuarto} name='search1' />
                        :
                        <TouchableOpacity onPress={onClearPress}>
                            <AntDesignIcon size={30} color={colorCuarto} name='close' />
                        </TouchableOpacity>
                    }
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewPrincipal: {
        height:50,
        flexDirection:'row',
        backgroundColor:colorSecundario,
        margin:10,
        borderRadius:20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    inputBarView:{
        flex:.8
    },
    inputBarComponent:{
        color:colorTercero,
        paddingLeft:20,
    },
    viewIcon:{
        flex:.2,
        justifyContent:'center',
        alignItems:'center'
    }
})