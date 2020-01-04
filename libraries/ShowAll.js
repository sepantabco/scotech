import React, { Component } from 'react'
import { Text, View, Image, FlatList, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native'
import { Icon } from 'native-base';
import { P_URL } from '../libraries/PUBLICURLs';
import get_key from "./Auth";
import {convertCost} from '../libraries/external/convert_cost'
import CountDown from 'react-native-countdown-component';
import ShowAllHeader from '../libraries/Headers/ShowAllHeader'
export class ShowAll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAllData: [],
            offset: 0,
            loaded: false,
            cid: this.props.navigation.getParam('cid'),
        }
    }
    static navigationOptions = ({ navigation }) => {

        return {
            headerTitle: <ShowAllHeader navigation={navigation} />,
            headerStyle: {
                backgroundColor: '#573c65',
            }
        }
    };
    fetch_new_data() {
        this.setState({ loaded: true })
        fetch(P_URL + 'more?option=' + this.state.cid + '&offset=' + this.state.offset,{headers: {Authorization: get_key()}}).then(response => {
            response.json().then(responseJson => {
                responseJson.map(item => {
                    this.state.showAllData.push({ title: item.title, short_description: item.short_description, address: item.address, old_cost: item.old_cost, new_cost: item.new_cost, bought: item.bought, s_cost: item.s_cost, time: parseInt(item.time), pic_link: item.pic_link, ad_id: item.ad_id })
                    console.table(this.state.showAllData);

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
            <SafeAreaView style={{ flex: 1, marginTop: 10 }}>
                <FlatList
                    keyExtractor={(item, index) => { return index.toString() }}
                    data={this.state.showAllData}
                    extraData={this.state.offset}
                    onEndReachedThreshold={0.01}
                    onEndReached={() => { this.fetch_new_data() }}
                    renderItem={({ item }) =>
                        <TouchableOpacity
                            onPress={() => { this.props.navigation.navigate('GroupADs', { ad_id: item.ad_id }) }}
                            style={{ height: 150, width: '97%', backgroundColor: '#ffffff', alignSelf: 'center', elevation: 10, marginVertical: 10, }}>
                            <View style={{ flex: 3.5, flexDirection: 'row-reverse' }}>
                                <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image resizeMode='cover' style={{ height: '90%', width: '90%', borderRadius: 5 }} source={{ uri: item.pic_link }} />
                                </View>
                                <View style={{ flex: 4 }}>
                                    <View style={{ flex: 3, flexDirection: 'row-reverse' }}>
                                        <View style={{ flex: 1, justifyContent: 'space-around', padding: 6 }}>
                                            <Text style={{ fontFamily: 'IRANSansMobile_Bold', fontSize: 13 }}>{item.title}</Text>
                                            {item.short_description.length > 150 ? (<Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10,marginTop:5 }}>{item.short_description.substring(0, 150)}...</Text>)
                                                : (<Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10,marginTop:5 }}>{item.short_description}</Text>)
                                            }
                                        </View>

                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', padding: 6 }}>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>{item.address}</Text>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10,color: 'gray', textDecorationLine: 'line-through' }}>{convertCost(item.old_cost)},000 تومان</Text>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>{convertCost(item.new_cost)},000 تومان</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row-reverse', padding: 6, justifyContent: 'space-between' }}>
                                <View style={{ justifyContent: 'space-around' }}>
                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>تعداد خرید: {item.bought} </Text>
                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>مقدار Scoin مورد نیاز: <Image resizeMode='stretch' style={{ height: 12, width: 12 }} source={require('../images/logos/scoin_purpule.png')} /> {item.s_cost}</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <View style={{ height: 25, width:100, borderColor: '#F7BFE2', borderWidth: 1.5, borderRadius: 10, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row-reverse' }}>
                                        <Icon name="ios-timer" style={{ fontSize: 18, marginRight: 5 ,color: '#573c65'}} />
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
                        </TouchableOpacity>
                    } />
                {(this.state.loaded === false) && <ActivityIndicator />}

            </SafeAreaView>
        )
    }
}

export default ShowAll
