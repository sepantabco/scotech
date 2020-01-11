import React, { Component } from 'react';
import { View, Text, SafeAreaView, StatusBar,Image } from 'react-native';
import WebView from 'react-native-webview';
import * as Progress from 'react-native-progress';
import { Icon,  } from 'native-base';

class GamesWebView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingProgress: 0,
        };
    }

    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerStyle: {
                backgroundColor: '#573c65',
            }
        }
    };
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>

                <StatusBar hidden={true} />
                <WebView
                    source={{ uri: this.props.navigation.getParam('url', 'https://scotech.ir') }}
                    startInLoadingState={true}
                    renderLoading={() => {
                        return(
                            <View style={{flex:1,position:'absolute',alignSelf:'center',top:"45%"}}>
                                <Image style={{height:70,width:70}} source={require('../images/splash.gif')}/>
                            </View>
                        )
                    //     return (
                    //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    //             <Progress.Bar
                    //                 style={{ position: 'absolute', zIndex: 2, backgroundColor: 'transparent' }}
                    //                 progress={this.state.loadingProgress} width={200} />
                    //         </View>
                    //     )
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
                />
                <View
                    onTouchStart={() => { this.props.navigation.goBack() }}
                    style={{ height: 40, width: 40, position: 'absolute', zIndex: 1, bottom: 10, left: 10, borderRadius: 20, backgroundColor: '#573c65', justifyContent: 'center', alignItems: 'center', }}>
                    <Icon name='undo' style={{ fontSize: 30, color: 'white' }} />
                </View>
            </SafeAreaView>
        );
    }
}

export default GamesWebView;
