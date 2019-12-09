import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';

class Help extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView >
                    <View style={{ height: 90, width: 90, borderRadius: 12, borderWidth: .5, marginTop: 50, alignSelf: 'center' }}></View>
                    <View style={{ flexDirection: 'row-reverse', marginTop: 10, alignSelf: 'center' }}>
                        <Text> S-Coin</Text><Text>چیست؟</Text>
                    </View>
                    <Text style={{ marginTop: 10, marginHorizontal: 20, alignSelf: 'center' }}>با React Native، می توانید دانش React خود را برای ساخت برنامه های iOS و Android بومی بهبود بخشید. در این دوره، اجزای مختلفی را فرا می گیرید که اساس یک برنامه React Native را تشکیل می دهد و یاد خواهید گرفت چگونه از این پلتفرم برای ساختن پروژه های بومی خود استفاده کنید.ظ</Text>
                    <View style={{ height: 90, width: 90, borderRadius: 12, borderWidth: .5, marginTop: 50, alignSelf: 'center' }}></View>
                    <View style={{ flexDirection: 'row-reverse', marginTop: 10, alignSelf: 'center' }}>
                        <Text>روش‌های کسب </Text><Text> S-Coin</Text>
                    </View>
                    <Text style={{ marginTop: 10, marginHorizontal: 20, alignSelf: 'center' }}>با React Native، می توانید دانش React خود را برای ساخت برنامه های iOS و Android بومی بهبود بخشید. در این دوره، اجزای مختلفی را فرا می گیرید که اساس یک برنامه React Native را تشکیل می دهد و یاد خواهید گرفت چگونه از این پلتفرم برای ساختن پروژه های بومی خود استفاده کنید.ظ</Text>
                    <View style={{ height: 90, width: 90, borderRadius: 12, borderWidth: .5, marginTop: 50, alignSelf: 'center' }}></View>
                    <View style={{ flexDirection: 'row-reverse', marginTop: 10, alignSelf: 'center' }}>
                        <Text>خرید و تخفیف با </Text><Text> S-Coin</Text>
                    </View>
                    <Text style={{ marginTop: 10, marginHorizontal: 20, alignSelf: 'center' }}>با React Native، می توانید دانش React خود را برای ساخت برنامه های iOS و Android بومی بهبود بخشید. در این دوره، اجزای مختلفی را فرا می گیرید که اساس یک برنامه React Native را تشکیل می دهد و یاد خواهید گرفت چگونه از این پلتفرم برای ساختن پروژه های بومی خود استفاده کنید.ظ</Text>
                </ScrollView>
            </View>
        );
    }
}

export default Help;
