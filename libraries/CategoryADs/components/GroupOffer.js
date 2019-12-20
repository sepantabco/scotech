import React, { Component } from 'react'
import { Text, View, Image, FlatList } from 'react-native'
import { Icon } from 'native-base';
import { P_URL } from '../../PUBLICURLs';
export class GroupOffer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            GroupOfferData: [ ],
            offset: 0
        }
    }
    fetch_new_data() {
        fetch(P_URL + 'more?option=' + this.props.cid + '&offset=' + this.state.offset).then(response => {
            response.json().then(responseJson => {
                this.setState({GroupOfferData: responseJson});
            });
        });
    }
    componentDidMount() {
        console.log('mounted');
        this.fetch_new_data();
    }
    render() {
        return (
            <View style={{ flex: 1, marginTop: 10 }}>
                <FlatList
                    keyExtractor={(item, index) => { return index.toString() }}
                    data={this.state.GroupOfferData}
                    renderItem={({ item }) =>
                        <View style={{ height: 150, width: '97%', backgroundColor: '#ffffff', alignSelf: 'center', elevation: 10, marginVertical: 10, }}>
                            <View style={{ flex: 3, flexDirection: 'row-reverse' }}>
                                <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image resizeMode='cover' style={{ height: '90%', width: '90%', borderRadius: 5 }} source={item.pic_link} />
                                </View>
                                <View style={{ flex: 4 }}>
                                    <View style={{ flex: 3, flexDirection: 'row-reverse' }}>
                                        <View style={{ flex: 1, justifyContent: 'space-around', padding: 6 }}>
                                            <Text style={{ fontFamily: 'IRANSansMobile_Bold', fontSize: 11 }}>{item.title}</Text>
        <Text style={{ fontFamily: 'IRANSansMobile_Bold', fontSize: 10 }}>{item.short_description}</Text>
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
                                <View style={{flex:1,justifyContent:'center'}}>
                                <View style={{ height: 20, width: 80, borderColor: 'gray', borderWidth: 1, borderRadius: 10, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row-reverse' }}>
                                    <Icon name="ios-timer" style={{ fontSize: 18, marginRight: 5 }} />
                                    <Text style={{ fontFamily: 'IRANSans(FaNum)', fontSize: 10 }}>1:10:24:23</Text>
                                </View>
                                </View>
                            </View>
                        </View>
                    } />
            </View>
        )
    }
}

export default GroupOffer
