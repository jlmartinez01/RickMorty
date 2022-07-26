import React, { useState, useEffect, useRef,useMemo } from "react";
import { View, Text, TouchableOpacity, Image, FadeI, StyleSheet, Alert, StatusBar ,Animated} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colorPrimario, colorSecundario, colorTercero } from "../../values/colors";
import { ScreenHeight } from "react-native-elements/dist/helpers";

export default function SplashScreen() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current 
  const scale = useRef(new Animated.Value(1)).current 

  useEffect(() => {
    loadImage()
  }, []);

  function loadImage(){
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true
      }
    ).start(({ finished }) => {
      Animated.timing(
        scale,
        {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true
        }
      ).start()
     });
  }


  const renderImage = useMemo(() => {
    return (
      <Animated.View                 // Special animatable View
        style={{
          opacity: fadeAnim,         // Bind opacity to animated value
          justifyContent: 'center',
           marginBottom: 30, 
           flex:.4,
           transform: [{ scale }]
        }}
      >
       <Image
          source={require('../../img/rickMortySplash.png')}
          style={{
            flex: 1,
            width: undefined,
            height: undefined,
          }}
          resizeMode='contain'
        />
      </Animated.View>
    )
  }, [fadeAnim,scale])

  return (
    <View style={{ flex: 1, backgroundColor: colorTercero, justifyContent: 'center' }}>
      <StatusBar translucent barStyle='light-content' backgroundColor='transparent' />
        {
          renderImage
        }
    </View>
  );
}

const styles = StyleSheet.create({

});

