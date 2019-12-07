import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import Total from './ScoreBoardComponents/Total'
import EachGame from './ScoreBoardComponents/EachGame'
import FooterView from '../FooterViewI'
import { SafeAreaView } from 'react-navigation';
import HeaderView from '../HeaderView'
export class ScoreBoards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalSelected: true
        }
    }
    _changePage() {
        this.setState({ totalSelected: !this.state.totalSelected })
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <HeaderView navigation={navigation} />,
            headerTintColor: '#21C6D4'
        }
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ height: 50, flexDirection: 'row-reverse', backgroundColor: 'yellow' }}>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#9720d2', height: (this.state.totalSelected === true) ? '92%' : '100%' }} onPress={() => this._changePage()}>
                        <Text style={{ fontFamily: 'IRANsansMobile', fontSize: 16, color: 'white' }}>کل</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#9720d2', height: (this.state.totalSelected === false) ? '92%' : '100%' }} onPress={() => this._changePage()}>
                        <Text style={{ fontFamily: 'IRANsansMobile', fontSize: 16, color: 'white' }}>هر بازی</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1}}>
                    {(this.state.totalSelected === true) ? <Total /> : <EachGame />}
                </View>
                <View>
                    <FooterView menu={2} navigation={this.props.navigation} />
                </View>
            </SafeAreaView>
        )
    }
}

export default ScoreBoards
