import React, { Component, PureComponent } from 'react'
import { Text, View, Image, FlatList, AsyncStorage, SafeAreaView } from 'react-native'
import { P_URL } from '../../PUBLICURLs';
import get_key from "../../Auth";
import { ActivityIndicator } from 'react-native-paper';
export class Total extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            totalScoreData: [],
            loading: true,
            userTotalRate: 0,
            userLevel: 0,
            userName: '',
            userRank: 0,
        }
    }
    get_players_data() {
        let newOffset = this.state.offset + 1
        this.setState({ loading: true });
        // TODO: add authentication
        fetch(P_URL + 'get_best_players_overall?offset=' + newOffset, { headers: { Authorization: get_key() } }).then(response => {
            response.json().then(responseJson => {
                console.log(responseJson,'bbbbbbbb')
                responseJson.map(item => {
                    if (responseJson.length > 0) {
                        let username = item.username
                        let rate = item.rate
                        let level = item.level
                        this.state.totalScoreData.push({ username: username, rate: rate, level: level })
                        this.setState({ offset: newOffset });
                    }
                })
                this.setState({ loading: false })
            })
        })
    }
    componentDidMount() {
        this._getGamesData()
        this.get_players_data();
    }
    async getUsername() {
        try {
            let token = await AsyncStorage.getItem('username');
            return token;
        } catch (error) {
            Alert.alert(error.toString());
        }
    }
    async _getGamesData() {
        const username = await this.getUsername();
        this.setState({ userName: username });
        fetch(P_URL + 'games?username=' + username, { headers: { Authorization: get_key() } }).then(response => {
            response.json().then(responseJson => {
                this.setState({ userTotalRate: responseJson.total_rate, userLevel: responseJson.level, })
            })
        })

    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f8f8', paddingTop: 10 }} >


                {/* کارت امتیازات */}
                < FlatList
                    extraData={this.state.offset}
                    data={this.state.totalScoreData}
                    onEndReachedThreshold={0.01}
                    // contentContainerStyle={{paddingBottom: 80}}
                    onEndReached={() => this.get_players_data()}
                    renderItem={({ item, index }) =>
                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-around', marginBottom: 10, }}>
                            <View style={{ flex: .4, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: 'black' }}>{index + 1}</Text>
                                {this.state.userName == item.username && this.setState({ userRank: index + 1 })}
                            </View>
                            {/* ThumbNail */}
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Image style={{ height: 50, width: 50 }} source={require('../../../images/person.png')} />
                                <View style={{ justifyContent: 'center', alignItems: 'center', height: 10, width: 20, backgroundColor: "#573c65", borderRadius: 10, marginTop: -7.5 }}>
                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 10 }}>{item.level}</Text>
                                </View>
                            </View>
                            {/*end ThumbNail */}
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: 'gray' }}>نام کاربری</Text>
                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: 'black' }}>{item.username}</Text>

                            </View>
                            <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: 'gray' }}>مجموع امتیازات</Text>
                                <Text style={{ fontSize: 12, color: 'black', fontFamily: 'IRANSans(FaNum)', color: '#573c65' }}>{item.rate}</Text>
                            </View>
                        </View>
                    } />

                {/* end کارت امتیازات  */}
                {(this.state.loading === true) && <ActivityIndicator />}

                <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-around', marginVertical: 10, backgroundColor: 'yellow', paddingVertical: 2 }}>
                    <View style={{ flex: .4, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: 'black' }}>{this.state.userRank}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ height: 50, width: 50 }} source={require('../../../images/person.png')} />
                        <View style={{ justifyContent: 'center', alignItems: 'center', height: 10, width: 20, backgroundColor: "#573c65", borderRadius: 10, marginTop: -7.5 }}>
                <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 10 }}>{this.state.userLevel}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: 'gray' }}>نام کاربری شما</Text>
                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: 'black' }}>{this.state.userName}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: 'gray' }}>مجموع امتیازات شما</Text>
                        <Text style={{ fontSize: 12, color: 'black', fontFamily: 'IRANSans(FaNum)', color: '#573c65' }}>{this.state.userTotalRate}</Text>
                    </View>
                </View>
            </SafeAreaView >
        )
    }
}

export default Total
