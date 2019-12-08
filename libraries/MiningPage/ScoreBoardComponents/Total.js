import React, { Component } from 'react'
import { Text, View, Image, FlatList } from 'react-native'
import { P_URL } from '../../PUBLICURLs';
import { ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';
export class Total extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            totalScoreData: [],
            loading: true
        }
    }
    get_players_data() {
        let newOffset = this.state.offset + 1
        this.setState({ loading: true });
        // TODO: add authentication
        fetch(P_URL + 'get_best_players_overall?offset=' + newOffset).then(response => {
            response.json().then(responseJson => {
                responseJson.map(item => {
                    if (responseJson.length > 0) {
                        let username = item.username
                        let rate = item.rate
                        let level = item.level
                        this.state.totalScoreData.push({ username: username, rate: rate, level: level })
                        console.log(this.state.totalScoreData);

                        this.setState({ offset: newOffset });
                    }
                })
                this.setState({ loading: false })
            })
        })
    }
    componentDidMount() {

        this.get_players_data();
    }


    render() {
        return (
            <View style={{ flex: 1 }} >
                {/* کارت امتیازات */}
                <FlatList
                    extraData={this.state.offset}
                    data={this.state.totalScoreData}
                    onEndReachedThreshold={0.01}
                    // contentContainerStyle={{paddingBottom: 80}}
                    onEndReached={() => this.get_players_data()}
                    renderItem={({ item, index }) =>
                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-around', marginBottom: 10 }}>
                            <View style={{ flex: .4, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: 'black' }}>{index + 1}</Text>
                            </View>
                            {/* ThumbNail */}
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Image style={{ height: 60, width: 60 }} source={require('../../../images/person.png')} />
                                <View style={{ justifyContent: 'center', alignItems: 'center', height: 10, width: 20, backgroundColor: "#9720d2", borderRadius: 10, marginTop: -7.5 }}>
                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 10 }}>{item.level}</Text>
                                </View>
                            </View>
                            {/*end ThumbNail */}
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                                <Text style={{ fontSize: 12, color: 'black' }}>{item.username}</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
                                <Text style={{ fontSize: 12, color: 'black', fontFamily: 'IRANSans(FaNum)', color: '#9720d2' }}>{item.rate}</Text>
                            </View>
                        </View>
                    } />

                {/* end کارت امتیازات  */}
                {(this.state.loading === true) && <ActivityIndicator />}
            </View>
        )
    }
}

export default Total
