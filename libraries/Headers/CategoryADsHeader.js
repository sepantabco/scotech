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

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'row',justifyContent: 'space-between'}} >
                <TouchableOpacity
                    onPress={() => { this.props.navigation.navigate('Search') }}
                    style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <Icon style={{ color: 'white', fontSize: 28 }} name="search" />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center',flex: 2,justifyContent:'flex-end' }}>
                    <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 18 }}>دسته بندی</Text>
                </View>
                    {/* <TouchableOpacity
                        onPress={() => this.props.navigation.state.params.open_modal()}
                        style={{ flexDirection: 'row', alignItems: 'center', flex: 1,}}
                    >
                        <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 14 }}>فیلتر</Text>
                        <Icon style={{ color: 'white', fontSize: 20 }} type='FontAwesome5' name="filter" />
                    </TouchableOpacity> */}
                   <View style={{flex:1}}>

                   </View>
                    <TouchableOpacity
                        style={{ flex:1, justifyContent: 'flex-end' }}
                        onPress={() => this.props.navigation.openDrawer()}>
                        <Icon style={{ color: 'white', fontSize: 28 }} name="menu" />
                    </TouchableOpacity>
            </View>
        )
    }
}
