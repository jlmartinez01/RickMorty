
import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import ProgressiveFastImage from "@freakycoder/react-native-progressive-fast-image";
import { colorPrimario, colorSecundario } from '../../values/colors';

export default function SearchCard({ props }) {

    return (
        <View style={styles.viewPrincipal}>
            <View style={styles.card}>
                <Image
                    style={styles.Background}
                    source={{ uri: props.image }}
                    blurRadius={50}
                />
                <View style={styles.viewImage}>
                    <ProgressiveFastImage
                        source={{ uri: props.image }}
                        style={{height:'100%',width:'100%'}}
                        resizeMode={'cover'}
                        blurRadius={5}
                        imageAnimationDuration={500}
                    />

                </View>
                <View style={styles.viewInfo}>
                    <Text style={styles.textInfo}>{props.name}</Text>
                </View>
                <Text></Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    viewPrincipal: {
        height: 200,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        flex: .8,
        flexDirection:'row',
        width: '90%',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    Background: {
        flex: 1,
        position: 'absolute',
        height: '100%',
        width: '100%',
        borderRadius: 20,
    },
    viewImage:{
        flex:.3,
        justifyContent:'center',
        backgroundColor:colorPrimario,
    },
    viewInfo:{
        flex:.7,
        justifyContent:'center',
        alignItems:'center',
        padding:10
    },
    textInfo:{
        color:colorSecundario,
        fontSize:24,
        fontWeight:'bold',
        textAlign:'center'
    }
    
})