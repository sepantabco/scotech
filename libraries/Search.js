import React, { Component } from 'react'
import { Text, View, Image, FlatList, ActivityIndicator, TouchableOpacity, SafeAreaView, TextInput } from 'react-native'
import { Icon } from 'native-base';
import { P_URL } from './PUBLICURLs';
import get_key from "./Auth";
import { convertCost } from './external/convert_cost'
import SearchHeader from './Headers/SearchHeader';
import CountDown from 'react-native-countdown-component';
export class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SearchData: [],
            offset: 0,
            loaded: true,
            SearchValue: '',
            SearchChanged: false
        }
    }

    static navigationOptions = ({ navigation }) => {

        return {
            headerTitle: <SearchHeader navigation={navigation} />,
            headerStyle: {
                backgroundColor: '#573c65',
            }
        }
    };
    _fetchSearchData() {
        fetch(P_URL + 'search_data?indexstr=' + this.state.SearchValue + '&offset=' + this.state.offset, { headers: { Authorization: get_key() } }).then(response => {
            response.json().then(responseJson => {
                this.setState({ loaded: true, SearchChanged: !this.state.SearchChanged, })
                console.log(responseJson.items)
                responseJson.items.map(item => {
                    this.state.SearchData.push({ title: item.title, short_desc: item.short_desc, old_cost: item.old_cost, cost: item.cost, bought: item.bought, time: parseInt(item.time), pic: item.pic, ad_id: item.id, off: item.off })
                }

                )


            });
        });
    }
    _nextOffset() {
        let newOffSet = this.state.offset + 1
        this.setState({ offset: newOffSet, loaded: false })
        this._fetchSearchData()
    }
    async _getSearchData(SearchValue) {
        await this.setState({ SearchData: [], SearchValue: SearchValue, offset: 0, loaded: false })
        this._fetchSearchData()
    }

    componentDidMount() {
        this.props.navigation.setParams({ getSearchData: this._getSearchData.bind(this) });
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, marginTop: 10 }}>
                <FlatList
                    keyExtractor={(item, index) => { return index.toString() }}
                    data={this.state.SearchData}
                    extraData={this.state.SearchChanged}
                    onEndReachedThreshold={0.01}
                    onEndReached={() => { this._nextOffset() }}
                    renderItem={({ item }) =>
                        <TouchableOpacity
                            onPress={() => { this.props.navigation.navigate('GroupADs', { ad_id: item.ad_id }) }}
                            style={{ height: 150, width: '97%', backgroundColor: '#ffffff', alignSelf: 'center', elevation: 10, marginVertical: 10, }}>
                            <View style={{ flex: 3.5, flexDirection: 'row-reverse' }}>
                                <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ height: 20, minWidth: 20, backgroundColor: '#573C65', position: 'absolute', zIndex: 1, right: '5%', top: '5%', borderTopRightRadius: 5, borderBottomLeftRadius: 5, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 2 }}>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 8, color: 'white' }}>{item.off}</Text>
                                    </View>
                                    <Image resizeMode='cover' style={{ height: '90%', width: '90%', borderRadius: 5 }} source={{ uri: item.pic }} />
                                </View>
                                <View style={{ flex: 4 }}>
                                    <View style={{ flex: 3, flexDirection: 'row-reverse' }}>
                                        <View style={{ flex: 1, justifyContent: 'space-around', padding: 6 }}>
                                            <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 13 }}>{item.title}</Text>
                                            {item.short_desc.length > 150 ? (<Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, marginTop: 10 }}>{item.short_desc.substring(0, 150)}...</Text>)
                                                : (<Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, marginTop: 10 }}>{item.short_desc}</Text>)
                                            }
                                        </View>

                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', padding: 6 }}>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>address</Text>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10, color: 'gray', textDecorationLine: 'line-through' }}>{convertCost(item.old_cost)},000 تومان</Text>
                                        <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>{convertCost(item.cost)},000 تومان</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row-reverse', padding: 6, justifyContent: 'space-between' }}>
                                <View style={{ justifyContent: 'space-around' }}>
                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>تعداد خرید: {item.bought} </Text>
                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>مقدار Scoin مورد نیاز: <Image resizeMode='stretch' style={{ height: 12, width: 12 }} source={require('../images/logos/scoin_purpule.png')} /> {item.s_cost}</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <View style={{ height: 25, width: 100, borderColor: '#F7BFE2', borderWidth: 1.5, borderRadius: 10, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row-reverse' }}>
                                        <Icon name="ios-timer" style={{ fontSize: 18, marginRight: 5, color: '#573c65' }} />
                                        <CountDown
                                            size={5}
                                            until={0}
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
                {this.state.loaded == false ? <ActivityIndicator /> : null}

            </SafeAreaView>
        )
    }
}

export default Search
