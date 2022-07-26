import { useNavigation } from '@react-navigation/native';
import React, { Component, useState, useEffect, useCallback } from 'react';
import { View, Alert, Dimensions, Image, StyleSheet, TouchableOpacity, Keyboard, Platform } from 'react-native';
import { colorPrimario, colorQuinto, colorSecundario, colorTercero } from '../../../values/colors';
import { ActivityIndicator } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import ProgressiveFastImage from "@freakycoder/react-native-progressive-fast-image";
import { ScreenHeight } from 'react-native-elements/dist/helpers';
import ReactNativePinchable from 'react-native-pinchable';
import InfoComponent from '../../../components/details/InfoComponent';
import Header from '../../../components/accessories/Header';

export default function Details({ route }) {
  const navigation = useNavigation();
  const [isloading, setLoading] = useState(false)
  const [screenHeight, setScreenHeight] = useState(ScreenHeight)

  useEffect(() => {
    console.log(route.params)
  }, []);


  const handleHeight = (nativeEvent) => {
    setScreenHeight(nativeEvent.layout.height)
  }

  return (
    <View
      onLayout={({ nativeEvent }) => handleHeight(nativeEvent)}
      style={styles.contain}>
      <Image
        source={{ uri: route.params.image }}
        style={{ flex: 1, position: 'absolute', height: ScreenHeight, width: '100%' }}
        blurRadius={50} />
      <ReactNativePinchable activeOpacity={0} style={{ flex: 1, height: undefined, width: undefined }}>
        <ProgressiveFastImage
          source={{ uri: route.params.image }}
          resizeMode={'contain'}
          style={{ height: ScreenHeight, width: '100%',borderRadius:15 }}
          imageAnimationDuration={500}
        />
      </ReactNativePinchable>
      <LinearGradient colors={['rgba(0,0,0,0.0)','rgba(0,0,0,0.0)','rgba(0,0,0,0.0)','rgba(0,0,0,0.0)','rgba(0,0,0,0.8)',  'rgba(0,0,0,9)']} style={{ flex: 1, position: 'absolute', height: ScreenHeight, width: '100%' }} />
      <InfoComponent props={route.params}/>
      <View style={{position:'absolute',top:0,width:'100%'}}>
          <Header/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
  }
})