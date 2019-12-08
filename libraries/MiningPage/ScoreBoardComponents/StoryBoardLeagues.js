import React, { Component } from 'react'
import { Text, View,FlatList,Image } from 'react-native'

export class StoryBoardLeagues extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            eachGameData: [ { your_score: 12323, game_name: 'PacMan', max_score: 34234 },
            ]
        }
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
                            <View style={{ flex: 2, paddingTop: 20, borderBottomWidth: .5, borderColor: '#e7e7e7', justifyContent: 'space-between'}}>
                                <View style={{ flex: 1 }}><Text style={{ textAlign: 'right', marginBottom: 10 }}>{item.game_name}</Text></View>
                                <View style={{ flex: 2,marginTop:10}}>
                                    <View style={{ flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between'}}>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: '#9720d2' }}>امتیاز شما:</Text>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: "#9720d2", marginLeft: 10 }}>{item.your_score}</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row-reverse', justifyContent: 'space-between', }}>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12, color: 'black' }}>بالاترین امتیاز این لیگ</Text>
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

export default StoryBoardLeagues
