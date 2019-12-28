import React, { Component } from 'react';
import { Text, View, Fragment, Image, AsyncStorage, Alert, TouchableOpacity } from 'react-native'
import get_key from "../Auth";
import { P_URL } from "../PUBLICURLs";
import { Icon } from 'native-base';

export default class CategoryADsHeader extends Component {
    
    _colseModal = () => {
        this.setState({ NotifiVisible: false });
    }
    _openModal() {
        this.setState({ NotifiVisible: true })
    }   
    _sendFilterTypeToMain() {
        console.log('dghfhf');

        // this.props.take_filter_type(index)
    }
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }} >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '30%' }}>
                    <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 18 }}>دسته بندی</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '30%', alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 18 }}>فیلتر</Text>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.state.params.open_modal()}
                    >
                        <Icon style={{ color: 'white', fontSize: 20 }} type='FontAwesome5' name="filter" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.openDrawer()}>
                        <Icon style={{ color: 'white', fontSize: 28 }} name="menu" />
                    </TouchableOpacity>
                </View>
                <View>

                </View>
            </View>
        )
    }
}
