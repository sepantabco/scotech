import React, { Component, Fragment } from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import Overlay from 'react-native-modal-overlay';

export class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            NotifiVisible: false,
            filterTitle: [
                "نزدیک ترین", "بیشترین امتیاز", "گران ترین", "ارزان ترین",
            ],
            filterSelected: 0
        }
    }
    _colseModal = () => {
        this.setState({ NotifiVisible: false });
    }
    _openModal() {
        this.setState({ NotifiVisible: true })
    }

    render() {
        return (
            <View>
                <Overlay visible={this.state.NotifiVisible} onClose={this._colseModal} closeOnTouchOutside
                    animationType="zoomIn"
                    childrenWrapperStyle={{ backgroundColor: '#DDDDDD' }}
                    animationDuration={1000}>
                    {
                        (hideModal, overlayState) => (
                            <View style={{ width: "50%", borderRadius: 50 }}>
                                <Text style={{ fontFamily: 'IRANSansMobile', color: '#573c65', marginBottom: 5 }}>فیلتر بر اساس:</Text>
                                <FlatList
                                    keyExtractor={(item, index) => { return index.toString() }}
                                    data={this.state.filterTitle}
                                    renderItem={({ item, index }) =>
                                        <View style={{ borderRadius: 100 }}>
                                            <TouchableOpacity
                                                onPress={() => this.props.take_filter_type(index)}
                                                style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end' }} >
                                                <Text style={{ fontFamily: 'IRANSansMobile', color: '#573c65', marginHorizontal: 5 }}>{item}</Text>
                                                <View style={{ height: 12, width: 12, borderRadius: 6, borderWidth: 2, borderColor: '#573c65', justifyContent: 'center', alignItems: 'center' }}>
                                                    {this.state.filterSelected == index &&
                                                        <View style={{ height: 7, width: 7, borderRadius: 3.5, backgroundColor: '#573c65' }}>
                                                        </View>
                                                    }
                                                </View>
                                            </TouchableOpacity>

                                        </View>
                                    }

                                />
                                <TouchableOpacity
                                    onPress={hideModal}
                                    style={{ height: 20, width: 50, backgroundColor: '#573c65', justifyContent: 'center', alignItems: 'center', marginTop: 10, borderRadius: 5, alignSelf: 'flex-end' }}>
                                    <Text style={{ fontFamily: 'IRANSansMobile', color: 'white', marginHorizontal: 5, fontSize: 12 }}>تایید</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                </Overlay>
            </View>
        )
    }
}

export default Filter
