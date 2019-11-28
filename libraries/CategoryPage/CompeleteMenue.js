import React, { Component } from 'react'
import { Image, View, FlatList, Text, TouchableOpacity } from 'react-native'
import Styles from './css/CompeleteMenue.css'
import Header from './header'
import Footer from './footer'
import LinearGradient from "react-native-linear-gradient";

export class CompeleteMenue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryClicked: false,
            categorySelected:'',
            data: [
                { "category_ID": 1, address: { profile: require('../../images/ham.png') }, title: "ایرانی و سنتی" },
                { "category_ID": 2, address: { profile: require('../../images/ham.png') }, title: "ایرانی و سنتی" },
                { "category_ID": 3, address: { profile: require('../../images/ham.png') }, title: "ایرانی و سنتی" },
                { "category_ID": 4, address: { profile: require('../../images/ham.png') }, title: "ایرانی و سنتی" },
                { "category_ID": 5, address: { profile: require('../../images/ham.png') }, title: "ایرانی و سنتی" },
                { "category_ID": 6, address: { profile: require('../../images/ham.png') }, title: "ایرانی و سنتی" },
                { "category_ID": 7, address: { profile: require('../../images/ham.png') }, title: "ایرانی و سنتی" },
                { "category_ID": 8, address: { profile: require('../../images/ham.png') }, title: "ایرانی و سنتی" },
            ],
            categoryData: [
                { Id: 1, faTiltle: 'رستوران ها و فست فود', titleIcon: { Icon: require('../../images/logos/restaurant.png') }, enTitle: 'resturantAndFastFood' },
                { Id: 2, faTiltle: 'تفریحی و ورزشی', titleIcon: { Icon: require('../../images/logos/tafrihi.png') }, enTitle: 'sport' },
                { Id: 3, faTiltle: 'پزشکی و سلامت', titleIcon: { Icon: require('../../images/logos/medicine.png') }, enTitle: 'healthAndMedicine' },
                { Id: 4, faTiltle: 'هنر و تئاتر', titleIcon: { Icon: require('../../images/logos/art.png') }, enTitle: 'artAndTheater' },
                { Id: 5, faTiltle: 'آموزشی', titleIcon: { Icon: require('../../images/logos/education.png') }, enTitle: 'education' },
                { Id: 6, faTiltle: 'زیبایی و آرایش', titleIcon: { Icon: require('../../images/logos/lipstick.png') }, enTitle: 'beauty' },
            ],
        }

    }
    _setCategoryState(Id) {
        this.setState({ categorySelected:Id });
        console.log(this.state.categorySelected)

    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header />
                <View style={Styles.mainContainer}>
                    <View style={Styles.categoryFlex}>
                        <FlatList
                            data={this.state.categoryData}
                            extraData={this.state.categorySelected}
                            renderItem={({ item }) =>
                                <TouchableOpacity
                                    onPress={() => {this._setCategoryState(item.Id)
                                    console.log(item.Id===this.state.categorySelected)}}>

                                    <View style={{ flex: 1, height: 78, justifyContent: 'center', alignItems: 'center', paddingHorizontal: '4%',backgroundColor:(item.Id===this.state.categorySelected) ? 'white':'transparent' }}>
                                        <Image source={item.titleIcon.Icon} style={{ maxHeight: 25, maxWidth: 25, resizeMode: 'contain', overflow: 'hidden', marginBottom: 10 }} />
                                        <Text style={{ fontSize: 12, fontFamily: 'IRANSansMobile', textAlign: 'center' }}>{item.faTiltle}</Text>
                                    </View>
                                </TouchableOpacity>
                            }
                        />


                    </View>
                    <View style={Styles.itemFlex}>
                        <FlatList
                            numColumns={2}

                            data={this.state.data}
                            renderItem={({ item }) =>
                                <LinearGradient
                                    style={Styles.itemGradient}
                                    locations={[0.2, 1]}
                                    colors={["transparent", 'black']}
                                >
                                    <Image resizeMode='cover' borderRadius={10} style={Styles.thumbnailImage} source={item.address.profile} />
                                    <View style={Styles.itemTitleView}>
                                        <Text style={Styles.titleText}>{item.title}</Text>
                                        <Text style={Styles.titleNumberText}>(25)</Text>
                                    </View>
                                </LinearGradient>
                            }
                        />


                    </View>
                </View>
                <Footer />
            </View>
        )
    }

}
export default CompeleteMenue
