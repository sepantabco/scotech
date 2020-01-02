import React, { Component } from 'react'
import { Text, View, FlatList, Image } from 'react-native'
import { P_URL } from '../../PUBLICURLs';
import get_key from "../../Auth";

export class StoryBoardLeagues extends Component {
    constructor(props) {
        super(props);
        this.state = {
            LeaguesData:[],
            loaded:false
        }
    }
    async getUsername() {
        return 'aicam';

        try {
            let token = await AsyncStorage.getItem('username');
            return token;
        } catch (error) {
            Alert.alert(error.toString());
        }
    }
    async componentDidMount() {
        const username = await this.getUsername()
        fetch(P_URL + 'get_events_rankings?username=' + username,{headers: {Authorization: get_key()}}).then(response => {
            response.json().then(responseJson => {
                responseJson.map(item => {
                    let rate = item.rate
                    let max_rate = item.max_rate
                    let title = item.title
                    this.state.LeaguesData.push({ rate: rate, max_rate: max_rate, title: title })
                    this.setState({loaded:true})
                }
                )
                console.log(this.state.LeaguesData)
            })
        })
    }
    render() {
        return (
            <View >
                {/* کارت امتیازات هر لیگ */}
                <FlatList
                    data={this.state.LeaguesData}
                    extraData={this.state}
                    keyExtractor={(item, index) => { return index.toString() }}
                    renderItem={({ item }) =>
                        <View style={{ flexDirection: 'row-reverse', height: 120 }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                {/* <Image source={require('../images/preload.jpg')} style={{ height: '80%', width: '80%', backgroundColor: '#e7e7e7', borderRadius: 10 }}/> */}
                            </View>
                            <View style={{ flex: 2, paddingTop: 20, borderBottomWidth: .5, borderColor: '#e7e7e7', justifyContent: 'space-between' }}>
                                <View style={{ flex: 1 }}><Text style={{ textAlign: 'right', marginBottom: 10 }}>{item.title}</Text></View>
                                <View style={{ flex: 2, marginTop: 10 }}>
                                    <View style={{ flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: '#9720d2' }}>امتیاز شما:</Text>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: "#9720d2", marginLeft: 10 }}>{item.rate}</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between', }}>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: 'black' }}>بالاترین امتیاز این لیگ</Text>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: "black", marginLeft: 10 }}>{item.max_rate}</Text>
                                    </View>
                                    <View style={{ flex: 1 }}></View>
                                </View>
                            </View>
                        </View>
                    } />

                {/*end کارت امتیازات هر لیگ */}
            </View>
        )
    }
}

export default StoryBoardLeagues
