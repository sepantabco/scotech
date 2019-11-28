import * as React from 'react';
import {Fragment} from 'react';
import {Text, View, StyleSheet, ImageBackground, Image, ScrollView, AsyncStorage, Alert, TouchableOpacity} from 'react-native';
import { Card } from 'react-native-paper';
import CountDown from 'react-native-countdown-component';
import HeaderView from "../HeaderView";
import Icon from 'react-native-ionicons';
import Overlay from 'react-native-modal-overlay';
import get_key from "../Auth";
import {P_URL} from "../PUBLICURLs";
export default class ClubPage extends React.Component {
    constructor(){
        super();
        this.state = {
            options: [],
            shopname: '',
            loaded: false,
            pic_link: '',
            startNotif: false,
            message: '',
            username: '',
            shopID: ''
        }
    }
    _setOptions(options,shopname,pic_link,shopID){
        this.setState({options: options, shopname: shopname, loaded: true, pic_link: pic_link, shopID: shopID});
    }

    async getUsername() {
        try {
            let token = await AsyncStorage.getItem('username');
            return token;
        } catch (error) {
            Alert.alert(error.toString());
        }
    }
    _setUsername(user) {
        this.setState({username: user});
    }

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: < HeaderView navigation={
                navigation
            }
            />,
            headerLeft: null
        }
    };

    async componentDidMount() {
        const {navigation} = this.props;
        const shopID = navigation.getParam('shopID',0);
        const shopname = navigation.getParam('shopname','');
        const pic_link = navigation.getParam('pic_link','');
        const username = await this.getUsername();
        this._setUsername(username);
        if(shopID === 0){
            alert("لطفا دوباره تلاش کنید");
        }
        fetch(P_URL+'get_club_options?shopID=' + shopID,{headers: {Authorization: get_key()}}).then(response => {
            response.json().then(responseJson => {
                this._setOptions(responseJson,shopname,pic_link,shopID);
            });
        });
    }
    buy_option(id){
        fetch(P_URL+'buy_option?username=' + this.state.username + '&shopID=' + this.state.shopID + '&option=' + id,{headers: {Authorization: get_key()}}).then(response => {
            response.text().then(rs => {
                this.setState({message: rs, startNotif: true});
            });

        });
    }
    onClose = () => this.setState({startNotif: false});
    render() {
        return (
            <ImageBackground style={styles.container} source={{uri: this.state.pic_link}}>
                <Overlay visible={this.state.startNotif} onClose={this.onClose} closeOnTouchOutside
                         animationType="zoomIn"
                         childrenWrapperStyle={{backgroundColor: '#DDDDDD'}}
                         animationDuration={500}>
                    {
                        (hideModal, overlayState) => (
                            <Fragment>
                                <Text style={[styles.paragraph , {fontSize:30}]}>وضعیت</Text>
                                <Text style={styles.paragraph}>{this.state.message}</Text>
                                <Icon name="happy"/>
                                <Text onPress={hideModal} style={[styles.paragraph , {color:"#4AAED1"}]}>بستن</Text>
                            </Fragment>
                        )
                    }
                </Overlay>
                <ScrollView>
                <Card style={{marginBottom: 20}}>
                    <View style={{justifyContent:'center',alignItems:'center',margin:20}}>
                        <Text style={{fontSize:18,fontWeight:'bold'}}>{this.state.shopname}</Text>
                    </View>
                </Card>
                {!this.state.loaded &&
                    <Card>
                        <View style={{justifyContent:'center',alignItems:'center'}}>
                            <Text>در حال بارگزاری</Text>
                        </View>
                    </Card>
                }
                {this.state.loaded && this.state.options.map(item =>
                    <TouchableOpacity onPress={() => this.buy_option(item.optionID)}>
                    <Card style={{marginBottom:10}}>
                        <View style={{flexDirection:'row',margin:10,justifyContent:'space-between',alignItems:'center'}}>
                            <Text style={{width:'80%',marginRight:2,marginLeft:2}}>{item.option}</Text>
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginLeft:5}}>
                                <Text>{item.scost}</Text>
                                <Image source={require('../../images/scoin.png')} style={{width:12,height:12,marginRight:5}} />
                                <Text>{item.cost}</Text>
                                <Icon name="star-outline" color={''}/>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding: 5}}>
                            <Text style={{marginTop:12,fontWeight:'bold'}}>باقی مانده{item.capacity}</Text>
                                {item.condition === 'second' &&
                                <CountDown
                                    size={12}
                                    until={parseInt(item.end_time)}
                                    onFinish={() => alert('Finished')}
                                    digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: '#1CC625'}}
                                    digitTxtStyle={{color: '#bec0c6'}}
                                    tisha-regexmeLabelStyle={{color: 'red', fontWeight: 'bold'}}
                                    separatorStyle={{color: '#c6bd1a'}}
                                    timeToShow={['H', 'M', 'S']}
                                    timeLabels={{h: null,m: null, s: null}}
                                    showSeparator
                                />
                                }
                                {item.condition === 'finished' &&
                                    <Text style={{fontSize:20}}>به اتمام رسیده</Text>
                                }
                                {item.condition === 'day' &&
                                    <Text style={{fontSize:20}}>تعداد روز باقی مانده {item.end_time}</Text>
                                }
                        </View>
                    </Card>
                    </TouchableOpacity>
                )}
                </ScrollView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 20,
        padding: 8,
    },
});
