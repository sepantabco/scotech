import React, { Component } from 'react';
import { View, Text } from 'react-native';
import * as Progress from 'react-native-progress';
import WebView from 'react-native-webview';
import HeaderView from './HeaderView';
export default class Webview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingProgress: 0,
            token: '',
            tokenReceived: false
        }
    }
    componentDidMount() {
        fetch('https://shop.ghiasi.me/api/login',{ body:JSON.stringify({
            username: '09360840616',
            password: 'SUPERPASSWORD', }) ,
            method: 'post',
            headers: {'content-type': 'application/json'}
        }).then(response => { 
            response.json().then(responseJson => {
                this.setState({token: 'Bearer ' + responseJson.result.token, tokenReceived: true});
            });
        });
    }
    onMessageReceived(data) {
        //Prints out data that was passed.
        console.log(data);
    }

    render() {
        if (!this.state.tokenReceived)
        return (
            <View>
                <Text>در حال دریافت اطلاعات</Text>
            </View>
        )
        if (this.state.tokenReceived)
        return (
            <WebView
                startInLoadingState={true}
                renderLoading={() => {
                    return (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Progress.Bar
                                style={{position: 'absolute', zIndex: 2 }}
                                progress={this.state.loadingProgress} width={200} />
                        </View>
                    )
                }}
                onLoadProgress={e => {
                    console.log(e.nativeEvent.progress);
                    var loadingProgress = e.nativeEvent.progress;
                    this.setState({ loadingProgress: loadingProgress });
                }}
                onMessage={({ nativeEvent }) => {
                    console.log(nativeEvent.data); 
                }}
                onHttpError={syntheticEvent => {
                    const { nativeEvent } = syntheticEvent;
                    console.log('WebView error: ', nativeEvent);
                }}


                source={{ uri:  'http://192.168.1.6/' , headers: {'Authorization': this.state.token} }}
                
            />
        );
    }
}