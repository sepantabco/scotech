import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, AsyncStorage, Alert, TouchableOpacity } from 'react-native'
import get_key from "../Auth";
import { P_URL } from "../PUBLICURLs";
import { Icon } from 'native-base';

export default class FirstPageHeader extends Component {
    constructor(props){
        super(props);
        this.state = {title: ''}
    }
    _set_title(t){
        this.setState({title: t});
    }
    componentDidMount() {
        try{
        setInterval(() => {
            this._set_title(this.props.navigation.state.params.get_title());
        },2000)    
        }catch(err) {
            console.log(err);
        }
    }
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between',paddingHorizontal:20 }} >
              
                <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 20 }}>{this.state.title.substring(0,15)}...</Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.openDrawer()}>
                    <Icon style={{ color: 'white', fontSize: 28 }} name="menu" />

                </TouchableOpacity>
            </View>
        )
    }
}
