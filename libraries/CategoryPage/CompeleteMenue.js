import React, {Component} from 'react';
import {Text,View,StyleSheet,Image,ImageBackground,ScrollView,ActivityIndicator,TouchableOpacity} from 'react-native'
export default class CompeleteMenue extends Component {
    constructor(){
        super();

    }
    componentDidMount(){

    }
    render() {
        return (
            <View>
                <View styl={{flexDirection:'column'}} >
                    <View style={{flexDirection: 'row',justifyContent:'flex-end',marginTop:20}}>
                        <View style={{alignItems:"flex-end",justifyContent:"flex-end",flexDirection: 'row'}}>
                            <Text style={{fontSize:20,marginLeft:10,fontFamily:'IRANSansMobile'}}>رستوران ها و فست فود</Text>
                            <Image source={require('../../images/logos/restaurant.png')} style={{width:28,height:28,marginLeft:5,marginRight:5,marginBottom:6}} />
                        </View>
                    </View>
                    <View style={{marginTop:20,borderWidth:1,borderColor:'#f5f1f5'}} >
                        <ScrollView
                            horizontal={true}
                        >
                            {this.props.Categories_Data.map((item) => item.category_ID <= 8 &&
                                <View style={{flexDirection:'column'}} key={item.category_ID}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('categoryads',{'category_ID':item.category_ID})}>
                                        <Image source={item.address.profile} style={{resizeMode:'contain',marginRight:30,marginBottom:10,minHeight:133,minWidth:166,maxHeight:133,maxWidth:166,borderRadius:100,overflow:'hidden' }} >
                                        </Image>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </ScrollView>
                    </View>




                    <View style={{flexDirection: 'row',justifyContent:'flex-end',marginTop:20}}>
                        <View style={{alignItems:"flex-end",justifyContent:"flex-end",flexDirection: 'row'}}>
                            <Text style={{fontSize:20,marginLeft:10,fontFamily:'IRANSansMobile'}}>تفریحی و ورزشی</Text>
                            <Image source={require('../../images/logos/tafrihi.png')} style={{width:28,height:28,marginLeft:5,marginRight:5,marginBottom:6}} />
                        </View>
                    </View>
                    <View style={{marginTop:20,borderWidth:1,borderColor:'#f5f1f5'}} >
                        <ScrollView
                            horizontal={true}
                        >
                            {this.props.Categories_Data.map((item) =>(item.category_ID >= 9) && (item.category_ID <= 15) &&
                                <View style={{flexDirection:'column'}} key={item.category_ID}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('categoryads',{'category_ID':item.category_ID})}>
                                        <Image source={item.address.profile} style={{resizeMode:'contain',marginRight:30,marginBottom:10,height:130,width:166,borderRadius:200, alignItems: 'center', justifyContent: 'center' }} >
                                        </Image>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </ScrollView>
                    </View>



                    <View style={{flexDirection: 'row',justifyContent:'flex-end',marginTop:20}}>
                        <View style={{alignItems:"flex-end",justifyContent:"flex-end",flexDirection: 'row'}}>
                            <Text style={{fontSize:20,marginLeft:10,fontFamily:'IRANSansMobile'}}>پزشکی و سلامت</Text>
                            <Image source={require('../../images/logos/medicine.png')} style={{width:28,height:28,marginLeft:5,marginRight:5,marginBottom:6}} />
                        </View>
                    </View>
                    <View style={{marginTop:20,borderWidth:1,borderColor:'#f5f1f5'}} >
                        <ScrollView
                            horizontal={true}
                        >
                            {this.props.Categories_Data.map((item) => item.category_ID >= 16 && item.category_ID <= 21 &&
                                <View style={{flexDirection:'column'}} key={item.category_ID}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('categoryads',{'category_ID':item.category_ID})}>
                                        <Image source={item.address.profile} style={{resizeMode:'contain',marginRight:30,marginBottom:10,height:130,width:166,borderRadius:200, alignItems: 'center', justifyContent: 'center' }} >
                                        </Image>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </ScrollView>
                    </View>




                    <View style={{flexDirection: 'row',justifyContent:'flex-end',marginTop:20}}>
                        <View style={{alignItems:"flex-end",justifyContent:"flex-end",flexDirection: 'row'}}>
                            <Text style={{fontSize:20,marginLeft:10,fontFamily:'IRANSansMobile'}}>هنر و تئاتر</Text>
                            <Image source={require('../../images/logos/art.png')} style={{width:28,height:28,marginLeft:5,marginRight:5,marginBottom:6}} />
                        </View>
                    </View>
                    <View style={{marginTop:20,borderWidth:1,borderColor:'#f5f1f5'}} >
                        <ScrollView
                            horizontal={true}
                        >
                            {this.props.Categories_Data.map((item) => item.category_ID >= 22 && item.category_ID <= 26 &&
                                <View style={{flexDirection:'column'}} key={item.category_ID}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('categoryads',{'category_ID':item.category_ID})}>
                                        <Image source={item.address.profile} style={{resizeMode:'contain',marginRight:30,marginBottom:10,height:130,width:166,borderRadius:200, alignItems: 'center', justifyContent: 'center' }} >
                                        </Image>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </ScrollView>
                    </View>



                    <View style={{flexDirection: 'row',justifyContent:'flex-end',marginTop:20}}>
                        <View style={{alignItems:"flex-end",justifyContent:"flex-end",flexDirection: 'row'}}>
                            <Text style={{fontSize:20,marginLeft:10,fontFamily:'IRANSansMobile'}}>آموزشی</Text>
                            <Image source={require('../../images/logos/education.png')} style={{width:28,height:28,marginLeft:5,marginRight:5,marginBottom:6}} />
                        </View>
                    </View>
                    <View style={{marginTop:20,borderWidth:1,borderColor:'#f5f1f5'}} >
                        <ScrollView
                            horizontal={true}
                        >
                            {this.props.Categories_Data.map((item) => item.category_ID >= 27 && item.category_ID <= 34 &&
                                <View style={{flexDirection:'column'}} key={item.category_ID}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('categoryads',{'category_ID':item.category_ID})}>
                                        <Image source={item.address.profile} style={{resizeMode:'contain',marginRight:30,marginBottom:10,height:130,width:166,borderRadius:200, alignItems: 'center', justifyContent: 'center' }} >
                                        </Image>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </ScrollView>
                    </View>



                    <View style={{flexDirection: 'row',justifyContent:'flex-end',marginTop:20}}>
                        <View style={{alignItems:"flex-end",justifyContent:"flex-end",flexDirection: 'row'}}>
                            <Text style={{fontSize:20,marginLeft:10,fontFamily:'IRANSansMobile'}}>زیبایی و آرایش</Text>
                            <Image source={require('../../images/logos/lipstick.png')} style={{width:28,height:28,marginLeft:5,marginRight:5,marginBottom:6}} />
                        </View>
                    </View>
                    <View style={{marginTop:20,borderWidth:1,borderColor:'#f5f1f5'}} >
                        <ScrollView
                            horizontal={true}
                        >
                            {this.props.Categories_Data.map((item) => item.category_ID >= 35 && item.category_ID <= 38 &&
                                <View style={{flexDirection:'column'}} key={item.category_ID}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('categoryads',{'category_ID':item.category_ID})}>
                                        <Image source={item.address.profile} style={{resizeMode:'contain',marginRight:30,marginBottom:10,height:130,width:166,borderRadius:200, alignItems: 'center', justifyContent: 'center' }} >
                                        </Image>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </ScrollView>
                    </View>
                </View>
            </View>
        );
    }
}
