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
    componentDidMount(){

    }
    async componentWillMount(){
        setTimeout(async  () => {
            // try {
            //     let user = await AsyncStorage.getItem('username');
            //     if (user == '' || user == null ){
            //         this.props.navigation.replace('StartPage');
            //     }else {
            //         this.props.navigation.replace('App');              
            //     }
            // } catch(err) { 
            //     this.props.navigation.replace('StartPage');
            // }
            this.props.navigation.replace('App');              

        }, 2000)
    }
    render() {
      return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Image style={{height:200,width:200}} source={require('../images/splash.gif')} />
        </View>
      )
    }
}

