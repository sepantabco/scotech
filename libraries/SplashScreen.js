import React, { Component } from 'react';
import { View, Text, AsyncStorage, Image } from 'react-native';


export default class SplashScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerLeft: null,
        }
    };
    constructor(props) {
        super(props);
    }
    async componentWillMount(){
        setTimeout(async  () => {
            try {
                let user = await AsyncStorage.getItem('username');
                if (user == '' || user == null ){
                    this.props.navigation.navigate('startsignup');
                }else {
                    this.props.navigation.navigate('Firstpage');              
                }
            } catch(err) { 
                this.props.navigation.navigate('startsignup');
            }
        }, 2000)
    }
    render() {
      return (
        <View>
            <Image source={require('../images/splash.gif')} />
        </View>
      )
    }
}

