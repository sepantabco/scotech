import React, { Component } from 'react'
import { Text, View, FlatList, Image ,PixelRatio} from 'react-native'
import { P_URL } from '../../PUBLICURLs';

export class EachGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            eachGameData: []
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
        // TODO: add authentication
        fetch(P_URL + 'get_user_played_games?username=' + username,{headers: {Authorization: get_key()}}).then(response => {
            response.json().then(responseJson => {
                responseJson.map(item => {
                    let your_score = item.your_score
                    let game_name = item.game.name
                    let pic_link = item.game.pic_link
                    let max_score = item.game.max_score
                    this.state.eachGameData.push({ your_score: your_score, game_name: game_name, pic_link: pic_link, max_score: max_score })
                    this.setState({ selected: true })
                })

            })
        })
    }
    render() {
        return (
            <View >
               
                {/* کارت امتیازات هر بازی */}
                <FlatList
                    extraData={this.state}
                    data={this.state.eachGameData}
                    keyExtractor={(item, index) => { return index }}
                    renderItem={({ item }) =>
                        <View style={{ flexDirection: 'row-reverse', height: 120 }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={{ uri: item.pic_link }} style={{ height: '80%', width: '80%', backgroundColor: '#e7e7e7', borderRadius: 10 }}>
                                </Image>
                            </View>
                            <View style={{ flex: 2, paddingTop: 20, borderBottomWidth: .5, borderColor: '#e7e7e7', justifyContent: 'space-between' }}>
                                <View style={{ flex: 1 }}><Text style={{ textAlign: 'right', marginBottom: 10 }}>{item.game_name}</Text></View>
                                <View style={{ flex: 2, marginTop: 10 }}>
                                    <View style={{ flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: '#9720d2' }}>امتیاز شما:</Text>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: "#9720d2", marginLeft: 10 }}>{item.your_score}</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between', }}>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: 'black' }}>بالاترین امتیاز این بازی</Text>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: "black", marginLeft: 10 }}>{item.max_score}</Text>
                                    </View>
                                    <View style={{ flex: 1 }}></View>
                                </View>
                            </View>
                        </View>
                    } />

                {/*end کارت امتیازات هر بازی */}
            </View>
        )
    }
}

export default EachGame
