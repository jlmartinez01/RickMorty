import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, TextInput, Image, StatusBar } from 'react-native';
import {
  NavigationContainer,
  DarkTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FlashMessage from "react-native-flash-message";
import SplashScreen from './src/components/splashscreen/SplashScreen';
import { colorPrimario } from './src/values/colors';
import Search from './src/screens/Inside/Search/Search';
import Details from './src/screens/Inside/Search/Details';

Text.defaultProps = {
  ...(Text.defaultProps || {}),
  allowFontScaling: false,
};
TextInput.defaultProps = {
  ...(TextInput.defaultProps || {}),
  allowFontScaling: false,
};

const StackContainer = createStackNavigator();
const StackInside = createStackNavigator();
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      splash: true,
    }

  }


  async componentDidMount() {
    this.cargaSplash()
  }

  async cargaSplash(){
    const data = await this.performTimeConsumingTask();
    if (data !== null) {
      this.setState({
        splash:false
      })
    }
  }


  performTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve("result");
      }, 3000)
    );
  };





  render() {


    const forFade = ({ current, closing }) => ({
      cardStyle: {
        opacity: current.progress,
      },
    });


    const Inside = () => {
      return (
        <StackInside.Navigator
          options={{ cardStyleInterpolator: forFade }}>
          <StackInside.Screen
            name='Search'
            component={Search}
            options={({ route }) => ({
              headerShown: false,
            })} />
          <StackInside.Screen
            name='Details'
            component={Details}
            options={({ route }) => ({
              headerShown: false,
            })} />
        </StackInside.Navigator>
      )
    }



    return (
      <NavigationContainer>
        <View style={{ flex: 1 }}>
          <StackContainer.Navigator headerShown="none" screenOptions={{ cardStyleInterpolator: forFade }}>
            {
              this.state.splash
                ?
                <StackContainer.Screen name='Splash' component={SplashScreen} options={{ headerShown: false }} />
                :
                <StackContainer.Screen name='Inside' component={Inside} options={{ headerShown: false }} />
                 
            }
          </StackContainer.Navigator>
        </View>
        <FlashMessage position="top" duration={2500} />
      </NavigationContainer>
    )

  }
}

const styles = StyleSheet.create({

});