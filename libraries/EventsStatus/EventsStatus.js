import * as React from 'react';
import {Alert, AsyncStorage, ScrollView, StyleSheet, Text, View} from 'react-native';
import EventCard from './components/EventCard';
import {Card} from 'react-native-paper';
import HeaderView from "../HeaderView";
import get_key from "../Auth";
import {P_URL} from "../PUBLICURLs";

export default class EventsStatus extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: < HeaderView navigation={
                navigation
            }
            />,
            headerLeft: null
        }
    };

    constructor() {
        super();
        this.state = {
            events: [],
            username: ''
        }

    }

    addResponseToArr(r) {
        this.setState({events: r})
    }

    async componentDidMount() {
        const username = await EventsStatus.getUsername();
        this._setUsername(username);
        this.getEvent();
    }

    static async getUsername() {
        try {
            return await AsyncStorage.getItem('username');
        } catch (error) {
            Alert.alert(error.toString());
        }
    }

    _setUsername(user) {
        this.setState({username: user});
    }

    getEvent() {
        return fetch(P_URL+'get_user_events?username=' + this.state.username,{headers: {Authorization: get_key()}})
            .then((response) => response.json())
            .then((responseJson) => {
                this.addResponseToArr(responseJson);
            })
            .catch((error) => {
                alert.error(error.toString());
            })
            .catch(error => console.log(error.toString()));
    }


    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Card>
                        {this.state.events.length === 0 &&
                        <View style={{width: '100%', height:50, alignItems: 'center', justifyContent: 'center', backgroundColor: '#B7BCBC'}}>
                            <Text style={{fontSize: 18, color: 'white'}}>شما هنوز در هیچ مسابقه ای شرکت نکرده اید</Text>
                        </View>}
                        {this.state.events.map((item, index) => <EventCard
                            title={item.title.toString()}
                            key={index}
                            player_rank={item.player_rank.toString()}
                            score={item.score.toString()}
                            start_time={item.start_time.toString()}
                            end_time={item.end_time.toString()}
                        />)}
                    </Card>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 10,
        padding: 8
    },
    card: {
        borderWidth: 3,
        borderRadius: 3,
        borderColor: '#000',
        margin: 10
    }
});
