import React, { Component } from 'react'
import { Image, View, FlatList, Text, TouchableOpacity } from 'react-native'
import Styles from './css/CompeleteMenue.css'
import LinearGradient from "react-native-linear-gradient";
import Categories_data from "./ImageProfile";

export class CompeleteMenue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryClicked: false,
            categorySelected:'R&F',
            categoryData: [
                { Id: 1, faTiltle: 'رستوران ها و فست فود', titleIcon: { Icon: require('../../images/logos/restaurant.png') }, enTitle: 'R&F', },
                { Id: 2, faTiltle: 'تفریحی و ورزشی', titleIcon: { Icon: require('../../images/logos/tafrihi.png') }, enTitle: 'T&S' },
                { Id: 3, faTiltle: 'پزشکی و سلامت', titleIcon: { Icon: require('../../images/logos/medicine.png') }, enTitle: 'H&M' },
                { Id: 4, faTiltle: 'هنر و تئاتر', titleIcon: { Icon: require('../../images/logos/art.png') }, enTitle: 'A&T' },
                { Id: 5, faTiltle: 'آموزشی', titleIcon: { Icon: require('../../images/logos/education.png') }, enTitle: 'A&T' },
                { Id: 6, faTiltle: 'زیبایی و آرایش', titleIcon: { Icon: require('../../images/logos/lipstick.png') }, enTitle: 'B' },
            ],
        }

    }
    _setCategoryState(enTitle) {
        this.setState({ categorySelected:enTitle });
        console.log(this.state.categorySelected)
    }
    
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={Styles.mainContainer}>
                    <View style={Styles.categoryFlex}>
                        <FlatList
                        
                            data={this.state.categoryData}
                            extraData={this.state.categorySelected}
                            renderItem={({ item }) =>
                                <TouchableOpacity
                                    onPress={() => {this._setCategoryState(item.enTitle)
                                   }}>

                                    <View style={{ flex: 1, height: 78, justifyContent: 'center', alignItems: 'center', paddingHorizontal: '4%',backgroundColor:(item.enTitle===this.state.categorySelected) ? 'white':'transparent' }}>
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
                            extraData={this.state.categorySelected}
                            data={Categories_data.filter(item=>{return item.enTitle==this.state.categorySelected})}
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
            </View>
        )
    }

}
export default CompeleteMenue
