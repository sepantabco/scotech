import React, { Component } from 'react'
import { Text, View, Image, FlatList, ActivityIndicator } from 'react-native'
import { Icon } from 'native-base';
import { P_URL } from '../../PUBLICURLs';
import CountDown from 'react-native-countdown-component';
export class GroupOffer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            GroupOfferData: [],
            offset: 0,
            loaded: true
        }
    }
    fetch_new_data() {
        this.setState({ loaded: true })
        fetch(P_URL + 'more?option=' + this.props.cid + '&offset=' + this.state.offset).then(response => {
            response.json().then(responseJson => {
                responseJson.map(item => {
                    this.state.GroupOfferData.push({ title: item.title, short_description: item.short_description, address: item.address, old_cost: item.old_cost, new_cost: item.new_cost, bought: item.bought, s_cost: item.s_cost, time: parseInt(item.time), pic_link: item.pic_link })

                }

                )
                let newOffSet = this.state.offset + 5
                console.log(newOffSet)
                this.setState({ offset: newOffSet, loaded: false })

            });
        });
    }
    componentDidMount() {
        this.fetch_new_data();
    }
    render() {
        return (
            <View style={{ flex: 1, marginTop: 10 }}>
                <FlatList
                    keyExtractor={(item, index) => { return index.toString() }}
                    data={this.state.GroupOfferData}
                    extraData={this.state.offset}
                    onEndReachedThreshold={0.01}
                    onEndReached={() => { this.fetch_new_data() }}
                    renderItem={({ item }) =>
                        <View style={{ height: 150, width: '97%', backgroundColor: '#ffffff', alignSelf: 'center', elevation: 10, marginVertical: 10, }}>
                            <View style={{ flex: 3, flexDirection: 'row-reverse' }}>
                                <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image resizeMode='cover' style={{ height: '90%', width: '90%', borderRadius: 5 }} source={{ uri: item.pic_link }} />
                                </View>
                                <View style={{ flex: 4 }}>
                                    <View style={{ flex: 3, flexDirection: 'row-reverse' }}>
                                        <View style={{ flex: 1, justifyContent: 'space-around', padding: 6 }}>
                                            <Text style={{ fontFamily: 'IRANSansMobile_Bold', fontSize: 11 }}>{item.title}</Text>
                                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>{item.short_description}</Text>
                                        </View>

                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', padding: 6 }}>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>{item.address}</Text>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>{item.old_cost},000 تومان</Text>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>{item.new_cost},000 تومان</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row-reverse', padding: 6, justifyContent: 'space-between' }}>
                                <View style={{ justifyContent: 'space-around' }}>
                                    <Text style={{ fontFamily: 'IRANSansMobile_Bold', fontSize: 10 }}>تعداد خرید: {item.bought} </Text>
                                    <Text style={{ fontFamily: 'IRANSansMobile_Bold', fontSize: 10 }}>مقدار Scoin مورد نیاز: <Icon style={{ fontSize: 10 }} name='logo-usd' /> {item.s_cost}</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <View style={{ height: 25, width: 100, borderColor: 'gray', borderWidth: 1, borderRadius: 10, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row-reverse' }}>
                                        <Icon name="ios-timer" style={{ fontSize: 18, marginRight: 5 }} />
                                        <CountDown
                                            size={5}
                                            until={item.time}
                                            digitStyle={{ backgroundColor: '#FFF' }}
                                            digitTxtStyle={{ color: 'black', fontSize: 8, fontFamily: 'IRANSans(FaNum)' }}
                                            separatorStyle={{ color: 'black' }}
                                            timeToShow={['D', 'H', 'M', 'S']}
                                            timeLabels={{ m: null, s: null }}
                                            showSeparator
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    } />
                {(this.state.loaded === true) && <ActivityIndicator />}

            </View>
        )
    }
}

export default GroupOffer
