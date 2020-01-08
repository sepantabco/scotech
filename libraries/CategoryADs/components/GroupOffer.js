import React, { Component } from 'react'
import { Text, View, Image, FlatList, ActivityIndicator, TouchableOpacity, AsyncStorage } from 'react-native'
import { Icon } from 'native-base';
import { P_URL } from '../../PUBLICURLs';
import CountDown from 'react-native-countdown-component';
import { convertCost } from '../../external/convert_cost'
import get_key from "../../Auth";
export class GroupOffer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            GroupOfferData: [],
            offset: 0,
            loaded: true,
            dataEnded: false,
            latitude: '',
            longitude: '',
        }
    }
    async _getUserLocation() {
        try {
            let userCurrentLocation = await AsyncStorage.getItem('userCurrentLocation');
            let userCurrentLocationJson = JSON.parse(userCurrentLocation)
            return userCurrentLocationJson
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async fetch_filter(filter_type) {
        // TODO add location
        // let userLocation = await this._getUserLocation();
        // console.log(userLocation)
        // const lon = JSON.parse(userLocation).longitude
        // const lat = JSON.parse(userLocation).latitude
        this.setState({ loaded: true, GroupOfferData: [] });
        fetch(P_URL + 'filter_ads?filter_type=' + filter_type + '&cid=' + this.props.cid + '&lon=' + this.state.longitude + '&lat=' + this.state.latitude, { headers: { Authorization: get_key() } }).then(response => {
            response.json().then(responseJson => {
                responseJson.map(item => {
                    this.state.GroupOfferData.push({ title: item.title, short_description: item.short_description, address: item.address, old_cost: item.old_cost, new_cost: item.new_cost, bought: item.bought, s_cost: item.s_cost, time: parseInt(item.time), pic_link: item.pic_link, ad_id: item.ad_id })
                    this.setState({ loaded: false })
                })
            })
        })
    }
    fetch_new_data() {
        if (!this.state.dataEnded) {
            this.setState({ loaded: true });
            fetch(P_URL + 'more?option=' + this.props.cid + '&offset=' + this.state.offset, { headers: { Authorization: get_key() } }).then(response => {
                response.json().then(responseJson => {
                    console.log(responseJson,'adagahajaj');
                    
                    responseJson.map(item => {
                        this.state.GroupOfferData.push({ title: item.title, short_description: item.short_description, address: item.address, old_cost: item.old_cost, new_cost: item.new_cost, bought: item.bought, s_cost: item.s_cost, time: parseInt(item.time), pic_link: item.pic_link, ad_id: item.ad_id })

                    })
                    if (responseJson.length == 0) {
                        this.setState({ dataEnded: true });
                    }
                    let newOffSet = this.state.offset + 1
                    this.setState({ offset: newOffSet, loaded: false })

                });
            });
        }
    }
    async componentDidMount() {
        this.fetch_new_data();
        let userCurrentLocation = await this._getUserLocation()
        console.log(userCurrentLocation, 'groupofflocation')
        this.setState({
            latitude: userCurrentLocation.latitude,
            longitude: userCurrentLocation.longitude
        })

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
                        <TouchableOpacity
                            onPress={() => { this.props.navigation.navigate('GroupADs', { ad_id: item.ad_id }) }}
                            style={{ height: 150, width: '97%', backgroundColor: '#ffffff', alignSelf: 'center', elevation: 10, marginVertical: 10, }}>
                            <View style={{ flex: 3, flexDirection: 'row-reverse' }}>
                                <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ height: 20, width: 20, backgroundColor: '#573C65', position: 'absolute', zIndex: 1, right: '5%', top: '5%', borderTopRightRadius: 5, borderBottomLeftRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 8, color: 'white' }}>1</Text>
                                                </View>
                                    <Image resizeMode='cover' style={{ height: '90%', width: '90%', borderRadius: 5 }} source={{ uri: item.pic_link }} />
                                </View>
                                <View style={{ flex: 4 }}>
                                    <View style={{ flex: 3, flexDirection: 'row-reverse' }}>
                                        <View style={{ flex: 1, justifyContent: 'space-around', padding: 6 }}>
                                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 12 }}>{item.title}</Text>
                                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>{item.short_description}</Text>
                                        </View>

                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', padding: 6 }}>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10,color:'gray' }}>{item.address}</Text>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, textDecorationLine: 'line-through', color: 'gray'  }}>{convertCost(item.old_cost)},000 تومان</Text>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10}}>{convertCost(item.new_cost)},000 تومان</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row-reverse', padding: 6, justifyContent: 'space-between' }}>
                                <View style={{ justifyContent: 'space-around' }}>
                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>تعداد خرید: {item.bought} </Text>
                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>مقدار Scoin مورد نیاز: <Image resizeMode='stretch' style={{ height: 12, width: 12 }} source={require('../../../images/logos/scoin_purpule.png')} /> {item.s_cost}</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <View style={{ height: 25, width: 120, borderColor: '#f7bfe2', borderWidth: 1.5, borderRadius: 10, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row-reverse' }}>
                                        <Icon name="ios-timer" style={{ fontSize: 18, marginRight: 5, color: '#573c65' }} />
                                        <CountDown
                                            size={7}
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
                        </TouchableOpacity>
                    } />
                {(this.state.loaded === true) && <ActivityIndicator />}

            </View>
        )
    }
}

export default GroupOffer
