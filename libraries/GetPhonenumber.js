import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ImageBackground, TextInput, TouchableOpacity, Animated } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Button } from "react-native-elements";
import { Form ,Item,Label,Input} from 'native-base';

class FadeInView extends React.Component {
    state = {
        fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
    };

    componentDidMount() {
        Animated.timing(                  // Animate over time
            this.state.fadeAnim,            // The animated value to drive
            {
                toValue: 1,                   // Animate to opacity: 1 (opaque)
                duration: 3000,              // Make it take a while
            }
        ).start();                        // Starts the animation
    }

    render() {
        let { fadeAnim } = this.state;

        return (
            <Animated.View                 // Special animatable View
                style={{
                    ...this.props.style,
                    opacity: fadeAnim,         // Bind opacity to animated value
                }}
            >
                {this.props.children}
            </Animated.View>
        );
    }
}

export default class GetPhonenumber extends Component {

    constructor() {
        super();
        this.state = {
            phonenumber: "",
            len: 300,

        }
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                <ImageBackground source={require('../images/register/header.png')}
                    style={{ height: 120, width: '100%', resizeMethod: 'scale' }} />
                <FadeInView>
                    <View style={{ marginBottom: 50, }}>
                        {/* <TextInput
                            style={{ width: 300, height: 50, fontSize: 25, marginBottom: 30, textAlign: 'center' }}
                            placeholder="example : 09128888888"
                            autoFocus={false}
                            selectionColor='#FF1C21'
                            returnKeyType='go'
                            onChangeText={(text) => {
                                this.setState({ phonenumber: text });
                            }}
                        /> */}
                        <Form style={{marginVertical:20}}>
                            <Item  floatingLabel bordered style={{height:50,width:150,padding:10}}>
                                <Label style={{fontSize:14,fontFamily:'IRANSansMobile',marginBottom:20}}>شماره همراه را وارد کنید</Label>
                                <Input style={{margin:10}} textContentType='telephoneNumber' keyboardType='phone-pad' placeholder='09128888888' placeholderTextColor={'#e7e7e7'} />
                            </Item>
                          
                        </Form>
                        <Button onPress={() => {
                            this.props.navigation.navigate('verificationpage', { phone: this.state.phonenumber })
                        }}
                            titleStyle={{ fontSize: 25, fontFamily: 'IRANSansMobile' }}
                            buttonStyle={{ height: 50, width: 150, backgroundColor: '#5CC3FE', borderRadius: 20, overflow: 'hidden',alignSelf:'center' }}
                            title="تایید"
                        />
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Image source={require('../images/register/phone.png')}
                            style={{ resizeMode: 'contain', maxWidth: 150, maxHeight: 150, marginBottom: 100 }} />
                    </View>
                </FadeInView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    textinview: {
        fontSize: 30,
        fontFamily: "traffic",
        alignItems: "center",
        justifyContent: 'center'
    }
});