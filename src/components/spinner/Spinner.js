
import React, { useState,useEffect } from 'react';
import {Text,TouchableOpacity} from 'react-native';
import * as Progress from 'react-native-progress';
import { colorPrimario, colorSecundario } from '../../values/colors';

export default function Spinner({isloading}){

    return(
        <Progress.CircleSnail 
        useNativeDriver={false}
        animating={isloading}
        hidesWhenStopped={true}
        thickness={6}
        strokeCap={'round'}
        spinDuration={500}
        color={colorSecundario}
        style={{
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          justifyContent: 'center', 
          alignItems: 'center'
          }}
        size={50} 
        indeterminate={true}/>
    )
}