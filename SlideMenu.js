import React, { PureComponent, Component } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { Icon } from 'native-base';
import { P_URL } from './libraries/PUBLICURLs';
import get_key from './libraries/Auth'
export default class SlideMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      level: 0,
      scoin: 0,
      name: '',
      username_set: false,
      dataGot: false,
      notification: ''
    }
  }

  async removeusername() {
    try {
      await AsyncStorage.removeItem('username')
      this.props.navigation.closeDrawer()
      this.props.navigation.navigate('startsignup')

    } catch (e) {
      Alert.alert(e.toString());
    }
    Alert.alert("لطفا برنامه را یک بار بسته و دوباره باز کنید")
  }

  async getUsername() {
    try {
      let token = await AsyncStorage.getItem('username');
      return token;
    } catch (error) {
      Alert.alert(error.toString());
    }
  }

  _setUsername(username) {
    this.setState({ username: username, username_set: true })
  }
  async _getUserProfile() {
    let user = await this.getUsername();
    this._setUsername(user);
    fetch(P_URL + 'get_profile?username=' + user, { headers: { Authorization: get_key() } }).then((response) => {
      response.json().then((responseJson) => {
        this.setState({
          name: responseJson.name,
          scoin: responseJson.scoin,
          level: responseJson.level,
        })
        this._getNotification(user)
      })
    }).catch((err) => Alert.alert(err.toString()))
  }
  _getNotification(user) {
    fetch(P_URL + 'userData?userID=' + user, { headers: { Authorization: get_key() } }).then((response) => {
      response.json().then((responseJson) => {
        this.setState({
          notification: responseJson.notification,
          dataGot: true
        })
      })
    }).catch((err) => Alert.alert(err.toString()))
  }
  render() {
    (!this.state.dataGot ? this._getUserProfile() : null)
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#573c65', paddingHorizontal: 5 }}>
        <View style={{ height: '30%', borderColor: 'white', borderBottomWidth: 1, alignItems: 'center', paddingHorizontal: 5 }}>
          <Image style={{ height: 80, width: 80, marginTop: 15 }} source={require('./images/personw.png')} />
          <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 14, }}>{this.state.username}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '95%', marginTop: 15 }}>
            <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 14, }}>{this.state.name}</Text>
            <Icon style={{ color: 'white', fontSize: 20 }} name="user-circle" type='FontAwesome5' />
          </View>
        </View>
        <View style={{ flex: 1 }}>
          {/* Start */}
          <TouchableOpacity
            onPress={() => { this.props.navigation.navigate('webview', { url: P_URL + 'notification?username=' + this.state.username }) }}
            style={{ flex: 1, borderColor: 'white', flexDirection: 'row-reverse', borderBottomWidth: 1, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
            <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
              <Icon style={{ color: 'white', fontSize: 20 }} name="mail" />
              <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 14, marginHorizontal: 10 }}>صندوق پستی</Text>
            </View>
            <View style={{ backgroundColor: '#ed008c', height: '40%', minWidth: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 10, marginHorizontal: 10 }}>{this.state.notification}</Text>
            </View>
          </TouchableOpacity>
          {/* End */}
          {/* Start */}
          <TouchableOpacity style={{ flex: 1, borderColor: 'white', flexDirection: 'row-reverse', borderBottomWidth: 1, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
            <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
              <Icon style={{ color: 'white', fontSize: 20 }} name="sellcast" type='FontAwesome5' />
              <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 14, marginHorizontal: 10 }}>اعتبار Scoin</Text>
            </View>
            <View style={{ backgroundColor: '#ed008c', height: '40%', minWidth: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 10, marginHorizontal: 10 }}>{this.state.scoin}</Text>
            </View>
          </TouchableOpacity>
          {/* End */}
          {/* Start */}
          <TouchableOpacity style={{ flex: 1, borderColor: 'white', flexDirection: 'row-reverse', borderBottomWidth: 1, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
            <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
              <Icon style={{ color: 'white', fontSize: 20 }} name="timeline" type='MaterialIcons' />
              <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 14, marginHorizontal: 10 }}>سطح</Text>
            </View>
            <View style={{ backgroundColor: '#ed008c', height: '40%', minWidth: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 10, marginHorizontal: 10 }}>{this.state.level}</Text>
            </View>
          </TouchableOpacity>
          {/* End */}
          {/* Start */}
          <TouchableOpacity style={{ flex: 1, borderColor: 'white', flexDirection: 'row-reverse', borderBottomWidth: 1, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
            <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
              <Icon style={{ color: 'white', fontSize: 20 }} name="exchange" type='FontAwesome' />
              <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 14, marginHorizontal: 10 }}>انتقال و تبدیل S-Coin</Text>
            </View>
          </TouchableOpacity>
          {/* End */}
          {/* Start */}
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Invitation')}
            style={{ flex: 1, borderColor: 'white', flexDirection: 'row-reverse', borderBottomWidth: 1, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
            <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
              <Icon style={{ color: 'white', fontSize: 20 }} name="user-friends" type='FontAwesome5' />
              <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 14, marginHorizontal: 10 }}>دعوت از دوستان</Text>
            </View>
          </TouchableOpacity>
          {/* End */}
          {/* Start */}
          <TouchableOpacity onPress={() => this.props.navigation.navigate('AdsArchive')}
            style={{ flex: 1, borderColor: 'white', flexDirection: 'row-reverse', borderBottomWidth: 1, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
            <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
              <Icon style={{ color: 'white', fontSize: 20 }} name="archive" />
              <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 14, marginHorizontal: 10 }}>آرشیو تبلیغات</Text>
            </View>
          </TouchableOpacity>
          {/* End */}
          {/* Start */}
          <TouchableOpacity onPress={() => this.props.navigation.navigate('EventsStatus')}
            style={{ flex: 1, borderColor: 'white', flexDirection: 'row-reverse', borderBottomWidth: 1, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
            <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
              <Icon style={{ color: 'white', fontSize: 20 }} name="games" type='MaterialIcons' />
              <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 14, marginHorizontal: 10 }}>وضعیت مسابقات</Text>
            </View>
          </TouchableOpacity>
          {/* End */}
          {/* Start */}
          <TouchableOpacity onPress={() => this.props.navigation.navigate('webview', { url: 'https://beacongameserver.ir/aboutus/AU.html' })}
            style={{ flex: 1, borderColor: 'white', flexDirection: 'row-reverse', borderBottomWidth: 1, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
            <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
              <Icon style={{ color: 'white', fontSize: 20 }} name="chatbubbles" />
              <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 14, marginHorizontal: 10 }}>سوالات متداول</Text>
            </View>
          </TouchableOpacity>
          {/* End */}
          {/* Start */}
          <TouchableOpacity onPress={() => this.props.navigation.navigate('webview', { url: 'https://scotech.ir/support/' + this.state.username })}
            style={{ flex: 1, borderColor: 'white', flexDirection: 'row-reverse', borderBottomWidth: 1, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
            <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
              <Icon style={{ color: 'white', fontSize: 20 }} name="headset" type='FontAwesome5' />
              <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 14, marginHorizontal: 10 }}>پشتیبانی</Text>
            </View>
          </TouchableOpacity>
          {/* End */}
          {/* Start */}
          <TouchableOpacity onPress={() => this.removeusername()}
          style={{ flex: 1, borderColor: 'white', flexDirection: 'row-reverse',  justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
            <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
              <Icon style={{ color: 'white', fontSize: 20 }} name="sign-out-alt" type='FontAwesome5' />
              <Text style={{ fontFamily: 'IRANSans(FaNum)', color: 'white', fontSize: 14, marginHorizontal: 10 }}>خروج از حساب کاربری</Text>
            </View>
          </TouchableOpacity>
          {/* End */}

        </View>
      </SafeAreaView>
    );
  }
}
