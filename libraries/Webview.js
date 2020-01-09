import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import * as Progress from 'react-native-progress';
import WebView from 'react-native-webview';
import WebViewHeader from './Headers/WebViewHeader';
import { S_URL } from './PUBLICURLs';
export default class Webview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingProgress: 0,
            token: '',
            tokenReceived: false,
            url: this.props.navigation.getParam('url'),

        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <WebViewHeader navigation={navigation} />,
            headerStyle: {
                backgroundColor: '#573c65',
            }
        }
    };
    receiveToken = () => {
        this.setState({ token: this.props.navigation.getParam('token', 0), tokenReceived: true });
    }
    set_url = () => {
        this.setState({ url: this.props.navigation.getParam('url', 'https://scotech.ir') })
    }
    async componentDidMount() {
        let webview_type = this.props.navigation.getParam('type_of_webview', 0);
        this.set_url();
        if (webview_type == 1) {
            this.receiveToken();
        } else {
            this.setState({ tokenReceived: true });
        }
        console.log(this.props.navigation.getParam('title'))
        this.props.navigation.setParams({ webviewTitle: this.props.navigation.getParam('title'), });
        console.log(this.state.url + '/settoken/'+ this.props.navigation.getParam('token', 0));
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
                    style={{ marginTop: 5 }}
                    startInLoadingState={true}
                    renderLoading={() => {
                        return (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Progress.Bar
                                    style={{ position: 'absolute', zIndex: 2 }}
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
                    source={{ uri: this.state.url + '/settoken/'+ this.props.navigation.getParam('token', 0), headers: { 'Authorization': this.state.token } }}
                />
            );
    }
}