import React, { Component } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import Categories_Data from '../CategoryPage/ImageProfile';
import CustomerClub from './components/CustomerClub';
import GroupOffer from './components/GroupOffer'
import OfferLoyal from './components/OfferLoyal'

class CategoryADs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titleSelected: this.props.navigation.getParam('title'),
            itemSelected: 0,
            tabSelected: 'CustomerClub',
            pageSelected: <CustomerClub />
        };
    }

    _itemSelected(index) {
        this.setState({ itemSelected: index })
    }
    _tabSelected(tab) {
        switch (tab) {
            case 'CustomerClub':
                this.setState({ pageSelected: <CustomerClub /> })
                break;
            case 'GroupOffer':
                this.setState({ pageSelected: <GroupOffer /> })
                break;
            case 'OfferLoyal':
                this.setState({ pageSelected: <OfferLoyal /> })
                break;
        }
        this.setState({ tabSelected: tab })
        console.log(this.state.pageSelected);

    }

    render() {
        const Categories_Title = Categories_Data.filter(item => { return item.catTitle == this.state.titleSelected })
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f3f3' }} >
                <View style={{ height: 50, flexDirection: 'row-reverse', backgroundColor: 'white' }}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        inverted
                        data={Categories_Title}
                        extraData={this.state.itemSelected}
                        horizontal
                        renderItem={({ item, index }) =>
                            <TouchableOpacity onPress={() => this._itemSelected(index)} style={{ height: (this.state.itemSelected === index) ? '90%' : '100%', backgroundColor: '#9720d2', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'IRANsansMobile', marginHorizontal: 10, fontSize: 16, color: 'white', marginLeft: 20 }}>{item.title}</Text>
                            </TouchableOpacity>
                        } />
                </View>
                <View style={{ height: 35, width: "97%", alignSelf: 'center', marginTop: 10, elevation: 10, flexDirection: 'row-reverse', backgroundColor: 'white', borderRadius: 5, justifyContent: 'space-around' }}>
                    <TouchableOpacity
                        onPress={() => this._tabSelected('CustomerClub')}
                        style={{ flex: 1, borderBottomRightRadius: 5, borderTopRightRadius: 5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row-reverse', backgroundColor: (this.state.tabSelected === 'CustomerClub') ? '#9720d2' : 'white' }}>
                        <Text style={{ fontFamily: 'IRANSansMobile_Bold', fontSize: 11, color: (this.state.tabSelected == 'CustomerClub') ? 'white' : 'gray' }}>باشگاه‌های مشتریان</Text>
                    </TouchableOpacity>
                    <View style={{ backgroundColor: 'gray', height: '100%', width: .4 }}></View>
                    <TouchableOpacity
                        onPress={() => this._tabSelected('OfferLoyal')}
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: (this.state.tabSelected === 'OfferLoyal') ? '#9720d2' : 'white' }}>
                        <Text style={{ fontFamily: 'IRANSansMobile_Bold', fontSize: 11, color: (this.state.tabSelected == 'OfferLoyal') ? 'white' : 'gray' }}>تخفیف‌های باشگاه مشتریان</Text>
                    </TouchableOpacity>
                    <View style={{ backgroundColor: 'gray', height: '100%', width: .4 }}></View>
                    <TouchableOpacity
                        onPress={() => this._tabSelected('GroupOffer')}
                        style={{ flex: 1, borderBottomLeftRadius: 5, borderTopLeftRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: (this.state.tabSelected === 'GroupOffer') ? '#9720d2' : 'white' }}>
                        <Text style={{ fontFamily: 'IRANSansMobile_Bold', fontSize: 11, color: (this.state.tabSelected == 'GroupOffer') ? 'white' : 'gray' }}>تخفیف‌های گروهی</Text>
                    </TouchableOpacity>
                </View>
                {this.state.pageSelected}
            </SafeAreaView>
        );
    }
}

export default CategoryADs;
