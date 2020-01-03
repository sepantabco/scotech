import React, { Component } from 'react'
import { Image, View, FlatList, Text, TouchableOpacity } from 'react-native'
import Styles from './css/CompeleteMenue.css'
import LinearGradient from "react-native-linear-gradient";
import Categories_data from "./ImageProfile";
import { P_URL } from '../PUBLICURLs';
import get_key from '../Auth';
import CompeleteMenueHeader from '../Headers/CompeleteMenueHeader';

export class CompeleteMenue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoriesCount: [],
            categoryClicked: false,
            categorySelected: 'R&F',
            categoryData: [
                { Id: 1, faTiltle: 'رستوران ها و فست فود', titleIcon: { Icon: require('../../images/logos/restaurant.png'), Iconp: require('../../images/logos/restaurant_p.png') }, catTitle: 'R&F', },
                { Id: 2, faTiltle: 'تفریحی و ورزشی', titleIcon: { Icon: require('../../images/logos/tafrihi.png'), Iconp: require('../../images/logos/tafrihi_p.png') }, catTitle: 'T&S' },
                { Id: 3, faTiltle: 'پزشکی و سلامت', titleIcon: { Icon: require('../../images/logos/medicine.png'), Iconp: require('../../images/logos/medicine_p.png') }, catTitle: 'H&M' },
                { Id: 4, faTiltle: 'هنر و تئاتر', titleIcon: { Icon: require('../../images/logos/art.png'), Iconp: require('../../images/logos/art_p.png') }, catTitle: 'A&T' },
                { Id: 5, faTiltle: 'آموزشی', titleIcon: { Icon: require('../../images/logos/education.png'), Iconp: require('../../images/logos/education_p.png') }, catTitle: 'E' },
                { Id: 6, faTiltle: 'زیبایی و آرایش', titleIcon: { Icon: require('../../images/logos/lipstick.png'), Iconp: require('../../images/logos/lipstick_p.png') }, catTitle: 'B' },
            ],
        }

    }
    _setCategoryState(catTitle) {
        this.setState({ categorySelected: catTitle });
    }
    async _setCategoriesCount(c) {
        await this.setState({ categoriesCount: c });
    }
    componentDidMount() {
        fetch(P_URL + 'get_categories_count', { headers: { Authorization: get_key() } }).then(response => {
            response.json().then(responseJson => {
                this._setCategoriesCount(responseJson);
            });
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={Styles.mainContainer}>
                    <View style={Styles.categoryFlex}>
                        <FlatList
                            keyExtractor={(item, index) => { return index.toString() }}
                            data={this.state.categoryData}
                            extraData={this.state.categorySelected}
                            renderItem={({ item }) =>
                                <TouchableOpacity
                                    onPress={() => {
                                        this._setCategoryState(item.catTitle)
                                    }}>

                                    <View style={{ flex: 1, height: 78, justifyContent: 'center', alignItems: 'center', paddingHorizontal: '4%', backgroundColor: (item.catTitle === this.state.categorySelected) ? 'white' : 'transparent' }}>
                                        <Image source={(item.catTitle === this.state.categorySelected) ? item.titleIcon.Iconp : item.titleIcon.Icon} style={{ maxHeight: 25, maxWidth: 25, resizeMode: 'contain', overflow: 'hidden', marginBottom: 10 }} />
                                        <Text style={{ fontSize: 12, fontFamily: 'IRANSansMobile', textAlign: 'center',color:(item.catTitle === this.state.categorySelected) ? '#573c65':'black' }}>{item.faTiltle}</Text>
                                    </View>
                                </TouchableOpacity>
                            }
                        />


                    </View>
                    <View style={Styles.itemFlex}>
                        <FlatList
                            numColumns={2}
                            extraData={this.state.categorySelected}
                            data={Categories_data.filter(item => { return item.catTitle == this.state.categorySelected })}
                            renderItem={({ item, index }) =>
                                <TouchableOpacity style={Styles.itemGradient} onPress={() => { this.props.navigation.navigate('CategoryADs', { cid: item.category_ID }) }}>
                                    <LinearGradient
                                        style={{ height: '100%', width: '100%', borderRadius: 10 }}
                                        locations={[0.2, 1]}
                                        colors={["transparent", 'black']}
                                    >
                                        <Image resizeMode='cover' style={Styles.thumbnailImage} source={{ uri: item.address.profile }} />
                                        <View style={Styles.itemTitleView}>
                                            <Text style={Styles.titleText}>{item.title}</Text>
                                            <Text style={Styles.titleNumberText}>({this.state.categoriesCount[item.category_ID]})</Text>
                                        </View>
                                    </LinearGradient>
                                </TouchableOpacity>
                            }
                        />


                    </View>
                </View>
            </View>
        )
    }

}
export default CompeleteMenue
