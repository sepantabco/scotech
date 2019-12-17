import React, { Component } from 'react';
import { View, Text } from 'react-native';
import * as Progress from 'react-native-progress';
import WebView from 'react-native-webview';
import HeaderView from './HeaderView';
export default class Webview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingProgress: 0
        }
    }
    onMessageReceived(data) {
        //Prints out data that was passed.
        console.log(data);
    }
    render() {
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
                    var loadingProgress = e.nativeEvent.progress
                    this.setState({ loadingProgress: loadingProgress })
                    console.log(this.state.loadingProgress + 'aaaaa')


                }}
                onMessage={({ nativeEvent }) => {
                    console.log(nativeEvent.data);
                }}
                onHttpError={syntheticEvent => {
                    const { nativeEvent } = syntheticEvent;
                    console.log('WebView error: ', nativeEvent);
                }}


                source={{ uri: 'http://dockerize.ir/' }}
                
            />
        );
    }
}