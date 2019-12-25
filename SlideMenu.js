import React, { PureComponent } from 'react';
import {  View, Text } from 'react-native';

class SlideMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text onPress={()=>{this.props.navigation.closeDrawer()}}> componentText </Text>
      </View>
    );
  }
}

export default SlideMenu;
