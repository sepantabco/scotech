import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import Total from './ScoreBoardComponents/Total'
import EachGame from './ScoreBoardComponents/EachGame'
import FooterView from '../FooterViewI'
import { SafeAreaView } from 'react-navigation';
import HeaderView from '../HeaderView'
import StoryBoardLeagues from './ScoreBoardComponents/StoryBoardLeagues'
import ScoreBoardsHeader from '../Headers/ScoreBoardsHeader'
export class ScoreBoards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageSelected: <Total />,
            tabSelected:'total'
        }
    }
    _pageSelected(pageSelected) {
        this.setState({tabSelected:pageSelected})
        switch (pageSelected) {
            case 'total':
                this.setState({ pageSelected: <Total /> })
                break;
            case 'eachgame':
                this.setState({ pageSelected: <EachGame /> })
                break;
            case 'storyboardleages':
                this.setState({ pageSelected: <StoryBoardLeagues /> })
                break;
        }


    }

    static navigationOptions = ({ navigation }) => {
       
        return {
            headerTitle: <ScoreBoardsHeader navigation={navigation} />,
            headerLeft: null,
            headerStyle: {
                backgroundColor: '#573c65',
            }
        }
    };


    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ height: 50, flexDirection: 'row-reverse', backgroundColor: 'yellow' }}>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#573c65', height: (this.state.tabSelected === 'total') ? '92%' : '100%' }} onPress={() => this._pageSelected('total')}>
                        <Text style={{ fontFamily: 'IRANsansMobile', fontSize: 16, color: 'white' }}>کل</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#573c65', height: (this.state.tabSelected === 'eachgame') ? '92%' : '100%' }} onPress={() => this._pageSelected('eachgame')}>
                        <Text style={{ fontFamily: 'IRANsansMobile', fontSize: 16, color: 'white' }}>هر بازی</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#573c65', height: (this.state.tabSelected === 'storyboardleages') ? '92%' : '100%' }} onPress={() => this._pageSelected('storyboardleages')}>
                        <Text style={{ fontFamily: 'IRANsansMobile', fontSize: 16, color: 'white' }}>لیگ‌ها</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    {this.state.pageSelected}
                </View>
                <View>
                    <FooterView menu={2} navigation={this.props.navigation} />
                </View>
            </SafeAreaView>
        )
    }
}

export default ScoreBoards
