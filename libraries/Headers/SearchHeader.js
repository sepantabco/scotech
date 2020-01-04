import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native'
import get_key from "../Auth";
import { P_URL } from "../PUBLICURLs";
import { Icon } from 'native-base';

export default class SearchHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SearchValue: ''
        }
    }
    _sendSearchData() {
        let SearchValue=this.state.SearchValue
        this.props.navigation.getParam('getSearchData')(SearchValue)
    }
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }} >
                <View style={{ width: '90%', flexDirection: 'row-reverse', alignItems: 'center', height: 40, elevation: 5, marginHorizontal: '5%', marginVertical: 10, backgroundColor: 'white', borderRadius: 20, paddingLeft: 25 }}>
                    <Icon  name='search' style={{ fontSize: 30, marginLeft: 10, color: '#573c65' }} />
                    <View style={{ width: '70%', height: 40, }}>
                        <TextInput
                            // onChangeText={(value) => this.setState({ SearchValue: value })}
                            returnKeyType='search'
                            onChangeText={(value) => this.setState({ SearchValue: value })}
                            onSubmitEditing={()=>this._sendSearchData()}
                            autoFocus={true} placeholderTextColor='#c4c4c4' placeholder='جست‌وجو' style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 14, color: '#c4c4c4' }} />
                    </View>
                </View>
            </View>
        )
    }
}
