import React, { Component } from 'react'
import { Text, View, FlatList, Image, Alert, AsyncStorage } from 'react-native'
import { P_URL } from '../PUBLICURLs';
import { SafeAreaView } from 'react-navigation';
import MedalsHeader from '../Headers/MedalsHeader';
import get_key from "../Auth";
class Medals extends Component {
    static navigationOptions = ({ navigation }) => {
       
        return {
            headerTitle: <MedalsHeader navigation={navigation} />,
            headerStyle: {
                backgroundColor: '#573c65',
            }
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            medalsData: [],
            isNull: false,
            dataLoaded: false
        }
    }
    async getUsername() {
        try {
            let token = await AsyncStorage.getItem('username');
            return token;
        } catch (error) {
            Alert.alert(error.toString());
        }
    }
    get_medal_data(username){
        fetch(P_URL + 'get_user_medals_data?username=' + username,{headers: {Authorization: get_key()}}).then(response => {
            response.json().then(responseJson => {
                if (responseJson.length == 0) {
                    this.setState({ isNull: true });
                }
                console.log(responseJson)
                responseJson.map(item => {
                    let title = item.title
                    let prize = item.prize
                    let rank = item.rank
                    let pic_link = item.pic_link
                    this.state.medalsData.push({ title: title, prize: prize, rank: rank, pic_link: pic_link })
                    this.setState({dataLoaded: true})
                }
                );
            })
        })
    }
    async componentDidMount() {
        const username = await this.getUsername()
        this.get_medal_data(username);
    }
    static navigationOptions = ({ navigation }) => {
       
        return {
            headerTitle: <MedalsHeader navigation={navigation} />,
            headerLeft: null,
            headerStyle: {
                backgroundColor: '#9720d2',
            }
        }
    };
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {this.state.isNull && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 18 }}>شما هنوز مدالی نگرفته‌اید</Text></View>}
                <FlatList
                    data={this.state.medalsData}
                    extraData={this.state.dataLoaded}
                    keyExtractor={(item, index) => { return index.toString() }}
                    renderItem={({ item }) =>
                        <View style={{ width: '90%', height: 80, flexDirection: 'row-reverse', marginVertical: 15, alignSelf: 'center' }}>
                            <View style={{flex:1,backgroundColor:'#E7E7E7', alignItems:'center',justifyContent:'center', borderTopRightRadius: 10, borderBottomRightRadius: 10 }}>
                            <Image style={{ width: 60,height:60 }} resizeMode="contain" source={{ uri: item.pic_link }} />
                            </View>
                            <View style={{ flex: 2, backgroundColor: '#fafad2', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, paddingHorizontal: 15 }}>
                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <Text style={{ textAlign: 'right' }}>{item.title}</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', flexDirection: "row-reverse" }}>
                                    <View style={{ flex: 1 }}><Text>رتبه: {item.rank}</Text></View>
                                    <View style={{ flex: 1 }}><Text>جایزه : {item.prize}</Text></View>
                                </View>

                            </View>
                        </View>
                    } />
            </SafeAreaView>
        )
    }
}

export default Medals