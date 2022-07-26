
import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Image } from 'react-native';
export default function SearchCard({props}) {

    return (
        <View style={styles.card}>
            <Text>{props.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        height:200
    }
})