import React, {Component} from 'react';
import {
    Text, View, StyleSheet,
    Image, FlatList, ActivityIndicator, ScrollView,
    ImageBackground, TouchableOpacity, Alert, AsyncStorage
} from 'react-native'


export default class FooterViewI extends Component{
    getSourceImage(id) {
        switch (id) {
            case 1:
                return require('../images/Footer/home.png');
            case 2:
                return require('../images/Footer/home_active.png');
            case 3:
                return require('../images/Footer/category.png');
            case 4:
                return require('../images/Footer/category_active.png');
            case 5:
                return require('../images/Footer/club.png');
            case 6:
                return require('../images/Footer/club_activate.png');
            case 7:
                return require('../images/Footer/mining.png');
            case 8:
                return require('../images/Footer/mining_active.png');
            case 9:
                return require('../images/Footer/profile.png');
            case 10:
                return require('../images/Footer/profile_active.png');
        }
    }
    render() {
        return (
            <View style={{
                flexDirection: 'row',
                height: 50,
                backgroundColor: '#f8f8f8',
                borderWidth: 0.5,
                borderColor: "#707070"
            }}>
                <View style={{flexDirection: 'row', height: 50, backgroundColor: '#f8f8f8', width: '100%'}}>
                    <TouchableOpacity style={{flex: 1}} onPress={() => this.props.navigation.navigate('Firstpage')}>
                        <View style={styles.footerViews}>
                            {this.props.menu === 1 &&
                            <Image source={this.getSourceImage(2)}
                                   style={{height: 24, width: 24, marginTop: 7}}/>
                            }
                            {!(this.props.menu === 1) &&
                            <Image source={this.getSourceImage(1)}
                                   style={{height: 24, width: 24, marginTop: 7}}/>
                            }
                            <Text style={{fontSize: 10}}>خانه</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex: 1}} onPress={() => this.props.navigation.navigate('category')}>
                        <View style={styles.footerViews}>
                            {this.props.menu === 2 &&
                            <Image source={this.getSourceImage(4)}
                                   style={{height: 24, width: 24, marginTop: 7}}/>
                            }
                            {!(this.props.menu === 2) &&
                            <Image source={this.getSourceImage(3)}
                                   style={{height: 24, width: 24, marginTop: 7}}/>
                            }
                            <Text style={{fontSize: 10}}>دسته بندی</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex: 1}}
                                      onPress={() => this.props.navigation.navigate('loyalityClub')}>
                        <View style={styles.footerViews}>
                            {this.props.menu === 3 &&
                            <Image source={this.getSourceImage(6)}
                                   style={{height: 24, width: 24, marginTop: 7}}/>
                            }
                            {!(this.props.menu === 3) &&
                            <Image source={this.getSourceImage(5)}
                                   style={{height: 24, width: 24, marginTop: 7}}/>
                            }
                            <Text style={{fontSize: 10}}>باشگاه مشتریان</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex: 1}}
                                      onPress={() => this.props.navigation.navigate('miningpage')}>
                        <View style={styles.footerViews}>
                            {this.props.menu === 4 &&
                            <Image source={this.getSourceImage(8)}
                                   style={{height: 24, width: 24, marginTop: 7}}/>
                            }
                            {!(this.props.menu === 4) &&
                            <Image source={this.getSourceImage(7)}
                                   style={{height: 24, width: 24, marginTop: 7}}/>
                            }
                            <Text style={{fontSize: 10}}>حفاری</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex: 1}} onPress={() => this.props.navigation.navigate('profile')}>
                        <View style={styles.footerViews}>
                            {this.props.menu === 5 &&
                            <Image source={this.getSourceImage(10)}
                                   style={{height: 24, width: 24, marginTop: 7}}/>
                            }
                            {!(this.props.menu === 5) &&
                            <Image source={this.getSourceImage(9)}
                                   style={{height: 24, width: 24, marginTop: 7}}/>
                            }
                            <Text style={{fontSize: 10}}>پروفایل</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    footerViews: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    scroll: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    paragraph: {
        color: '#460000',
        margin: 8,
        fontSize: 20,
        fontFamily: 'IRANSansMobile',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
